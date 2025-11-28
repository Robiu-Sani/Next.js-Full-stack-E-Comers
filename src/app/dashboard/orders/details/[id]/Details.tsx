'use client'

import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent,  CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Package, 
  User, 
  MapPin, 
  CreditCard, 
  Calendar,
  Edit,
  Printer,
  Truck,
  CheckCircle,
  XCircle
} from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
import Image from "next/image"

interface Product {
  _id: string
  name: string
  images: string[]
  generalPrice: {
    currentPrice: number
    prevPrice: number
    discountPercentage: number
  }
  priceVariants: Array<{
    _id: string
    regularPrice: number
    salePrice: number
    quentity: number
    sku: string
  }>
  quickOverview: string[]
  specifications: Array<{
    _id: string
    key: string
    value: string
  }>
  details: string
  brand: string
  quentity: number
}

interface OrderData {
  _id: string
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
  note: string
  isDelivered: boolean
  isPaid: boolean
  orderId: string
  createdAt: string
  updatedAt: string
}

interface ApiResponse {
  success: boolean
  data: OrderData
}

export default function OrderDetails() {
  const { id } = useParams()
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        setLoading(true)
        const response = await fetch(`/api/v1/order/${id}`)
        
        if (!response.ok) {
          throw new Error('Failed to fetch order')
        }
        
        const result: ApiResponse = await response.json()
        
        if (result.success) {
          setOrder(result.data)
        } else {
          throw new Error('Failed to load order data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOrder()
    }
  }, [id])

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price)
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, label: "Pending" },
      processing: { variant: "default" as const, label: "Processing" },
      shipped: { variant: "default" as const, label: "Shipped" },
      delivered: { variant: "success" as const, label: "Delivered" },
      cancelled: { variant: "destructive" as const, label: "Cancelled" }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge >{config.label}</Badge>
  }

  const getPaymentStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { variant: "secondary" as const, label: "Pending" },
      paid: { variant: "success" as const, label: "Paid" },
      failed: { variant: "destructive" as const, label: "Failed" }
    }
    
    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending
    return <Badge >{config.label}</Badge>
  }

  const handlePrint = () => {
    const printContent = document.getElementById('print-voucher')
    const originalContents = document.body.innerHTML
    
    if (printContent) {
      document.body.innerHTML = printContent.innerHTML
      window.print()
      document.body.innerHTML = originalContents
      window.location.reload()
    }
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              <XCircle className="mx-auto h-12 w-12 mb-4" />
              <h3 className="text-lg font-semibold">Error Loading Order</h3>
              <p>{error}</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center">
              <Package className="mx-auto h-12 w-12 mb-4 text-gray-400" />
              <h3 className="text-lg font-semibold">Order Not Found</h3>
              <p>The requested order could not be found.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="w-full mx-auto  space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Order Details</h1>
          <p className="text-muted-foreground">Order ID: {order.orderId}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handlePrint} variant="outline">
            <Printer className="w-4 h-4 mr-2" />
            Print Voucher
          </Button>
          <Link href={`/dashboard/orders/edit/${order._id}`}>
            <Button>
              <Edit className="w-4 h-4 mr-2" />
              Edit Order
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Order Summary */}
        <div className="lg:col-span-2 space-y-6">
          {/* Customer Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <User className="w-5 h-5" />
                Customer Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <p className="font-semibold">Name</p>
                <p className="text-muted-foreground">{order.name}</p>
              </div>
              <div>
                <p className="font-semibold">Phone Number</p>
                <p className="text-muted-foreground">{order.number}</p>
              </div>
              <div>
                <p className="font-semibold flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  Delivery Address
                </p>
                <p className="text-muted-foreground">{order.address}</p>
              </div>
              {order.note && (
                <div>
                  <p className="font-semibold">Order Note</p>
                  <p className="text-muted-foreground">{order.note}</p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items ({order.products.length})
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {order.products.map((product, index) => (
                  <div key={`${product._id}-${index}`} className="flex gap-4 pb-4 border-b last:border-0 last:pb-0">
                    <Image width={100} height={100}
                      src={product.images[0]}
                      alt={product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{product.name}</h4>
                      <p className="text-sm text-muted-foreground">{product.brand}</p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="font-semibold">{formatPrice(product.generalPrice.currentPrice)}</span>
                        {product.generalPrice.prevPrice > product.generalPrice.currentPrice && (
                          <span className="text-sm text-muted-foreground line-through">
                            {formatPrice(product.generalPrice.prevPrice)}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Status & Summary */}
        <div className="space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center">
                <span>Order Status:</span>
                {getStatusBadge(order.orderStatus)}
              </div>
              <div className="flex justify-between items-center">
                <span>Payment Status:</span>
                {getPaymentStatusBadge(order.paymentStatus)}
              </div>
              <div className="flex justify-between items-center">
                <span>Delivery:</span>
                {order.isDelivered ? (
                  <Badge  className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Delivered
                  </Badge>
                ) : (
                  <Badge variant="secondary" className="flex items-center gap-1">
                    <Truck className="w-3 h-3" />
                    In Transit
                  </Badge>
                )}
              </div>
              <div className="flex justify-between items-center">
                <span>Payment:</span>
                {order.isPaid ? (
                  <Badge  className="flex items-center gap-1">
                    <CheckCircle className="w-3 h-3" />
                    Paid
                  </Badge>
                ) : (
                  <Badge variant="secondary">Pending</Badge>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Order Summary */}
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>{formatPrice(order.totalAmount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Discount:</span>
                <span className="text-green-600">-{formatPrice(order.discount)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery Charge:</span>
                <span>{formatPrice(order.deliveryCharge)}</span>
              </div>
              <Separator />
              <div className="flex justify-between text-lg font-bold">
                <span>Total:</span>
                <span>{formatPrice(order.grandTotal)}</span>
              </div>
            </CardContent>
          </Card>

          {/* Payment Information */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CreditCard className="w-5 h-5" />
                Payment Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between">
                <span>Method:</span>
                <Badge variant="outline" className="capitalize">
                  {order.paymentMethod.replace('-', ' ')}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span>Order Date:</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {formatDate(order.createdAt)}
                </span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Print Voucher (Hidden) */}
      <div id="print-voucher" className="hidden">
        <div className="p-8 max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center border-b-2 border-gray-300 pb-4 mb-6">
            <div className="flex items-center justify-center gap-3 mb-2">
              <Image width={80} height={80} 
                src="/logo.png" 
                alt="Logo" 
                className="h-12 w-12 object-contain"
              />
              <h1 className="text-2xl font-bold">{process.env.NEXT_PUBLIC_NAME}</h1>
            </div>
            <p className="text-gray-600">Order Voucher</p>
          </div>

          {/* Order Info */}
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div>
              <p><strong>Order ID:</strong> {order.orderId}</p>
              <p><strong>Date:</strong> {formatDate(order.createdAt)}</p>
            </div>
            <div className="text-right">
              <p><strong>Status:</strong> {order.orderStatus}</p>
              <p><strong>Payment:</strong> {order.paymentStatus}</p>
            </div>
          </div>

          {/* Customer Info */}
          <div className="mb-6">
            <h3 className="font-bold border-b border-gray-300 pb-1 mb-2">Customer Information</h3>
            <p><strong>Name:</strong> {order.name}</p>
            <p><strong>Phone:</strong> {order.number}</p>
            <p><strong>Address:</strong> {order.address}</p>
          </div>

          {/* Order Items */}
          <div className="mb-6">
            <h3 className="font-bold border-b border-gray-300 pb-1 mb-2">Order Items</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-300">
                  <th className="text-left py-2">Product</th>
                  <th className="text-right py-2">Price</th>
                </tr>
              </thead>
              <tbody>
                {order.products.map((product, index) => (
                  <tr key={`${product._id}-${index}`} className="border-b border-gray-200">
                    <td className="py-2">
                      <div>
                        <p className="font-semibold">{product.name}</p>
                        <p className="text-sm text-gray-600">{product.brand}</p>
                      </div>
                    </td>
                    <td className="text-right py-2">
                      {formatPrice(product.generalPrice.currentPrice)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Order Summary */}
          <div className="border-t-2 border-gray-300 pt-4">
            <div className="flex justify-between mb-1">
              <span>Subtotal:</span>
              <span>{formatPrice(order.totalAmount)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Discount:</span>
              <span>-{formatPrice(order.discount)}</span>
            </div>
            <div className="flex justify-between mb-1">
              <span>Delivery Charge:</span>
              <span>{formatPrice(order.deliveryCharge)}</span>
            </div>
            <div className="flex justify-between text-lg font-bold border-t border-gray-300 mt-2 pt-2">
              <span>Grand Total:</span>
              <span>{formatPrice(order.grandTotal)}</span>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center mt-8 pt-4 border-t border-gray-300">
            <p className="text-sm text-gray-600">
              Thank you for your purchase!
            </p>
            <p className="text-xs text-gray-500 mt-2">
              {process.env.NEXT_PUBLIC_NAME} - Quality Products & Services
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}