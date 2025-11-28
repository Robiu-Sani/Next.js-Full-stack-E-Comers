/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { NextRequest, NextResponse } from "next/server";
import connectDb from "@/lib/connectdb";
import OrderModel from "@/models/order.model";

interface AnalysisResponse {
  success: boolean;
  data: {
    overview: {
      totalOrders: number;
      totalRevenue: number;
      averageOrderValue: number;
      deliveredOrders: number;
      pendingOrders: number;
      cancelledOrders: number;
    };
    yearlyAnalysis: YearlyData[];
    monthlyAnalysis: MonthlyData[];
    dailyAnalysis: DailyData[];
    addressAnalysis: AddressData[];
    paymentMethodAnalysis: PaymentMethodData[];
    statusAnalysis: StatusData[];
    recentOrders: RecentOrder[];
  };
  message?: string;
}

interface YearlyData {
  year: number;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
  growthRate?: number;
}

interface MonthlyData {
  year: number;
  month: number;
  monthName: string;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

interface DailyData {
  date: string;
  day: string;
  totalOrders: number;
  totalRevenue: number;
  averageOrderValue: number;
}

interface AddressData {
  area: string;
  subArea?: string;
  totalOrders: number;
  totalCustomers: number;
  totalRevenue: number;
}

interface PaymentMethodData {
  method: string;
  totalOrders: number;
  totalRevenue: number;
  percentage: number;
}

interface StatusData {
  status: string;
  count: number;
  percentage: number;
}

interface RecentOrder {
  _id: string;
  orderId: string;
  name: string;
  totalAmount: number;
  orderStatus: string;
  paymentStatus: string;
  createdAt: string;
}

export async function GET(request: NextRequest) {
  try {
    await connectDb();

    const url = new URL(request.url);
    const year = parseInt(url.searchParams.get("year") || new Date().getFullYear().toString());
    const month = parseInt(url.searchParams.get("month") || "0"); // 0 for all months
    const limit = parseInt(url.searchParams.get("limit") || "10");

    // Get analysis data
    const [
      overview,
      yearlyAnalysis,
      monthlyAnalysis,
      dailyAnalysis,
      addressAnalysis,
      paymentMethodAnalysis,
      statusAnalysis,
      recentOrders
    ] = await Promise.all([
      getOverviewStats(),
      getYearlyAnalysis(),
      getMonthlyAnalysis(year),
      getDailyAnalysis(year, month),
      getAddressAnalysis(),
      getPaymentMethodAnalysis(),
      getStatusAnalysis(),
      getRecentOrders(limit)
    ]);

    const response: AnalysisResponse = {
      success: true,
      data: {
        overview,
        yearlyAnalysis,
        monthlyAnalysis,
        dailyAnalysis,
        addressAnalysis,
        paymentMethodAnalysis,
        statusAnalysis,
        recentOrders
      }
    };

    return NextResponse.json(response, { status: 200 });

  } catch (error: any) {
    console.error("Order analysis error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch order analysis",
        data: null
      },
      { status: 500 }
    );
  }
}

// Overview Statistics
async function getOverviewStats() {
  const now = new Date();
  const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
  const startOfYear = new Date(now.getFullYear(), 0, 1);

  const [
    totalOrders,
    totalRevenue,
    deliveredOrders,
    pendingOrders,
    cancelledOrders,
    currentMonthOrders,
    currentMonthRevenue
  ] = await Promise.all([
    OrderModel.countDocuments({ isDeleted: false }),
    OrderModel.aggregate([
      { $match: { isDeleted: false } },
      { $group: { _id: null, total: { $sum: "$grandTotal" } } }
    ]),
    OrderModel.countDocuments({ orderStatus: "delivered", isDeleted: false }),
    OrderModel.countDocuments({ orderStatus: "pending", isDeleted: false }),
    OrderModel.countDocuments({ orderStatus: "cancelled", isDeleted: false }),
    OrderModel.countDocuments({ 
      createdAt: { $gte: startOfMonth },
      isDeleted: false 
    }),
    OrderModel.aggregate([
      { 
        $match: { 
          createdAt: { $gte: startOfMonth },
          isDeleted: false 
        } 
      },
      { $group: { _id: null, total: { $sum: "$grandTotal" } } }
    ])
  ]);

  const revenue = totalRevenue[0]?.total || 0;
  const monthRevenue = currentMonthRevenue[0]?.total || 0;
  const averageOrderValue = totalOrders > 0 ? revenue / totalOrders : 0;

  return {
    totalOrders,
    totalRevenue: revenue,
    averageOrderValue: Math.round(averageOrderValue),
    deliveredOrders,
    pendingOrders,
    cancelledOrders,
    currentMonthOrders,
    currentMonthRevenue: monthRevenue
  };
}

