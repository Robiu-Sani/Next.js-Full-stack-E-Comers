/* eslint-disable @typescript-eslint/no-unused-vars */
'use client'

import React, { useState, useEffect } from 'react'
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table"
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card"
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu"
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogFooter, 
  DialogHeader, 
  DialogTitle 
} from "@/components/ui/dialog"
import { 
  AlertDialog, 
  AlertDialogAction, 
  AlertDialogCancel, 
  AlertDialogContent, 
  AlertDialogDescription, 
  AlertDialogFooter, 
  AlertDialogHeader, 
  AlertDialogTitle 
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select"
import { 
  MoreHorizontal, 
  Search, 
  Eye, 
  Edit, 
  Trash2, 
  Printer, 
  Package, 
  Filter,
  Download,
  Truck,
  CheckCircle,
  XCircle,
  Loader2
} from 'lucide-react'
import { toast } from "sonner"
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  _id: string
  name: string
  images: string[]
  generalPrice: {
    currentPrice: number
    prevPrice: number
    discountPercentage: number
  }
}

interface Order {
  _id: string
  orderId: string
  name: string
  number: string
  address: string
  products: Product[]
  totalAmount: number
  deliveryCharge: number
  discount: number
  grandTotal: number
  paymentMethod: string
  paymentStatus: string
  orderStatus: string
  trackingId?: string
  note?: string
  isDelivered: boolean
  isPaid: boolean
  isDeleted: boolean
  createdAt: string
  updatedAt: string
}

interface OrdersResponse {
  success: boolean
  data: Order[]
  pagination: {
    total: number
    page: number
    limit: number
    totalPages: number
    hasNextPage: boolean
    hasPrevPage: boolean
  }
  filters: {
    search: string
    orderStatus: string | null
    paymentStatus: string | null
    paymentMethod: string | null
    sortBy: string
    sortOrder: string
  }
}

interface EditOrderForm {
  name: string
  number: string
  address: string
  paymentStatus: string
  orderStatus: string
  isDelivered: boolean
  isPaid: boolean
}

interface SteadfastResponse {
  success: boolean
  message: string
  data?: {
    order: Order
    steadfast: {
      consignment_id: number
      invoice: string
      tracking_code: string
      status: string
    }
  }
}

