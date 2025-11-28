'use client'

import React, { useState, useEffect } from 'react'
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { 
  BarChart3, 
  TrendingUp, 
  Package, 
  DollarSign, 
  MapPin,
  CreditCard,
  Calendar,
  RefreshCw,
  ShoppingCart,
  CheckCircle,
  Clock,
  XCircle,
  Truck
} from 'lucide-react'
import { toast } from "sonner"

interface AnalysisData {
  overview: {
    totalOrders: number
    totalRevenue: number
    averageOrderValue: number
    deliveredOrders: number
    pendingOrders: number
    cancelledOrders: number
    currentMonthOrders: number
    currentMonthRevenue: number
  }
  yearlyAnalysis: Array<{
    year: number
    totalOrders: number
    totalRevenue: number
    averageOrderValue: number
    growthRate?: number
  }>
  monthlyAnalysis: Array<{
    year: number
    month: number
    monthName: string
    totalOrders: number
    totalRevenue: number
    averageOrderValue: number
  }>
  dailyAnalysis: Array<{
    date: string
    day: string
    totalOrders: number
    totalRevenue: number
    averageOrderValue: number
  }>
  addressAnalysis: Array<{
    area: string
    subArea?: string
    totalOrders: number
    totalCustomers: number
    totalRevenue: number
  }>
  paymentMethodAnalysis: Array<{
    method: string
    totalOrders: number
    totalRevenue: number
    percentage: number
  }>
  statusAnalysis: Array<{
    status: string
    count: number
    percentage: number
  }>
  recentOrders: Array<{
    _id: string
    orderId: string
    name: string
    totalAmount: number
    orderStatus: string
    paymentStatus: string
    createdAt: string
  }>
}