// Yearly Analysis
async function getYearlyAnalysis(): Promise<YearlyData[]> {
  const yearlyData = await OrderModel.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: { $year: "$createdAt" },
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$grandTotal" }
      }
    },
    { $sort: { _id: 1 } }
  ]);

  const result: YearlyData[] = yearlyData.map((year, index) => {
    const avgValue = year.totalOrders > 0 ? year.totalRevenue / year.totalOrders : 0;
    
    // Calculate growth rate compared to previous year
    let growthRate;
    if (index > 0) {
      const prevYear = yearlyData[index - 1];
      growthRate = ((year.totalRevenue - prevYear.totalRevenue) / prevYear.totalRevenue) * 100;
    }

    return {
      year: year._id,
      totalOrders: year.totalOrders,
      totalRevenue: year.totalRevenue,
      averageOrderValue: Math.round(avgValue),
      growthRate: growthRate ? Math.round(growthRate * 100) / 100 : undefined
    };
  });

  return result;
}

// Monthly Analysis for specific year
async function getMonthlyAnalysis(year: number): Promise<MonthlyData[]> {
  const monthlyData = await OrderModel.aggregate([
    {
      $match: {
        isDeleted: false,
        $expr: { $eq: [{ $year: "$createdAt" }, year] }
      }
    },
    {
      $group: {
        _id: { month: { $month: "$createdAt" } },
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$grandTotal" }
      }
    },
    { $sort: { "_id.month": 1 } }
  ]);

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  return monthlyData.map(month => {
    const avgValue = month.totalOrders > 0 ? month.totalRevenue / month.totalOrders : 0;
    
    return {
      year,
      month: month._id.month,
      monthName: monthNames[month._id.month - 1],
      totalOrders: month.totalOrders,
      totalRevenue: month.totalRevenue,
      averageOrderValue: Math.round(avgValue)
    };
  });
}

// Daily Analysis for specific year and month
async function getDailyAnalysis(year: number, month: number): Promise<DailyData[]> {
  const matchStage: any = {
    isDeleted: false,
    $expr: { $eq: [{ $year: "$createdAt" }, year] }
  };

  if (month > 0) {
    matchStage.$expr = {
      $and: [
        { $eq: [{ $year: "$createdAt" }, year] },
        { $eq: [{ $month: "$createdAt" }, month] }
      ]
    };
  }

  const dailyData = await OrderModel.aggregate([
    { $match: matchStage },
    {
      $group: {
        _id: {
          year: { $year: "$createdAt" },
          month: { $month: "$createdAt" },
          day: { $dayOfMonth: "$createdAt" }
        },
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$grandTotal" }
      }
    },
    { $sort: { "_id.year": 1, "_id.month": 1, "_id.day": 1 } },
    { $limit: 30 } // Last 30 days
  ]);

  const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return dailyData.map(day => {
    const date = new Date(day._id.year, day._id.month - 1, day._id.day);
    const avgValue = day.totalOrders > 0 ? day.totalRevenue / day.totalOrders : 0;
    
    return {
      date: date.toISOString().split('T')[0],
      day: dayNames[date.getDay()],
      totalOrders: day.totalOrders,
      totalRevenue: day.totalRevenue,
      averageOrderValue: Math.round(avgValue)
    };
  });
}

// Address Analysis - Group by first and second words
async function getAddressAnalysis(): Promise<AddressData[]> {
  const addressData = await OrderModel.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: {
          // Extract first word (area) and second word (sub-area) from address
          area: { $arrayElemAt: [{ $split: ["$address", ","] }, 0] },
          subArea: { $arrayElemAt: [{ $split: ["$address", ","] }, 1] }
        },
        totalOrders: { $sum: 1 },
        totalCustomers: { $addToSet: "$number" },
        totalRevenue: { $sum: "$grandTotal" }
      }
    },
    {
      $project: {
        area: "$_id.area",
        subArea: { $trim: { input: "$_id.subArea" } },
        totalOrders: 1,
        totalCustomers: { $size: "$totalCustomers" },
        totalRevenue: 1
      }
    },
    { $sort: { totalOrders: -1 } },
    { $limit: 20 }
  ]);

  return addressData.map(item => ({
    area: item.area || "Unknown",
    subArea: item.subArea || "General",
    totalOrders: item.totalOrders,
    totalCustomers: item.totalCustomers,
    totalRevenue: item.totalRevenue
  }));
}

// Payment Method Analysis
async function getPaymentMethodAnalysis(): Promise<PaymentMethodData[]> {
  const totalOrdersResult = await OrderModel.countDocuments({ isDeleted: false });
  
  const paymentData = await OrderModel.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$paymentMethod",
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$grandTotal" }
      }
    },
    { $sort: { totalOrders: -1 } }
  ]);

  return paymentData.map(method => ({
    method: method._id,
    totalOrders: method.totalOrders,
    totalRevenue: method.totalRevenue,
    percentage: totalOrdersResult > 0 ? (method.totalOrders / totalOrdersResult) * 100 : 0
  }));
}

// Order Status Analysis
async function getStatusAnalysis(): Promise<StatusData[]> {
  const totalOrdersResult = await OrderModel.countDocuments({ isDeleted: false });
  
  const statusData = await OrderModel.aggregate([
    { $match: { isDeleted: false } },
    {
      $group: {
        _id: "$orderStatus",
        count: { $sum: 1 }
      }
    },
    { $sort: { count: -1 } }
  ]);

  return statusData.map(status => ({
    status: status._id,
    count: status.count,
    percentage: totalOrdersResult > 0 ? (status.count / totalOrdersResult) * 100 : 0
  }));
}

