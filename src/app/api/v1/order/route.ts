/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import OrderModel from "@/models/order.model";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

/**
 * Create a new Order
 */
export async function POST(request: NextRequest) {
  try {
    const orderData = await request.json();
    await connectDb();

    // Validate required fields
    const requiredFields = ['name', 'number', 'address', 'products', 'totalAmount', 'deliveryCharge', 'grandTotal'];
    for (const field of requiredFields) {
      if (!orderData[field]) {
        return NextResponse.json(
          { success: false, message: `${field} is required` },
          { status: 400 }
        );
      }
    }

    // Validate products array
    if (!Array.isArray(orderData.products) || orderData.products.length === 0) {
      return NextResponse.json(
        { success: false, message: "Products array is required and cannot be empty" },
        { status: 400 }
      );
    }

    // Check if products exist and have sufficient quantity
    const productIds = orderData.products.map((product: any) => {
      if (typeof product === 'string') return product;
      return product._id || product.productId;
    });

    const products = await Product.find({ 
      _id: { $in: productIds },
      isDeleted: false 
    });

    if (products.length !== productIds.length) {
      return NextResponse.json(
        { success: false, message: "One or more products not found or deleted" },
        { status: 404 }
      );
    }

    // Create a map for quick product lookup
    const productMap = new Map();
    products.forEach(product => {
      productMap.set(product._id.toString(), product);
    });

    // Validate quantities and prepare update operations
    const quantityUpdateOperations = [];
    const productDetails = [];

    for (const productId of productIds) {
      const product = productMap.get(productId.toString());
      
      if (!product) {
        return NextResponse.json(
          { success: false, message: `Product with ID ${productId} not found` },
          { status: 404 }
        );
      }

      // Check if product has sufficient quantity
      if (product.quentity !== undefined && product.quentity < 1) {
        return NextResponse.json(
          { 
            success: false, 
            message: `Insufficient quantity for product: ${product.name}. Available: ${product.quentity}` 
          },
          { status: 400 }
        );
      }

      // Prepare quantity update operation
      if (product.quentity !== undefined) {
        quantityUpdateOperations.push({
          updateOne: {
            filter: { _id: product._id },
            update: { 
              $inc: { quentity: -1 },
              $set: { updatedAt: new Date() }
            }
          }
        });
      }

      // Store product details for response
      productDetails.push({
        _id: product._id,
        name: product.name,
        images: product.images,
        generalPrice: product.generalPrice,
        brand: product.brand,
        originalQuantity: product.quentity
      });
    }

    // Execute all quantity updates in bulk
    if (quantityUpdateOperations.length > 0) {
      const updateResult = await Product.bulkWrite(quantityUpdateOperations);
      
      // Verify all updates were successful
      if (updateResult.modifiedCount !== quantityUpdateOperations.length) {
        // Rollback any updates that might have succeeded
        await rollbackProductQuantities(products);
        return NextResponse.json(
          { success: false, message: "Failed to update product quantities" },
          { status: 500 }
        );
      }
    }

    // Prepare order data with proper product references
    const orderToCreate = {
      ...orderData,
      products: productIds, // Ensure we're storing only product IDs
      orderId: generateOrderId(), // Use the schema's default function
      paymentStatus: orderData.paymentStatus || 'pending',
      orderStatus: orderData.orderStatus || 'pending',
      paymentMethod: orderData.paymentMethod || 'cash-on-delivery',
      discount: orderData.discount || 0,
      isDelivered: orderData.isDelivered || false,
      isPaid: orderData.isPaid || false,
      isDeleted: false
    };

    // Create the order
    const createdOrder = await OrderModel.create(orderToCreate);

    // Populate the created order with product details for response
    const populatedOrder = await OrderModel.findById(createdOrder._id)
      .populate('products', 'name images generalPrice brand quentity')
      .exec();

    return NextResponse.json(
      {
        success: true,
        data: populatedOrder,
        message: "Order created successfully and product quantities updated",
      },
      { status: 201 }
    );

  } catch (err: any) {
    console.error("POST Order error:", err);
    
    // Rollback product quantities in case of error
    if (err.name === 'BulkWriteError') {
      await rollbackProductQuantities(err.products || []);
    }

    // Handle duplicate orderId error
    if (err.code === 11000) {
      return NextResponse.json(
        { success: false, message: "Order ID already exists. Please try again." },
        { status: 400 }
      );
    }

    // Handle validation errors
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map((error: any) => error.message);
      return NextResponse.json(
        { success: false, message: "Validation error", errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { 
        success: false, 
        message: err.message || "Failed to create order",
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
      },
      { status: 400 }
    );
  }
}

// Helper function to rollback product quantities in case of error
async function rollbackProductQuantities(products: any[]) {
  try {
    const rollbackOperations = products.map(product => ({
      updateOne: {
        filter: { _id: product._id },
        update: { 
          $inc: { quentity: 1 }, // Increment back to original
          $set: { updatedAt: new Date() }
        }
      }
    }));

    if (rollbackOperations.length > 0) {
      await Product.bulkWrite(rollbackOperations);
      console.log('Product quantities rolled back successfully');
    }
  } catch (rollbackError) {
    console.error('Error rolling back product quantities:', rollbackError);
    // Log this error for manual intervention
    console.error('Manual intervention required for products:', products.map(p => p._id));
  }
}

// Helper function to generate order ID (same as in schema)
function generateOrderId(): string {
  const date = new Date();
  const random = Math.floor(1000 + Math.random() * 9000);
  return `ORD-${date.getFullYear()}${(date.getMonth() + 1)
    .toString()
    .padStart(2, "0")}${date.getDate().toString().padStart(2, "0")}-${random}`;
}

/**
 * Get Orders with search, filter & pagination
 * Search fields: orderId, name, number
 * Filters: paymentStatus, orderStatus
 */
export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(request.url);
    const search = searchParams.get("search") || "";
    const orderStatus = searchParams.get("orderStatus");
    const paymentStatus = searchParams.get("paymentStatus");
    const paymentMethod = searchParams.get("paymentMethod");
    const page = Number(searchParams.get("page") || 1);
    const limit = Number(searchParams.get("limit") || 50);
    const sortBy = searchParams.get("sortBy") || "createdAt";
    const sortOrder = searchParams.get("sortOrder") || "desc";

    const query: any = { isDeleted: { $ne: true } };

    // 🔍 Search by orderId, trackingId, name, number, or address
    if (search && search.trim() !== "") {
      query.$or = [
        { orderId: { $regex: search.trim(), $options: "i" } },
        { trackingId: { $regex: search.trim(), $options: "i" } },
        { name: { $regex: search.trim(), $options: "i" } },
        { number: { $regex: search.trim(), $options: "i" } },
        { address: { $regex: search.trim(), $options: "i" } },
      ];
    }

    // 🎯 Filter by status and payment method - handle empty strings and "all" values
    if (orderStatus && orderStatus.trim() !== "" && orderStatus !== "all") {
      query.orderStatus = orderStatus.trim();
    }
    
    if (paymentStatus && paymentStatus.trim() !== "" && paymentStatus !== "all") {
      query.paymentStatus = paymentStatus.trim();
    }
    
    if (paymentMethod && paymentMethod.trim() !== "" && paymentMethod !== "all") {
      query.paymentMethod = paymentMethod.trim();
    }

    // Validate pagination parameters
    const validatedPage = Math.max(1, page);
    const validatedLimit = Math.min(Math.max(1, limit), 100); // Max 100 items per page

    // Calculate pagination
    const skip = (validatedPage - 1) * validatedLimit;

    // Build sort object with validation
    const allowedSortFields = ['createdAt', 'updatedAt', 'grandTotal', 'orderId'];
    const validatedSortBy = allowedSortFields.includes(sortBy) ? sortBy : 'createdAt';
    const validatedSortOrder = sortOrder === 'asc' ? 1 : -1;

    const sort: any = {};
    sort[validatedSortBy] = validatedSortOrder;

    // Get total count for pagination
    const total = await OrderModel.countDocuments(query);

    // Validate if page exists
    const totalPages = Math.ceil(total / validatedLimit);
    if (validatedPage > totalPages && totalPages > 0) {
      return NextResponse.json(
        {
          success: false,
          message: `Page ${validatedPage} does not exist. Total pages: ${totalPages}`,
          pagination: {
            total,
            page: validatedPage,
            limit: validatedLimit,
            totalPages,
            hasNextPage: false,
            hasPrevPage: validatedPage > 1,
          }
        },
        { status: 400 }
      );
    }

    // Fetch orders with population and pagination
    const orders = await OrderModel.find(query)
      .populate('products', 'images generalPrice name')
      .sort(sort)
      .skip(skip)
      .limit(validatedLimit)
      .select("-__v") // Exclude version key
      .lean(); // Convert to plain JavaScript objects for better performance

    return NextResponse.json(
      {
        success: true,
        data: orders,
        pagination: {
          total,
          page: validatedPage,
          limit: validatedLimit,
          totalPages,
          hasNextPage: validatedPage < totalPages,
          hasPrevPage: validatedPage > 1,
        },
        filters: {
          search: search.trim(),
          orderStatus: orderStatus && orderStatus !== "all" ? orderStatus.trim() : null,
          paymentStatus: paymentStatus && paymentStatus !== "all" ? paymentStatus.trim() : null,
          paymentMethod: paymentMethod && paymentMethod !== "all" ? paymentMethod.trim() : null,
          sortBy: validatedSortBy,
          sortOrder: sortOrder === 'asc' ? 'asc' : 'desc'
        }
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.error("GET Orders error:", err);
    
    // More specific error handling
    let errorMessage = "Failed to fetch orders";
    let statusCode = 500;
    
    if (err.name === 'MongoNetworkError' || err.name === 'MongoTimeoutError') {
      errorMessage = "Database connection error. Please try again later.";
      statusCode = 503; // Service Unavailable
    } else if (err.name === 'ValidationError') {
      errorMessage = "Invalid query parameters";
      statusCode = 400;
    }

    return NextResponse.json(
      { 
        success: false, 
        message: errorMessage,
        error: process.env.NODE_ENV === 'development' ? {
          message: err.message,
          stack: err.stack
        } : undefined
      },
      { status: statusCode }
    );
  }
}



/**
 * Soft Delete / Restore an Order
 * Toggle isDeleted flag
 */
export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json();

    if (!id) throw new Error("Order ID is required");

    await connectDb();

    // Find the order and populate products to get their details
    const order = await OrderModel.findById(id).populate('products');
    if (!order) throw new Error("Order not found");

    // Store the current state before update
    const wasDeleted = (order as any).isDeleted;

    // Toggle the isDeleted flag
    (order as any).isDeleted = !wasDeleted;
    await order.save();

    // If order is being deleted (soft delete), increment product quantities
    if (!wasDeleted) {
      await incrementProductQuantities(order.products);
    }
    // If order is being restored, decrement product quantities again
    else {
      await decrementProductQuantities(order.products);
    }

    return NextResponse.json(
      {
        success: true,
        data: order,
        message: (order as any).isDeleted
          ? "Order deleted successfully and product quantities restored"
          : "Order restored successfully and product quantities updated",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("DELETE Order error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to delete order" },
      { status: 400 }
    );
  }
}

