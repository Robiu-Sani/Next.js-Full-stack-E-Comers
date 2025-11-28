/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDb from "@/lib/connectdb";
import OrderModel from "@/models/order.model";
import Product from "@/models/product.model";
import { NextRequest, NextResponse } from "next/server";

type ParamsType = {
  params: Promise<{
    id: string;
  }>;
};

/**
 * 🟢 GET: Get single order by ID
 */
export async function GET(req: NextRequest, context: ParamsType) {
  const { id } = await context.params;

  try {
    await connectDb();

    const order = await OrderModel.findById(id).populate('products');

    if (!order || (order as any).isDeleted) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { success: true, data: order },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("GET Order error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch order",
      },
      { status: 500 }
    );
  }
}

/**
 * 🟡 PATCH: Update order by ID
 */
export async function PATCH(req: NextRequest, context: ParamsType) {
  const { id } = await context.params;

  try {
    await connectDb();
    const body = await req.json();

    // Find the current order to check product changes
    const currentOrder = await OrderModel.findById(id).populate('products');
    if (!currentOrder) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // Handle product quantity changes if products are being modified
    if (body.products && Array.isArray(body.products)) {
      await handleProductQuantityChanges(currentOrder, body.products);
    }

    // Handle status changes that might affect product quantities
    if (body.orderStatus || body.isDeleted !== undefined) {
      await handleStatusChangeQuantityUpdates(currentOrder, body);
    }

    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true, runValidators: true }
    ).populate('products');

    return NextResponse.json(
      {
        success: true,
        message: "Order updated successfully",
        data: updatedOrder,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("PATCH Order error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to update order",
      },
      { status: 500 }
    );
  }
}

/**
 * 🔴 DELETE: Soft delete or restore order by ID with product quantity management
 */
