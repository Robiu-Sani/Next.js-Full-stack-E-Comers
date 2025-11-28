/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import React, { useState, useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  AreaChart, 
  Area, 
  PieChart, 
  Pie, 
  Cell,
  RadialBarChart,
  RadialBar,
  ResponsiveContainer,
  Legend,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid
} from 'recharts'
import { 
  Package,
  TrendingUp,
  AlertTriangle,
  DollarSign,
  Star,
  ShoppingCart,
  Tag,
  BarChart3,
  Target,
  Download,
  RefreshCw,
  Zap
} from 'lucide-react'
import { toast } from "sonner"

interface InventoryData {
  overview: {
    totalProducts: number
    totalInventoryValue: number
    lowStockProducts: number
    outOfStockProducts: number
    totalCategories: number
    totalSubCategories: number
    averageRating: number
  }
  stockAnalysis: {
    stockLevels: Array<{
      level: string
      count: number
      percentage: number
      value: number
    }>
    criticalProducts: Array<{
      _id: string
      name: string
      quentity: number
      currentPrice: number
      category: string
      stockValue: number
    }>
  }
  categoryAnalysis: Array<{
    category: string
    productCount: number
    totalValue: number
    averagePrice: number
    lowStockCount: number
    percentage: number
  }>
  priceAnalysis: {
    priceRanges: Array<{
      range: string
      count: number
      percentage: number
    }>
    averageProductPrice: number
    highestPricedProduct: {
      name: string
      price: number
      category: string
    }
    lowestPricedProduct: {
      name: string
      price: number
      category: string
    }
  }
  salesPerformance: {
    topSellingProducts: Array<{
      productId: string
      name: string
      salesCount: number
      revenue: number
      quantitySold: number
    }>
    categorySales: Array<{
      category: string
      salesCount: number
      revenue: number
      percentage: number
    }>
  }
  productPerformance: {
    bestRatedProducts: Array<{
      name: string
      averageRating: number
      reviewCount: number
      price: number
      category: string
    }>
    mostReviewedProducts: Array<{
      name: string
      reviewCount: number
      averageRating: number
      category: string
    }>
  }
  inventoryTrends: {
    monthlyInventoryChange: Array<{
      month: string
      productsAdded: number
      inventoryValueChange: number
      stockMovement: number
    }>
    categoryGrowth: Array<{
      category: string
      growthRate: number
      newProducts: number
    }>
  }
  recentActivity: {
    lowStockAlerts: Array<{
      product: string
      quantity: number
      category: string
      urgency: string
    }>
    recentRestocks: Array<{
      product: string
      previousQuantity: number
      newQuantity: number
      date: string
    }>
    newProducts: Array<{
      name: string
      category: string
      price: number
      createdAt: string
    }>
  }
}

// Color palettes for charts
const STOCK_COLORS = {
  'Out of Stock': '#ef4444',
  'Critical': '#f97316',
  'Low': '#eab308',
  'Medium': '#22c55e',
  'High': '#15803d'
}

const CATEGORY_COLORS = [
  '#3b82f6', '#ef4444', '#10b981', '#f59e0b', '#8b5cf6',
  '#06b6d4', '#84cc16', '#f97316', '#ec4899', '#6366f1'
]