export default function AllOrderData() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [orderStatus, setOrderStatus] = useState<string>('')
  const [paymentStatus, setPaymentStatus] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(50)
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [selectedOrders, setSelectedOrders] = useState<string[]>([])
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [printDialogOpen, setPrintDialogOpen] = useState(false)
  const [steadfastDialogOpen, setSteadfastDialogOpen] = useState(false)
  const [bulkSteadfastDialogOpen, setBulkSteadfastDialogOpen] = useState(false)
  const [creatingSteadfast, setCreatingSteadfast] = useState(false)
  const [creatingBulkSteadfast, setCreatingBulkSteadfast] = useState(false)
  
  const [editForm, setEditForm] = useState<EditOrderForm>({
    name: '',
    number: '',
    address: '',
    paymentStatus: '',
    orderStatus: '',
    isDelivered: false,
    isPaid: false
  })

  const fetchOrders = async () => {
    try {
      setLoading(true)
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        ...(search && { search }),
        ...(orderStatus && { orderStatus }),
        ...(paymentStatus && { paymentStatus }),
        ...(paymentMethod && { paymentMethod }),
        sortBy: 'createdAt',
        sortOrder: 'desc'
      })

      const response = await fetch(`/api/v1/order?${params}`)
      const data: OrdersResponse = await response.json()

      if (data.success) {
        setOrders(data.data)
      } else {
        toast.error('Failed to fetch orders')
      }
    } catch (error) {
      toast.error('Error fetching orders')
      console.error('Error fetching orders:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchOrders()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, limit, search, orderStatus, paymentStatus, paymentMethod])


  
  const handleUpdateOrder = async () => {
    if (!selectedOrder) return

    try {
      const response = await fetch(`/api/v1/order/${selectedOrder._id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      })

      if (response.ok) {
        toast.success('Order updated successfully')
        setEditDialogOpen(false)
        fetchOrders()
      } else {
        toast.error('Failed to update order')
      }
    } catch (error) {
      toast.error('Error updating order')
      console.error('Error updating order:', error)
    }
  }

  const handleDeleteOrder = async () => {
    if (!selectedOrder) return

    try {
      const response = await fetch(`/api/v1/order/${selectedOrder._id}`, {
        method: 'DELETE',
      })

      if (response.ok) {
        toast.success('Order deleted successfully')
        setDeleteDialogOpen(false)
        fetchOrders()
      } else {
        toast.error('Failed to delete order')
      }
    } catch (error) {
      toast.error('Error deleting order')
      console.error('Error deleting order:', error)
    }
  }

  const handlePrintOrder = (order: Order) => {
    setSelectedOrder(order)
    setPrintDialogOpen(true)
  }

  const handleCreateSteadfastOrder = async (order: Order) => {
    setSelectedOrder(order)
    setCreatingSteadfast(true)
    
    try {
      const response = await fetch('/api/v1/steadfast-order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderId: order._id
        }),
      })

      const result: SteadfastResponse = await response.json()

      if (result.success) {
        toast.success('Order created successfully in Steadfast')
        setSteadfastDialogOpen(true)
        fetchOrders() // Refresh to get updated tracking info
      } else {
        toast.error(result.message || 'Failed to create Steadfast order')
      }
    } catch (error) {
      toast.error('Error creating Steadfast order')
      console.error('Error creating Steadfast order:', error)
    } finally {
      setCreatingSteadfast(false)
    }
  }

  const handleBulkCreateSteadfastOrders = async () => {
    if (selectedOrders.length === 0) {
      toast.error('Please select orders to create in Steadfast')
      return
    }

    setCreatingBulkSteadfast(true)
    
    try {
      const response = await fetch('/api/v1/steadfast-order/bulk', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          orderIds: selectedOrders
        }),
      })

      const result = await response.json()

      if (result.success) {
        toast.success(`Bulk order processed. ${result.data.successful} successful, ${result.data.failed} failed.`)
        setBulkSteadfastDialogOpen(false)
        setSelectedOrders([])
        fetchOrders() // Refresh to get updated tracking info
        
        // Show detailed results
        if (result.data.failed > 0) {
          toast.error(`${result.data.failed} orders failed to process. Check console for details.`)
          console.log('Bulk order details:', result.data.details)
        }
      } else {
        toast.error(result.message || 'Failed to create bulk Steadfast orders')
      }
    } catch (error) {
      toast.error('Error creating bulk Steadfast orders')
      console.error('Error creating bulk Steadfast orders:', error)
    } finally {
      setCreatingBulkSteadfast(false)
    }
  }

  const toggleOrderSelection = (orderId: string) => {
    setSelectedOrders(prev => 
      prev.includes(orderId) 
        ? prev.filter(id => id !== orderId)
        : [...prev, orderId]
    )
  }

  const selectAllOrders = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([])
    } else {
      setSelectedOrders(orders.map(order => order._id))
    }
  }

  const getStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline", label: string } } = {
      pending: { variant: "outline", label: "Pending" },
      confirmed: { variant: "secondary", label: "Confirmed" },
      processing: { variant: "secondary", label: "Processing" },
      shipped: { variant: "default", label: "Shipped" },
      delivered: { variant: "default", label: "Delivered" },
      cancelled: { variant: "destructive", label: "Cancelled" }
    }
    return statusConfig[status] || { variant: "outline" as const, label: status }
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig: { [key: string]: { variant: "default" | "secondary" | "destructive" | "outline", label: string } } = {
      pending: { variant: "outline", label: "Pending" },
      paid: { variant: "default", label: "Paid" },
      failed: { variant: "destructive", label: "Failed" },
      refunded: { variant: "destructive", label: "Refunded" }
    }
    return statusConfig[status] || { variant: "outline" as const, label: status }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(amount)
  }

  if (loading && orders.length === 0) {
    return (
      <div className="container mx-auto py-6">
        <Card>
          <CardContent className="flex items-center justify-center h-64">
            <div className="text-center">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Loading orders...</p>
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
          <h1 className="text-3xl font-bold tracking-tight">Order Management</h1>
          <p className="text-muted-foreground">
            Manage and track all customer orders
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={fetchOrders} variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            Refresh
          </Button>
          {selectedOrders.length > 0 && (
            <Button 
              onClick={() => setBulkSteadfastDialogOpen(true)}
              className="gap-2 bg-blue-600 hover:bg-blue-700"
            >
              <Truck className="h-4 w-4" />
              Create Steadfast ({selectedOrders.length})
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Filter className="h-5 w-5" />
            Filters & Search
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label htmlFor="search">Search</Label>
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="search"
                  placeholder="Search orders..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="orderStatus">Order Status</Label>
              <Select value={orderStatus} onValueChange={setOrderStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="confirmed">Confirmed</SelectItem>
                  <SelectItem value="processing">Processing</SelectItem>
                  <SelectItem value="shipped">Shipped</SelectItem>
                  <SelectItem value="delivered">Delivered</SelectItem>
                  <SelectItem value="cancelled">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentStatus">Payment Status</Label>
              <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="All payments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Payments</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                  <SelectItem value="refunded">Refunded</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="paymentMethod">Payment Method</Label>
              <Select value={paymentMethod} onValueChange={setPaymentMethod}>
                <SelectTrigger>
                  <SelectValue placeholder="All methods" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Methods</SelectItem>
                  <SelectItem value="cash-on-delivery">Cash on Delivery</SelectItem>
                  <SelectItem value="bkash">bKash</SelectItem>
                  <SelectItem value="nagad">Nagad</SelectItem>
                  <SelectItem value="rocket">Rocket</SelectItem>
                  <SelectItem value="card">Card</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Orders Table */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <CardTitle>All Orders</CardTitle>
              <CardDescription>
                {orders.length} orders found
              </CardDescription>
            </div>
            {orders.length > 0 && (
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={selectedOrders.length === orders.length && orders.length > 0}
                  onChange={selectAllOrders}
                  className="rounded border-gray-300"
                />
                <Label className="text-sm">
                  Select all ({selectedOrders.length} selected)
                </Label>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12">
                  Select
                </TableHead>
                <TableHead>Order ID</TableHead>
                <TableHead>Customer</TableHead>
                <TableHead>Products</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => {
                const statusBadge = getStatusBadge(order.orderStatus)
                const paymentBadge = getPaymentStatusBadge(order.paymentStatus)
                const isSelected = selectedOrders.includes(order._id)
                
                return (
                  <TableRow key={order._id} className={isSelected ? 'bg-blue-50' : ''}>
                    <TableCell>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleOrderSelection(order._id)}
                        className="rounded border-gray-300"
                      />
                    </TableCell>
                    <TableCell className="font-medium">
                      <div className="flex flex-col">
                        <span className="font-semibold">{order.orderId}</span>
                        {order.trackingId && (
                          <span className="text-xs text-muted-foreground">
                            Track: {order.trackingId}
                          </span>
                        )}
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">{order.name}</span>
                        <span className="text-sm text-muted-foreground">{order.number}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <div className="flex -space-x-2">
                          {order.products.slice(0, 3).map((product, index) => (
                            <div key={index} className="relative">
                              <Image
                                src={product.images[0]}
                                alt={product.name}
                                width={32}
                                height={32}
                                className="rounded-full border-2 border-background object-cover"
                              />
                              {index === 2 && order.products.length > 3 && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full text-white text-xs">
                                  +{order.products.length - 3}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">
                          {order.products.length} items
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {formatCurrency(order.grandTotal)}
                    </TableCell>
                    <TableCell>
                      <Badge variant={statusBadge.variant}>
                        {statusBadge.label}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col gap-1">
                        <Badge variant={paymentBadge.variant}>
                          {paymentBadge.label}
                        </Badge>
                        <span className="text-xs text-muted-foreground capitalize">
                          {order.paymentMethod.replace(/-/g, ' ')}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="text-sm">
                          {formatDate(order.createdAt)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuLabel>Actions</DropdownMenuLabel>
                          <Link href={`/dashboard/orders/details/${order._id}`}>
                            <DropdownMenuItem>
                              <Eye className="h-4 w-4 mr-2" />
                              View Details
                            </DropdownMenuItem>
                          </Link>
                          <Link href={`/dashboard/orders/edit/${order._id}`}>
                            <DropdownMenuItem>
                              <Edit className="h-4 w-4 mr-2" />
                              Edit Order
                            </DropdownMenuItem>
                          </Link>
                          <DropdownMenuItem onClick={() => handlePrintOrder(order)}>
                            <Printer className="h-4 w-4 mr-2" />
                            Print Receipt
                          </DropdownMenuItem>
                          {!order.trackingId && (
                            <DropdownMenuItem 
                              onClick={() => handleCreateSteadfastOrder(order)}
                              disabled={creatingSteadfast}
                            >
                              {creatingSteadfast ? (
                                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                              ) : (
                                <Truck className="h-4 w-4 mr-2" />
                              )}
                              Create Steadfast
                            </DropdownMenuItem>
                          )}
                          {order.trackingId && (
                            <DropdownMenuItem className="text-green-600">
                              <CheckCircle className="h-4 w-4 mr-2" />
                              Steadfast Created
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            onClick={() => {
                              setSelectedOrder(order)
                              setDeleteDialogOpen(true)
                            }}
                            className="text-red-600"
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            Delete Order
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>

          {orders.length === 0 && !loading && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-semibold">No orders found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search or filters
              </p>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {orders.length} of {orders.length} orders
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page - 1)}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage(page + 1)}
            disabled={page >= Math.ceil(orders.length / limit)}
          >
            Next
          </Button>
        </div>
      </div>

      {/* View Order Dialog */}
      <Dialog open={viewDialogOpen} onOpenChange={setViewDialogOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Order Details - {selectedOrder?.orderId}</DialogTitle>
            <DialogDescription>
              Complete information for this order
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-6">
              {/* Order Summary */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Customer Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <Label>Name</Label>
                      <p className="font-medium">{selectedOrder.name}</p>
                    </div>
                    <div>
                      <Label>Phone Number</Label>
                      <p className="font-medium">{selectedOrder.number}</p>
                    </div>
                    <div>
                      <Label>Address</Label>
                      <p className="text-sm">{selectedOrder.address}</p>
                    </div>
                    {selectedOrder.note && (
                      <div>
                        <Label>Order Note</Label>
                        <p className="text-sm text-muted-foreground">{selectedOrder.note}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Order Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between">
                      <span>Order Status:</span>
                      <Badge variant={getStatusBadge(selectedOrder.orderStatus).variant}>
                        {getStatusBadge(selectedOrder.orderStatus).label}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Status:</span>
                      <Badge variant={getPaymentStatusBadge(selectedOrder.paymentStatus).variant}>
                        {getPaymentStatusBadge(selectedOrder.paymentStatus).label}
                      </Badge>
                    </div>
                    <div className="flex justify-between">
                      <span>Payment Method:</span>
                      <span className="capitalize">{selectedOrder.paymentMethod.replace(/-/g, ' ')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Order Date:</span>
                      <span>{formatDate(selectedOrder.createdAt)}</span>
                    </div>
                    {selectedOrder.trackingId && (
                      <div className="flex justify-between">
                        <span>Tracking ID:</span>
                        <span className="font-mono">{selectedOrder.trackingId}</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>

              {/* Products */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {selectedOrder.products.map((product, index) => (
                      <div key={index} className="flex items-center gap-4 p-3 border rounded-lg">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          width={60}
                          height={60}
                          className="rounded-md object-cover"
                        />
                        <div className="flex-1">
                          <h4 className="font-medium">{product.name}</h4>
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Price: {formatCurrency(product.generalPrice.currentPrice)}</span>
                            {product.generalPrice.prevPrice > product.generalPrice.currentPrice && (
                              <span className="line-through">
                                {formatCurrency(product.generalPrice.prevPrice)}
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Pricing */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Pricing Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span>{formatCurrency(selectedOrder.totalAmount)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Delivery Charge:</span>
                      <span>{formatCurrency(selectedOrder.deliveryCharge)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Discount:</span>
                      <span className="text-red-600">-{formatCurrency(selectedOrder.discount)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-bold border-t pt-2">
                      <span>Grand Total:</span>
                      <span className="text-green-600">{formatCurrency(selectedOrder.grandTotal)}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <DialogFooter>
                <Link href={`/dashboard/orders/edit/${selectedOrder._id}`}>
                  <Button>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Order
                  </Button>
                </Link>
              </DialogFooter>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Edit Order Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Edit Order - {selectedOrder?.orderId}</DialogTitle>
            <DialogDescription>
              Update order information and status
            </DialogDescription>
          </DialogHeader>
          
          {selectedOrder && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Customer Name</Label>
                  <Input
                    id="name"
                    value={editForm.name}
                    onChange={(e) => setEditForm({...editForm, name: e.target.value})}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="number">Phone Number</Label>
                  <Input
                    id="number"
                    value={editForm.number}
                    onChange={(e) => setEditForm({...editForm, number: e.target.value})}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Input
                  id="address"
                  value={editForm.address}
                  onChange={(e) => setEditForm({...editForm, address: e.target.value})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="orderStatus">Order Status</Label>
                  <Select 
                    value={editForm.orderStatus} 
                    onValueChange={(value) => setEditForm({...editForm, orderStatus: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paymentStatus">Payment Status</Label>
                  <Select 
                    value={editForm.paymentStatus} 
                    onValueChange={(value) => setEditForm({...editForm, paymentStatus: value})}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="failed">Failed</SelectItem>
                      <SelectItem value="refunded">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isDelivered"
                    checked={editForm.isDelivered}
                    onChange={(e) => setEditForm({...editForm, isDelivered: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="isDelivered">Order Delivered</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isPaid"
                    checked={editForm.isPaid}
                    onChange={(e) => setEditForm({...editForm, isPaid: e.target.checked})}
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor="isPaid">Payment Received</Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleUpdateOrder}>
              Update Order
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the order
              {selectedOrder && ` ${selectedOrder.orderId}`} and remove it from our servers.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteOrder} className="bg-red-600 hover:bg-red-700">
              Delete Order
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Print Receipt Dialog */}
<Dialog open={printDialogOpen} onOpenChange={setPrintDialogOpen}>
  <DialogContent className="max-w-2xl">
    <DialogHeader>
      <DialogTitle>Order Receipt - {selectedOrder?.orderId}</DialogTitle>
    </DialogHeader>
    
    {selectedOrder && (
      <>
        {/* Receipt content for display */}
        <div className="space-y-6">
          {/* Receipt Header */}
          <div className="text-center border-b pb-4">
            {process.env.NEXT_PUBLIC_LOGO && (
              <Image
                src={process.env.NEXT_PUBLIC_LOGO}
                alt="Shop Logo"
                width={80}
                height={80}
                className="mx-auto mb-2"
              />
            )}
            <h2 className="text-2xl font-bold">{process.env.NEXT_PUBLIC_NAME || 'Our Shop'}</h2>
            <p className="text-muted-foreground">Order Receipt</p>
          </div>

          {/* Order Information */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <strong>Order ID:</strong> {selectedOrder.orderId}
            </div>
            <div>
              <strong>Date:</strong> {formatDate(selectedOrder.createdAt)}
            </div>
            <div>
              <strong>Customer:</strong> {selectedOrder.name}
            </div>
            <div>
              <strong>Phone:</strong> {selectedOrder.number}
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-semibold mb-2">Order Items:</h3>
            <div className="space-y-2">
              {selectedOrder.products.map((product, index) => (
                <div key={index} className="flex justify-between text-sm">
                  <span>{product.name}</span>
                  <span>{formatCurrency(product.generalPrice.currentPrice)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Summary */}
          <div className="border-t pt-2 space-y-1 text-sm">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatCurrency(selectedOrder.totalAmount)}</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery:</span>
              <span>{formatCurrency(selectedOrder.deliveryCharge)}</span>
            </div>
            <div className="flex justify-between">
              <span>Discount:</span>
              <span>-{formatCurrency(selectedOrder.discount)}</span>
            </div>
            <div className="flex justify-between font-bold text-base border-t pt-2">
              <span>Total:</span>
              <span>{formatCurrency(selectedOrder.grandTotal)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-xs text-muted-foreground border-t pt-4">
            <p>Thank you for your business!</p>
            <p>For any queries, contact: {selectedOrder.number}</p>
          </div>
        </div>

        {/* Hidden receipt content for printing only */}
        <div id="receipt-print-content" className="hidden">
          <div className="p-8 max-w-md mx-auto">
            {/* Receipt Header */}
            <div className="text-center border-b-2 border-gray-800 pb-4 mb-6">
               <Image width={100} height={100}
                  src='/logo.png'
                  alt="Shop Logo" 
                  className="h-16 w-16 mx-auto mb-2 object-contain"
                />
              <h2 className="text-xl font-bold">{process.env.NEXT_PUBLIC_NAME || 'Our Shop'}</h2>
              <p className="text-sm text-gray-600">Order Receipt</p>
            </div>

            {/* Order Information */}
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span><strong>Order ID:</strong></span>
                <span>{selectedOrder.orderId}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span><strong>Date:</strong></span>
                <span>{formatDate(selectedOrder.createdAt)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span><strong>Customer:</strong></span>
                <span>{selectedOrder.name}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span><strong>Phone:</strong></span>
                <span>{selectedOrder.number}</span>
              </div>
            </div>

            {/* Products */}
            <div className="mb-4">
              <h3 className="font-semibold text-sm mb-2 border-b border-gray-300 pb-1">Order Items:</h3>
              <div className="space-y-1">
                {selectedOrder.products.map((product, index) => (
                  <div key={index} className="flex justify-between text-xs">
                    <span className="flex-1">{product.name}</span>
                    <span className="ml-2">{formatCurrency(product.generalPrice.currentPrice)}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pricing Summary */}
            <div className="border-t-2 border-gray-800 pt-2 space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatCurrency(selectedOrder.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery:</span>
                <span>{formatCurrency(selectedOrder.deliveryCharge)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span>-{formatCurrency(selectedOrder.discount)}</span>
              </div>
              <div className="flex justify-between font-bold text-base border-t border-gray-300 mt-2 pt-2">
                <span>Total:</span>
                <span>{formatCurrency(selectedOrder.grandTotal)}</span>
              </div>
            </div>

            {/* Footer */}
            <div className="text-center text-xs text-gray-500 border-t border-gray-300 mt-4 pt-4">
              <p>Thank you for your business!</p>
              <p>For any queries, contact: {selectedOrder.number}</p>
            </div>
          </div>
        </div>
      </>
    )}

    <DialogFooter>
      <Button variant="outline" onClick={() => setPrintDialogOpen(false)}>
        Close
      </Button>
      <Button onClick={() => {
        const printContent = document.getElementById('receipt-print-content');
        const originalContents = document.body.innerHTML;
        
        if (printContent) {
          document.body.innerHTML = printContent.innerHTML;
          window.print();
          document.body.innerHTML = originalContents;
          window.location.reload();
        }
      }} className="gap-2">
        <Printer className="h-4 w-4" />
        Print Receipt
      </Button>
    </DialogFooter>
  </DialogContent>
</Dialog>

      {/* Steadfast Success Dialog */}
      <Dialog open={steadfastDialogOpen} onOpenChange={setSteadfastDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-green-600">
              <CheckCircle className="h-5 w-5" />
              Steadfast Order Created
            </DialogTitle>
          </DialogHeader>
          {selectedOrder && (
            <div className="space-y-4">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  Order <strong>{selectedOrder.orderId}</strong> has been successfully created in Steadfast Courier.
                </p>
                {selectedOrder.trackingId && (
                  <p className="text-sm text-green-800 mt-2">
                    <strong>Tracking ID:</strong> {selectedOrder.trackingId}
                  </p>
                )}
              </div>
              <div className="text-sm text-muted-foreground">
                The order status has been updated to ``Confirmed`` and tracking information has been added.
              </div>
            </div>
          )}
          <DialogFooter>
            <Button onClick={() => setSteadfastDialogOpen(false)}>
              Continue
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Steadfast Dialog */}
      <Dialog open={bulkSteadfastDialogOpen} onOpenChange={setBulkSteadfastDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Truck className="h-5 w-5" />
              Create Bulk Steadfast Orders
            </DialogTitle>
            <DialogDescription>
              Create Steadfast courier orders for {selectedOrders.length} selected orders
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-800">
                This will create Steadfast courier orders for all selected orders. 
                Orders that already have tracking IDs will be skipped.
              </p>
            </div>

            <div className="max-h-60 overflow-y-auto">
              <h4 className="font-semibold text-sm mb-2">Selected Orders:</h4>
              <div className="space-y-2">
                {orders
                  .filter(order => selectedOrders.includes(order._id))
                  .map(order => (
                    <div key={order._id} className="flex items-center justify-between text-sm p-2 border rounded">
                      <span>{order.orderId}</span>
                      {order.trackingId ? (
                        <Badge variant="outline" className="text-green-600">
                          Has Tracking
                        </Badge>
                      ) : (
                        <Badge variant="outline">Ready</Badge>
                      )}
                    </div>
                  ))
                }
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setBulkSteadfastDialogOpen(false)}
              disabled={creatingBulkSteadfast}
            >
              Cancel
            </Button>
            <Button 
              onClick={handleBulkCreateSteadfastOrders}
              disabled={creatingBulkSteadfast}
              className="gap-2"
            >
              {creatingBulkSteadfast && (
                <Loader2 className="h-4 w-4 animate-spin" />
              )}
              <Truck className="h-4 w-4" />
              Create {selectedOrders.length} Orders
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}