export async function DELETE(req: NextRequest, context: ParamsType) {
  const { id } = await context.params;

  try {
    await connectDb();

    const order = await OrderModel.findById(id).populate('products');

    if (!order) {
      return NextResponse.json(
        { success: false, message: "Order not found" },
        { status: 404 }
      );
    }

    // Add a soft delete flag if not defined in schema
    if ((order as any).isDeleted === undefined) {
      (order as any).isDeleted = false;
    }

    const wasDeleted = (order as any).isDeleted;
    const newDeleteState = !wasDeleted;

    // Update the delete state
    (order as any).isDeleted = newDeleteState;
    await order.save();

    // Handle product quantity updates based on delete/restore action
    if (newDeleteState) {
      // Order is being deleted - restore product quantities
      await incrementProductQuantities(order.products);
    } else {
      // Order is being restored - deduct product quantities again
      await decrementProductQuantities(order.products);
    }

    return NextResponse.json(
      {
        success: true,
        message: newDeleteState
          ? "Order soft deleted successfully and product quantities restored"
          : "Order restored successfully and product quantities updated",
        data: order,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("DELETE Order error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to delete or restore order",
      },
      { status: 500 }
    );
  }
}

// Helper function to handle product quantity changes when order products are modified
async function handleProductQuantityChanges(currentOrder: any, newProducts: any[]) {
  try {
    const currentProductIds = currentOrder.products.map((p: any) => p._id.toString());
    const newProductIds = newProducts.map(p => 
      typeof p === 'string' ? p : p._id || p.productId
    );

    // Find products that were removed
    const removedProducts = currentOrder.products.filter((p: any) => 
      !newProductIds.includes(p._id.toString())
    );

    // Find products that were added
    const addedProductsIds = newProductIds.filter(id => 
      !currentProductIds.includes(id.toString())
    );

    // Restore quantities for removed products
    if (removedProducts.length > 0) {
      await incrementProductQuantities(removedProducts);
    }

    // Deduct quantities for added products
    if (addedProductsIds.length > 0) {
      const addedProducts = await Product.find({ 
        _id: { $in: addedProductsIds },
        isDeleted: false 
      });
      
      // Validate quantities before deducting
      for (const product of addedProducts) {
        if (product.quentity !== undefined && product.quentity < 1) {
          throw new Error(`Insufficient quantity for product: ${product.name}. Available: ${product.quentity}`);
        }
      }
      
      await decrementProductQuantities(addedProducts);
    }
  } catch (error) {
    console.error('Error handling product quantity changes:', error);
    throw error;
  }
}

// Helper function to handle quantity updates based on status changes
async function handleStatusChangeQuantityUpdates(currentOrder: any, updateData: any) {
  try {
    const isBeingCancelled = updateData.orderStatus === 'cancelled' && 
                            currentOrder.orderStatus !== 'cancelled';
    
    const isBeingRestoredFromCancelled = currentOrder.orderStatus === 'cancelled' && 
                                        updateData.orderStatus !== 'cancelled' &&
                                        updateData.orderStatus !== undefined;

    const isBeingDeleted = updateData.isDeleted === true && 
                          !(currentOrder as any).isDeleted;

    const isBeingRestored = updateData.isDeleted === false && 
                           (currentOrder as any).isDeleted;

    // If order is being cancelled or deleted, restore product quantities
    if ((isBeingCancelled || isBeingDeleted) && !isBeingRestored) {
      await incrementProductQuantities(currentOrder.products);
    }
    
    // If order is being restored from cancelled or undeleted, deduct quantities again
    if ((isBeingRestoredFromCancelled || isBeingRestored) && !isBeingCancelled && !isBeingDeleted) {
      await decrementProductQuantities(currentOrder.products);
    }
  } catch (error) {
    console.error('Error handling status change quantity updates:', error);
    throw error;
  }
}

// Helper function to increment product quantities
async function incrementProductQuantities(products: any[]) {
  try {
    const incrementOperations = products
      .filter(product => product.quentity !== undefined)
      .map(product => ({
        updateOne: {
          filter: { 
            _id: product._id, 
            isDeleted: false 
          },
          update: { 
            $inc: { quentity: 1 },
            $set: { updatedAt: new Date() }
          }
        }
      }));

    if (incrementOperations.length > 0) {
      const updateResult = await Product.bulkWrite(incrementOperations);
      console.log(`✅ Incremented quantities for ${updateResult.modifiedCount} products`);
    }
  } catch (error) {
    console.error('❌ Error incrementing product quantities:', error);
    throw new Error('Failed to restore product quantities');
  }
}

// Helper function to decrement product quantities
async function decrementProductQuantities(products: any[]) {
  try {
    // First, validate all products have sufficient quantity
    for (const product of products) {
      if (product.quentity !== undefined) {
        const currentProduct = await Product.findById(product._id);
        if (currentProduct && currentProduct.quentity < 1) {
          throw new Error(`Insufficient quantity for product: ${product.name}. Available: ${currentProduct.quentity}`);
        }
      }
    }

    const decrementOperations = products
      .filter(product => product.quentity !== undefined)
      .map(product => ({
        updateOne: {
          filter: { 
            _id: product._id, 
            isDeleted: false,
            quentity: { $gte: 1 }
          },
          update: { 
            $inc: { quentity: -1 },
            $set: { updatedAt: new Date() }
          }
        }
      }));

    if (decrementOperations.length > 0) {
      const updateResult = await Product.bulkWrite(decrementOperations);
      console.log(`✅ Decremented quantities for ${updateResult.modifiedCount} products`);
      
      if (updateResult.modifiedCount !== decrementOperations.length) {
        console.warn(`⚠️ Some products couldn't be updated. Expected: ${decrementOperations.length}, Actual: ${updateResult.modifiedCount}`);
      }
    }
  } catch (error) {
    console.error('❌ Error decrementing product quantities:', error);
    throw error;
  }
}

// Additional helper for bulk quantity operations
// eslint-disable-next-line @typescript-eslint/no-unused-vars
async function validateProductsQuantity(products: any[]) {
  const insufficientProducts = [];
  
  for (const product of products) {
    if (product.quentity !== undefined) {
      const currentProduct = await Product.findById(product._id);
      if (currentProduct && currentProduct.quentity < 1) {
        insufficientProducts.push({
          productId: product._id,
          name: product.name,
          currentQuantity: currentProduct.quentity
        });
      }
    }
  }
  
  if (insufficientProducts.length > 0) {
    const productNames = insufficientProducts.map(p => p.name).join(', ');
    throw new Error(`Insufficient quantity for products: ${productNames}`);
  }
  
  return true;
}