export default function OrderAnalysisData() {
  const [data, setData] = useState<AnalysisData | null>(null)
  const [loading, setLoading] = useState(true)
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedMonth, setSelectedMonth] = useState(0)
  const [activeTab, setActiveTab] = useState('overview')

  const fetchAnalysisData = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        year: selectedYear.toString(),
        ...(selectedMonth > 0 && { month: selectedMonth.toString() })
      })

      const response = await fetch(`/api/v1/order-analysis?${params}`)
      const result = await response.json()

      if (result.success) {
        setData(result.data)
      } else {
        toast.error(result.message || 'Failed to fetch analysis data')
      }
    } catch (error) {
      toast.error('Error fetching analysis data')
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAnalysisData()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedYear, selectedMonth])

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

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "outline" as const, label: "Pending", icon: <Clock className="h-3 w-3" /> },
      confirmed: { variant: "secondary" as const, label: "Confirmed", icon: <CheckCircle className="h-3 w-3" /> },
      processing: { variant: "secondary" as const, label: "Processing", icon: <Package className="h-3 w-3" /> },
      shipped: { variant: "default" as const, label: "Shipped", icon: <Truck className="h-3 w-3" /> },
      delivered: { variant: "success" as const, label: "Delivered", icon: <CheckCircle className="h-3 w-3" /> },
      cancelled: { variant: "destructive" as const, label: "Cancelled", icon: <XCircle className="h-3 w-3" /> }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return (
      <Badge  className="flex items-center gap-1">
        {config.icon}
        {config.label}
      </Badge>
    )
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "outline" as const, label: "Pending" },
      paid: { variant: "success" as const, label: "Paid" },
      failed: { variant: "destructive" as const, label: "Failed" },
      refunded: { variant: "destructive" as const, label: "Refunded" }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge>{config.label}</Badge>
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 70) return 'bg-green-500'
    if (percentage >= 40) return 'bg-yellow-500'
    return 'bg-red-500'
  }

  if (loading && !data) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Loading analysis data...</p>
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
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <BarChart3 className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No Data Available</h3>
              <p className="text-muted-foreground mb-4">
                Unable to load order analysis data
              </p>
              <Button onClick={fetchAnalysisData}>
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
          <h1 className="text-3xl font-bold tracking-tight">Order Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive analysis of order performance and trends
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedYear.toString()} onValueChange={(value) => setSelectedYear(parseInt(value))}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Array.from({ length: 5 }, (_, i) => new Date().getFullYear() - i).map(year => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedMonth.toString()} onValueChange={(value) => setSelectedMonth(parseInt(value))}>
            <SelectTrigger className="w-40">
              <SelectValue placeholder="All months" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="0">All Months</SelectItem>
              {[
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
              ].map((month, index) => (
                <SelectItem key={index + 1} value={(index + 1).toString()}>
                  {month}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Button onClick={fetchAnalysisData} variant="outline" className="gap-2">
            <RefreshCw className="h-4 w-4" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatNumber(data.overview.totalOrders)}</div>
            <p className="text-xs text-muted-foreground">
              {data.overview.currentMonthOrders} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.overview.totalRevenue)}</div>
            <p className="text-xs text-muted-foreground">
              {formatCurrency(data.overview.currentMonthRevenue)} this month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Average Order</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(data.overview.averageOrderValue)}</div>
            <p className="text-xs text-muted-foreground">
              Per order value
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Delivery Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((data.overview.deliveredOrders / data.overview.totalOrders) * 100).toFixed(1)}%
            </div>
            <p className="text-xs text-muted-foreground">
              {data.overview.deliveredOrders} delivered
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="timeline" className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            Timeline
          </TabsTrigger>
          <TabsTrigger value="geography" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Geography
          </TabsTrigger>
          <TabsTrigger value="payments" className="flex items-center gap-2">
            <CreditCard className="h-4 w-4" />
            Payments
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Package className="h-4 w-4" />
            Recent
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Order Status Distribution */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status Distribution</CardTitle>
                <CardDescription>
                  Current status of all orders
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.statusAnalysis.map((status) => (
                    <div key={status.status} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        {getStatusBadge(status.status)}
                        <span className="text-sm text-muted-foreground">
                          {status.count} orders
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{status.percentage.toFixed(1)}%</span>
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(status.percentage)}`}
                            style={{ width: `${status.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Payment Methods */}
            <Card>
              <CardHeader>
                <CardTitle>Payment Methods</CardTitle>
                <CardDescription>
                  Distribution of payment methods used
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.paymentMethodAnalysis.map((method) => (
                    <div key={method.method} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="capitalize">
                          {method.method.replace(/-/g, ' ')}
                        </Badge>
                        <span className="text-sm text-muted-foreground">
                          {formatCurrency(method.totalRevenue)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{method.percentage.toFixed(1)}%</span>
                        <div className="w-20 bg-secondary rounded-full h-2">
                          <div 
                            className="h-2 rounded-full bg-blue-500"
                            style={{ width: `${method.percentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Top Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Top Delivery Areas</CardTitle>
              <CardDescription>
                Areas with highest order concentration
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Area</TableHead>
                    <TableHead>Sub Area</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead>Customers</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.addressAnalysis.slice(0, 10).map((area) => (
                    <TableRow key={`${area.area}-${area.subArea}`}>
                      <TableCell className="font-medium">{area.area}</TableCell>
                      <TableCell>{area.subArea}</TableCell>
                      <TableCell>{formatNumber(area.totalOrders)}</TableCell>
                      <TableCell>{formatNumber(area.totalCustomers)}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(area.totalRevenue)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Timeline Tab */}
        <TabsContent value="timeline" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Monthly Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Monthly Performance - {selectedYear}</CardTitle>
                <CardDescription>
                  Order and revenue trends by month
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Month</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Average</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.monthlyAnalysis.map((month) => (
                      <TableRow key={month.month}>
                        <TableCell className="font-medium">{month.monthName}</TableCell>
                        <TableCell>{formatNumber(month.totalOrders)}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(month.totalRevenue)}
                        </TableCell>
                        <TableCell className="text-right text-muted-foreground">
                          {formatCurrency(month.averageOrderValue)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Yearly Analysis */}
            <Card>
              <CardHeader>
                <CardTitle>Yearly Growth</CardTitle>
                <CardDescription>
                  Year-over-year performance comparison
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Year</TableHead>
                      <TableHead>Orders</TableHead>
                      <TableHead className="text-right">Revenue</TableHead>
                      <TableHead className="text-right">Growth</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {data.yearlyAnalysis.map((year) => (
                      <TableRow key={year.year}>
                        <TableCell className="font-medium">{year.year}</TableCell>
                        <TableCell>{formatNumber(year.totalOrders)}</TableCell>
                        <TableCell className="text-right font-medium">
                          {formatCurrency(year.totalRevenue)}
                        </TableCell>
                        <TableCell className="text-right">
                          {year.growthRate ? (
                            <Badge >
                              {year.growthRate >= 0 ? '+' : ''}{year.growthRate}%
                            </Badge>
                          ) : (
                            <span className="text-muted-foreground">-</span>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Daily Analysis */}
          <Card>
            <CardHeader>
              <CardTitle>Daily Orders</CardTitle>
              <CardDescription>
                Recent daily order activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Day</TableHead>
                    <TableHead>Orders</TableHead>
                    <TableHead className="text-right">Revenue</TableHead>
                    <TableHead className="text-right">Average</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.dailyAnalysis.map((day) => (
                    <TableRow key={day.date}>
                      <TableCell className="font-medium">{day.date}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{day.day}</Badge>
                      </TableCell>
                      <TableCell>{formatNumber(day.totalOrders)}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(day.totalRevenue)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatCurrency(day.averageOrderValue)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geography Tab */}
        <TabsContent value="geography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Geographical Distribution</CardTitle>
              <CardDescription>
                Order distribution across different areas
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Area</TableHead>
                    <TableHead>Sub Area</TableHead>
                    <TableHead>Total Orders</TableHead>
                    <TableHead>Unique Customers</TableHead>
                    <TableHead className="text-right">Total Revenue</TableHead>
                    <TableHead className="text-right">Average per Order</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.addressAnalysis.map((area) => (
                    <TableRow key={`${area.area}-${area.subArea}`}>
                      <TableCell className="font-medium">{area.area}</TableCell>
                      <TableCell>{area.subArea}</TableCell>
                      <TableCell>{formatNumber(area.totalOrders)}</TableCell>
                      <TableCell>{formatNumber(area.totalCustomers)}</TableCell>
                      <TableCell className="text-right font-medium">
                        {formatCurrency(area.totalRevenue)}
                      </TableCell>
                      <TableCell className="text-right text-muted-foreground">
                        {formatCurrency(area.totalRevenue / area.totalOrders)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments Tab */}
        <TabsContent value="payments" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Payment Method Analysis</CardTitle>
                <CardDescription>
                  Distribution and performance by payment method
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {data.paymentMethodAnalysis.map((method) => (
                    <div key={method.method} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="capitalize">
                            {method.method.replace(/-/g, ' ')}
                          </Badge>
                          <span className="text-sm text-muted-foreground">
                            {method.totalOrders} orders
                          </span>
                        </div>
                        <span className="text-sm font-medium">{method.percentage.toFixed(1)}%</span>
                      </div>
                      <div className="w-full bg-secondary rounded-full h-3">
                        <div 
                          className="h-3 rounded-full bg-blue-500 transition-all duration-500"
                          style={{ width: `${method.percentage}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>Total Revenue:</span>
                        <span className="font-medium">{formatCurrency(method.totalRevenue)}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Revenue by Payment Method</CardTitle>
                <CardDescription>
                  Financial performance across payment channels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.paymentMethodAnalysis.map((method) => (
                    <div key={method.method} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium capitalize">{method.method.replace(/-/g, ' ')}</p>
                          <p className="text-sm text-muted-foreground">{method.totalOrders} orders</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(method.totalRevenue)}</p>
                        <p className="text-sm text-muted-foreground">{method.percentage.toFixed(1)}%</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Recent Orders Tab */}
        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Latest orders for quick monitoring
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Order ID</TableHead>
                    <TableHead>Customer</TableHead>
                    <TableHead>Amount</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead className="text-right">Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recentOrders.map((order) => (
                    <TableRow key={order._id}>
                      <TableCell className="font-medium">{order.orderId}</TableCell>
                      <TableCell>{order.name}</TableCell>
                      <TableCell className="font-medium">
                        {formatCurrency(order.totalAmount)}
                      </TableCell>
                      <TableCell>{getStatusBadge(order.orderStatus)}</TableCell>
                      <TableCell>{getPaymentStatusBadge(order.paymentStatus)}</TableCell>
                      <TableCell className="text-right text-sm text-muted-foreground">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}