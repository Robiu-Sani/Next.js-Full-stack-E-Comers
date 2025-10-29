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
  Download
} from 'lucide-react'
import { toast } from "sonner"
import Image from 'next/image'

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

export default function AllOrderData() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [orderStatus, setOrderStatus] = useState<string>('')
  const [paymentStatus, setPaymentStatus] = useState<string>('')
  const [paymentMethod, setPaymentMethod] = useState<string>('')
  const [page, setPage] = useState(1)
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [limit, setLimit] = useState(30)
  
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null)
  const [viewDialogOpen, setViewDialogOpen] = useState(false)
  const [editDialogOpen, setEditDialogOpen] = useState(false)
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
  const [printDialogOpen, setPrintDialogOpen] = useState(false)
  
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

  const handleViewOrder = (order: Order) => {
    setSelectedOrder(order)
    setViewDialogOpen(true)
  }

  const handleEditOrder = (order: Order) => {
    setSelectedOrder(order)
    setEditForm({
      name: order.name,
      number: order.number,
      address: order.address,
      paymentStatus: order.paymentStatus,
      orderStatus: order.orderStatus,
      isDelivered: order.isDelivered,
      isPaid: order.isPaid
    })
    setEditDialogOpen(true)
  }

  const handleUpdateOrder = async () => {
    if (!selectedOrder) return

    try {
      const response = await fetch(`/api/v1/order/${selectedOrder._id}`, {
        method: 'PUT',
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
        <Button onClick={fetchOrders} variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Refresh
        </Button>
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
          <CardTitle>All Orders</CardTitle>
          <CardDescription>
            {orders.length} orders found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
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
                
                return (
                  <TableRow key={order._id}>
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
                          <DropdownMenuItem onClick={() => handleViewOrder(order)}>
                            <Eye className="h-4 w-4 mr-2" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditOrder(order)}>
                            <Edit className="h-4 w-4 mr-2" />
                            Edit Order
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handlePrintOrder(order)}>
                            <Printer className="h-4 w-4 mr-2" />
                            Print Receipt
                          </DropdownMenuItem>
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
            <div className="space-y-6" id="receipt-content">
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
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPrintDialogOpen(false)}>
              Close
            </Button>
            <Button onClick={() => window.print()} className="gap-2">
              <Printer className="h-4 w-4" />
              Print Receipt
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}