// Recent Orders
async function getRecentOrders(limit: number) {
  const orders = await OrderModel.find({ isDeleted: false })
    .sort({ createdAt: -1 })
    .limit(limit)
    .select('orderId name totalAmount orderStatus paymentStatus createdAt')
    .lean();

  return orders.map((order:any) => ({
    _id: order._id.toString(),
    orderId: order.orderId,
    name: order.name,
    totalAmount: order.totalAmount,
    orderStatus: order.orderStatus,
    paymentStatus: order.paymentStatus,
    createdAt: order.createdAt.toISOString() 
  }));
}

// GET endpoint for specific time period analysis
export async function POST(request: NextRequest) {
  try {
    await connectDb();
    const { startDate, endDate, analysisType } = await request.json();

    if (!startDate || !endDate) {
      return NextResponse.json(
        { success: false, message: "Start date and end date are required" },
        { status: 400 }
      );
    }

    const start = new Date(startDate);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999); // End of the day

    const matchStage = {
      isDeleted: false,
      createdAt: { $gte: start, $lte: end }
    };

    let analysisData;

    switch (analysisType) {
      case 'daily':
        analysisData = await getDailyAnalysisByPeriod(start, end);
        break;
      case 'payment-methods':
        analysisData = await getPaymentMethodAnalysisByPeriod(start, end);
        break;
      case 'address':
        analysisData = await getAddressAnalysisByPeriod(start, end);
        break;
      default:
        analysisData = await getGeneralAnalysisByPeriod(start, end);
    }

    return NextResponse.json({
      success: true,
      data: analysisData,
      period: { startDate, endDate }
    }, { status: 200 });

  } catch (error: any) {
    console.error("Custom analysis error:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Failed to fetch custom analysis"
      },
      { status: 500 }
    );
  }
}

// Helper functions for custom period analysis
async function getDailyAnalysisByPeriod(start: Date, end: Date) {
  const dailyData = await OrderModel.aggregate([
    {
      $match: {
        isDeleted: false,
        createdAt: { $gte: start, $lte: end }
      }
    },
    {
      $group: {
        _id: {
          date: {
            $dateToString: {
              format: "%Y-%m-%d",
              date: "$createdAt"
            }
          }
        },
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$grandTotal" }
      }
    },
    { $sort: { "_id.date": 1 } }
  ]);

  return dailyData.map(day => ({
    date: day._id.date,
    totalOrders: day.totalOrders,
    totalRevenue: day.totalRevenue,
    averageOrderValue: day.totalOrders > 0 ? Math.round(day.totalRevenue / day.totalOrders) : 0
  }));
}

async function getPaymentMethodAnalysisByPeriod(start: Date, end: Date) {
  const paymentData = await OrderModel.aggregate([
    {
      $match: {
        isDeleted: false,
        createdAt: { $gte: start, $lte: end }
      }
    },
    {
      $group: {
        _id: "$paymentMethod",
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$grandTotal" }
      }
    },
    { $sort: { totalOrders: -1 } }
  ]);

  const totalOrders = paymentData.reduce((sum, item) => sum + item.totalOrders, 0);

  return paymentData.map(method => ({
    method: method._id,
    totalOrders: method.totalOrders,
    totalRevenue: method.totalRevenue,
    percentage: totalOrders > 0 ? (method.totalOrders / totalOrders) * 100 : 0
  }));
}

async function getAddressAnalysisByPeriod(start: Date, end: Date) {
  const addressData = await OrderModel.aggregate([
    {
      $match: {
        isDeleted: false,
        createdAt: { $gte: start, $lte: end }
      }
    },
    {
      $group: {
        _id: {
          area: { $arrayElemAt: [{ $split: ["$address", ","] }, 0] }
        },
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$grandTotal" }
      }
    },
    { $sort: { totalOrders: -1 } },
    { $limit: 15 }
  ]);

  return addressData.map(item => ({
    area: item._id.area || "Unknown",
    totalOrders: item.totalOrders,
    totalRevenue: item.totalRevenue
  }));
}

async function getGeneralAnalysisByPeriod(start: Date, end: Date) {
  const [orders, revenue, statusCount] = await Promise.all([
    OrderModel.countDocuments({
      isDeleted: false,
      createdAt: { $gte: start, $lte: end }
    }),
    OrderModel.aggregate([
      {
        $match: {
          isDeleted: false,
          createdAt: { $gte: start, $lte: end }
        }
      },
      { $group: { _id: null, total: { $sum: "$grandTotal" } } }
    ]),
    OrderModel.aggregate([
      {
        $match: {
          isDeleted: false,
          createdAt: { $gte: start, $lte: end }
        }
      },
      {
        $group: {
          _id: "$orderStatus",
          count: { $sum: 1 }
        }
      }
    ])
  ]);

  return {
    totalOrders: orders,
    totalRevenue: revenue[0]?.total || 0,
    averageOrderValue: orders > 0 ? Math.round((revenue[0]?.total || 0) / orders) : 0,
    statusDistribution: statusCount
  };
}