// Helper function to increment product quantities
async function incrementProductQuantities(products: any[]) {
  try {
    const incrementOperations = products.map(product => ({
      updateOne: {
        filter: { _id: product._id, isDeleted: false },
        update: { 
          $inc: { quentity: 1 },
          $set: { updatedAt: new Date() }
        }
      }
    }));

    if (incrementOperations.length > 0) {
      const updateResult = await Product.bulkWrite(incrementOperations);
      console.log(`Incremented quantities for ${updateResult.modifiedCount} products`);
      
      // Check if all products were updated
      if (updateResult.modifiedCount !== incrementOperations.length) {
        console.warn(`Some products couldn't be updated. Expected: ${incrementOperations.length}, Actual: ${updateResult.modifiedCount}`);
        
        // Find which products failed to update
        const failedProductIds = [];
        for (let i = 0; i < products.length; i++) {
          const product = await Product.findById(products[i]._id);
          if (!product || product.isDeleted) {
            failedProductIds.push(products[i]._id);
          }
        }
        
        if (failedProductIds.length > 0) {
          console.error('Products that could not be updated:', failedProductIds);
        }
      }
    }
  } catch (error) {
    console.error('Error incrementing product quantities:', error);
    throw new Error('Failed to restore product quantities');
  }
}

// Helper function to decrement product quantities (when restoring order)
async function decrementProductQuantities(products: any[]) {
  try {
    const decrementOperations = products.map(product => ({
      updateOne: {
        filter: { 
          _id: product._id, 
          isDeleted: false,
          quentity: { $gte: 1 } // Only decrement if quantity is at least 1
        },
        update: { 
          $inc: { quentity: -1 },
          $set: { updatedAt: new Date() }
        }
      }
    }));

    if (decrementOperations.length > 0) {
      const updateResult = await Product.bulkWrite(decrementOperations);
      console.log(`Decremented quantities for ${updateResult.modifiedCount} products`);
      
      // Check if all products were updated
      if (updateResult.modifiedCount !== decrementOperations.length) {
        console.warn(`Some products couldn't be updated. Expected: ${decrementOperations.length}, Actual: ${updateResult.modifiedCount}`);
        
        // Check for insufficient quantity
        const insufficientQuantityProducts = [];
        for (const product of products) {
          const currentProduct = await Product.findById(product._id);
          if (currentProduct && currentProduct.quentity < 1) {
            insufficientQuantityProducts.push({
              productId: product._id,
              name: product.name,
              currentQuantity: currentProduct.quentity
            });
          }
        }
        
        if (insufficientQuantityProducts.length > 0) {
          console.error('Products with insufficient quantity:', insufficientQuantityProducts);
          throw new Error(`Cannot restore order: Insufficient quantity for products: ${insufficientQuantityProducts.map(p => p.name).join(', ')}`);
        }
      }
    }
  } catch (error) {
    console.error('Error decrementing product quantities:', error);
    throw error; // Re-throw to be handled by the main function
  }
}