export default function DashboardInventory() {
  const [data, setData] = useState<InventoryData | null>(null)
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d'>('30d')

  const fetchInventoryData = async () => {
    try {
      setLoading(true)
      const response = await fetch(`/api/v1/inventory?range=${timeRange}`)
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        toast.error(result.message || 'Failed to fetch inventory data')
      }
    } catch (error) {
      toast.error('Error fetching inventory data')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchInventoryData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timeRange])

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount)
  }

  const formatNumber = (num: number) => {
    return new Intl.NumberFormat().format(num)
  }

  // Prepare data for charts from actual API data
  const stockLevelData = data?.stockAnalysis.stockLevels || []
  const priceRangeData = data?.priceAnalysis.priceRanges || []
  const salesCategoryData = data?.salesPerformance.categorySales.slice(0, 6) || []
  const monthlyTrendsData = data?.inventoryTrends.monthlyInventoryChange || []
  const topSellingProducts = data?.salesPerformance.topSellingProducts.slice(0, 5) || []
  const bestRatedProducts = data?.productPerformance.bestRatedProducts.slice(0, 5) || []

  // Area Chart Data - Using actual monthly inventory trends
  const areaChartData = monthlyTrendsData.map(item => ({
    name: item.month,
    products: item.productsAdded,
    value: Math.round(item.inventoryValueChange / 1000),
    movement: item.stockMovement
  }))



  // Radial Chart Data - Stock level distribution
  const radialData = stockLevelData.map(level => ({
    name: level.level,
    value: level.percentage,
    count: level.count,
    fill: STOCK_COLORS[level.level as keyof typeof STOCK_COLORS]
  }))

  // Pie Chart Data - Price range distribution
  const pieChartData = priceRangeData.map(range => ({
    name: range.range,
    value: range.count,
    percentage: range.percentage
  }))

  // Bar Chart Data - Top selling products
  const barChartData = topSellingProducts.map(product => ({
    name: product.name.length > 15 ? product.name.substring(0, 15) + '...' : product.name,
    sales: product.salesCount,
    revenue: product.revenue
  }))

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-background border rounded-lg p-3 shadow-lg">
          <p className="font-semibold">{label}</p>
          {payload.map((entry: any, index: number) => (
            <p key={index} style={{ color: entry.color }} className="text-sm">
              {entry.name}: {entry.name.includes('revenue') || entry.name.includes('Value') ? formatCurrency(entry.value) : formatNumber(entry.value)}
            </p>
          ))}
        </div>
      )
    }
    return null
  }

  if (loading && !data) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex items-center justify-center h-96">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Loading inventory dashboard...</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!data) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex items-center justify-center h-96">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Data Available</h3>
              <p className="text-muted-foreground mb-4">
                Unable to load inventory data
              </p>
              <Button onClick={fetchInventoryData}>
                <RefreshCw className="h-4 w-4 mr-2" />
                Try Again
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Inventory Dashboard</h1>
          <p className="text-muted-foreground">
            Comprehensive inventory analytics and stock management overview
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={(value: '7d' | '30d' | '90d') => setTimeRange(value)}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>

          <Button onClick={fetchInventoryData} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
          <Button className="gap-2">
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Products</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(data.overview.totalProducts)}</div>
            <p className="text-xs text-muted-foreground">
              {data.overview.totalCategories} categories • {data.overview.totalSubCategories} sub-categories
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Inventory Value</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.overview.totalInventoryValue)}</div>
            <p className="text-xs text-muted-foreground">
              Avg: {formatCurrency(data.priceAnalysis.averageProductPrice)}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">
              {data.overview.lowStockProducts + data.overview.outOfStockProducts}
            </div>
            <p className="text-xs text-muted-foreground">
              {data.overview.outOfStockProducts} out of stock • {data.overview.lowStockProducts} low stock
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.overview.averageRating.toFixed(1)}/5</div>
            <p className="text-xs text-muted-foreground">
              Based on product reviews and ratings
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Inventory Trends Chart */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Inventory Trends
            </CardTitle>
            <CardDescription>
              Monthly inventory changes and value trends
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={areaChartData}>
                <defs>
                  <linearGradient id="colorProducts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                <Area type="monotone" dataKey="products" stroke="#3b82f6" fillOpacity={1} fill="url(#colorProducts)" name="Products Added" />
                <Area type="monotone" dataKey="value" stroke="#10b981" fillOpacity={1} fill="url(#colorValue)" name="Value (in 000's)" />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Price Range Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Tag className="h-5 w-5" />
              Price Range Distribution
            </CardTitle>
            <CardDescription>
              Product distribution across different price ranges
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieChartData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieChartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[index % CATEGORY_COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => [formatNumber(Number(value)), 'Products']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Stock Level Distribution */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5" />
              Stock Level Distribution
            </CardTitle>
            <CardDescription>
              Percentage distribution across different stock levels
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <RadialBarChart innerRadius="20%" outerRadius="100%" barSize={20} data={radialData}>
                <RadialBar
                  dataKey="value"
                  background
                  forceCornerRadius
                  cornerRadius={4}
                />
                <Legend />
                <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
              </RadialBarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Selling Products */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Top Selling Products
            </CardTitle>
            <CardDescription>
              Best performing products by sales count and revenue
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barChartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={80} />
                <YAxis />
                <Tooltip formatter={(value, name) => [name === 'revenue' ? formatCurrency(Number(value)) : formatNumber(Number(value)), name]} />
                <Legend />
                <Bar dataKey="sales" fill="#3b82f6" name="Sales Count" />
                <Bar dataKey="revenue" fill="#10b981" name="Revenue" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analysis Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Critical Stock Alerts */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-red-600">
              <AlertTriangle className="h-5 w-5" />
              Critical Stock Alerts
            </CardTitle>
            <CardDescription>
              Products that need immediate attention
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {data.stockAnalysis.criticalProducts.slice(0, 5).map((product) => (
                <div key={product._id} className="flex items-center justify-between p-3 border border-red-200 rounded-lg bg-red-50">
                  <div className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${
                      product.quentity === 0 ? 'bg-red-500' : 'bg-orange-500'
                    }`} />
                    <div>
                      <p className="font-medium text-sm">{product.name}</p>
                      <p className="text-xs text-muted-foreground">{product.category}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`font-bold text-sm ${
                      product.quentity === 0 ? 'text-red-600' : 'text-orange-600'
                    }`}>
                      {product.quentity} in stock
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {formatCurrency(product.stockValue)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5" />
              Category Performance
            </CardTitle>
            <CardDescription>
              Sales performance across categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {salesCategoryData.slice(0, 5).map((category, index) => (
                <div key={category.category} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length] }}
                      />
                      <span className="font-medium text-sm">{category.category}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-sm">{formatCurrency(category.revenue)}</span>
                      <Badge variant="outline" className="ml-2">{category.salesCount}</Badge>
                    </div>
                  </div>
                  <div className="w-full bg-secondary rounded-full h-2">
                    <div 
                      className="h-2 rounded-full transition-all duration-500"
                      style={{ 
                        width: `${category.percentage}%`,
                        backgroundColor: CATEGORY_COLORS[index % CATEGORY_COLORS.length]
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity & Best Rated */}
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5" />
              Recent Activity & Top Rated
            </CardTitle>
            <CardDescription>
              Latest updates and best performing products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm mb-2">New Products</h4>
                <div className="space-y-2">
                  {data.recentActivity.newProducts.slice(0, 2).map((product, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="w-2 h-2 bg-green-500 rounded-full" />
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <Badge variant="outline">{formatCurrency(product.price)}</Badge>
                    </div>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 className="font-semibold text-sm mb-2">Best Rated Products</h4>
                <div className="space-y-2">
                  {bestRatedProducts.slice(0, 3).map((product, index) => (
                    <div key={index} className="flex items-center gap-3 p-2 border rounded-lg">
                      <div className="flex items-center gap-1 text-amber-500">
                        <Star className="h-3 w-3 fill-current" />
                        <span className="text-xs font-bold">{product.averageRating.toFixed(1)}</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{product.name}</p>
                        <p className="text-xs text-muted-foreground">{product.category}</p>
                      </div>
                      <Badge variant="secondary">{product.reviewCount} reviews</Badge>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Stock Status Overview */}
      <Card>
        <CardHeader>
          <CardTitle>Stock Status Overview</CardTitle>
          <CardDescription>
            Detailed breakdown of current stock levels across all products
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {stockLevelData.map((level) => (
              <div key={level.level} className="text-center p-4 rounded-lg border">
                <div 
                  className="w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center text-white text-sm font-bold"
                  style={{ backgroundColor: STOCK_COLORS[level.level as keyof typeof STOCK_COLORS] }}
                >
                  {level.count}
                </div>
                <p className="font-semibold text-sm mb-1">{level.level}</p>
                <p className="text-xs text-muted-foreground">{level.percentage.toFixed(1)}% of total</p>
                <p className="text-sm font-medium mt-2">{formatCurrency(level.value)}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}