// Alternative DELETE function with explicit delete/restore actions
export async function PATCH(request: NextRequest) {
  try {
    const { id, action } = await request.json();

    if (!id) throw new Error("Order ID is required");
    if (!action || !['delete', 'restore'].includes(action)) {
      throw new Error("Action must be either 'delete' or 'restore'");
    }

    await connectDb();

    // Find the order and populate products to get their details
    const order = await OrderModel.findById(id).populate('products');
    if (!order) throw new Error("Order not found");

    const wasDeleted = (order as any).isDeleted;
    const newDeleteState = action === 'delete';

    // Check if we're actually changing the state
    if (wasDeleted === newDeleteState) {
      return NextResponse.json(
        {
          success: true,
          data: order,
          message: newDeleteState 
            ? "Order is already deleted" 
            : "Order is already active",
        },
        { status: 200 }
      );
    }

    // Update the isDeleted flag
    (order as any).isDeleted = newDeleteState;
    await order.save();

    // Handle product quantity updates based on action
    if (action === 'delete') {
      await incrementProductQuantities(order.products);
    } else {
      await decrementProductQuantities(order.products);
    }

    return NextResponse.json(
      {
        success: true,
        data: order,
        message: newDeleteState
          ? "Order deleted successfully and product quantities restored"
          : "Order restored successfully and product quantities updated",
      },
      { status: 200 }
    );
  } catch (err: any) {
    console.log("PATCH Order error:", err);
    return NextResponse.json(
      { success: false, message: err.message || "Failed to update order" },
      { status: 400 }
    );
  }
}
