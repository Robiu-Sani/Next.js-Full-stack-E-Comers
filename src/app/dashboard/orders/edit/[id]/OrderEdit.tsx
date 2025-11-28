/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useParams, useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { toast } from "sonner"
import { 
  Package, 
  User, 
  Save,
  ArrowLeft,
  Trash2,
  Undo,
} from "lucide-react"
import Link from "next/link"
import { Skeleton } from "@/components/ui/skeleton"
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
  priceVariants: Array<{
    _id: string
    regularPrice: number
    salePrice: number
    quentity: number
    sku: string
  }>
  brand: string
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
  trackingId?: string
  note: string
  isDelivered: boolean
  isPaid: boolean
  orderId: string
  createdAt: string
  updatedAt: string
}

interface EditForm {
  name: string
  number: string
  address: string
  products: string[]
  deliveryCharge: number
  discount: number
  paymentMethod: string
  paymentStatus: string
  orderStatus: string
  trackingId?: string
  note: string
  isDelivered: boolean
  isPaid: boolean
}

interface ApiResponse {
  success: boolean
  data: OrderData
}

interface RemovedProduct {
  product: Product
  index: number
  timestamp: number
}

export default function OrderEdit() {
  const { id } = useParams()
  const router = useRouter()
  const [order, setOrder] = useState<OrderData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [removedProducts, setRemovedProducts] = useState<RemovedProduct[]>([])

  const [editForm, setEditForm] = useState<EditForm>({
    name: '',
    number: '',
    address: '',
    products: [],
    deliveryCharge: 0,
    discount: 0,
    paymentMethod: 'cash-on-delivery',
    paymentStatus: 'pending',
    orderStatus: 'pending',
    trackingId: '',
    note: '',
    isDelivered: false,
    isPaid: false
  })

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
          setEditForm({
            name: result.data.name,
            number: result.data.number,
            address: result.data.address,
            products: result.data.products.map(p => p._id),
            deliveryCharge: result.data.deliveryCharge,
            discount: result.data.discount,
            paymentMethod: result.data.paymentMethod,
            paymentStatus: result.data.paymentStatus,
            orderStatus: result.data.orderStatus,
            trackingId: result.data.trackingId || '',
            note: result.data.note,
            isDelivered: result.data.isDelivered,
            isPaid: result.data.isPaid
          })
        } else {
          throw new Error('Failed to load order data')
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred')
        toast.error('Failed to load order')
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchOrder()
    }
  }, [id])

  const handleInputChange = (field: keyof EditForm, value: any) => {
    setEditForm(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handleNumberInputChange = (field: keyof EditForm, value: string) => {
    const numValue = parseFloat(value) || 0
    setEditForm(prev => ({
      ...prev,
      [field]: numValue
    }))
  }

  const removeProduct = (productId: string, index: number) => {
    if (!order) return

    const productToRemove = order.products[index]
    setRemovedProducts(prev => [...prev, {
      product: productToRemove,
      index,
      timestamp: Date.now()
    }])

    // Update products array
    const updatedProducts = [...editForm.products]
    updatedProducts.splice(index, 1)
    setEditForm(prev => ({
      ...prev,
      products: updatedProducts
    }))

    toast.success('Product removed', {
      action: {
        label: 'Undo',
        onClick: () => undoRemove(productId)
      }
    })
  }

  const undoRemove = (productId: string) => {
    const removedProduct = removedProducts.find(rp => rp.product._id === productId)
    if (!removedProduct || !order) return

    // Restore product to its original position
    const updatedProducts = [...editForm.products]
    updatedProducts.splice(removedProduct.index, 0, productId)
    setEditForm(prev => ({
      ...prev,
      products: updatedProducts
    }))

    // Remove from removed products
    setRemovedProducts(prev => prev.filter(rp => rp.product._id !== productId))
    toast.success('Product restored')
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addProduct = (productId: string) => {
    setEditForm(prev => ({
      ...prev,
      products: [...prev.products, productId]
    }))
  }

  const calculateTotals = () => {
    if (!order) return { totalAmount: 0, grandTotal: 0 }

    const currentProducts = order.products.filter(product => 
      editForm.products.includes(product._id)
    )

    const totalAmount = currentProducts.reduce((sum, product) => 
      sum + product.generalPrice.currentPrice, 0
    )

    const grandTotal = totalAmount + editForm.deliveryCharge - editForm.discount

    return { totalAmount, grandTotal }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      setSaving(true)

      const response = await fetch(`/api/v1/order/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editForm),
      })

      if (!response.ok) {
        throw new Error('Failed to update order')
      }

      const result = await response.json()

      if (result.success) {
        toast.success('Order updated successfully')
        router.push('/dashboard/orders')
      } else {
        throw new Error(result.message || 'Failed to update order')
      }
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update order')
    } finally {
      setSaving(false)
    }
  }

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-BD', {
      style: 'currency',
      currency: 'BDT',
      minimumFractionDigits: 0
    }).format(price)
  }

  const { totalAmount, grandTotal } = calculateTotals()

  if (loading) {
    return (
      <div className="container mx-auto p-6 space-y-6">
        <Skeleton className="h-8 w-64" />
        <Skeleton className="h-64 w-full" />
        <Skeleton className="h-32 w-full" />
      </div>
    )
  }

  if (error || !order) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardContent className="pt-6">
            <div className="text-center text-red-500">
              <h3 className="text-lg font-semibold">Error Loading Order</h3>
              <p>{error || 'Order not found'}</p>
              <Link href="/dashboard/orders">
                <Button className="mt-4">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Orders
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  const currentProducts = order.products.filter(product => 
    editForm.products.includes(product._id)
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Edit Order</h1>
          <p className="text-muted-foreground">Order ID: {order.orderId}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/orders">
            <Button variant="outline">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Orders
            </Button>
          </Link>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Customer & Products */}
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
              <div className="space-y-2">
                <Label htmlFor="name">Customer Name</Label>
                <Input
                  id="name"
                  value={editForm.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="number">Phone Number</Label>
                <Input
                  id="number"
                  value={editForm.number}
                  onChange={(e) => handleInputChange('number', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Delivery Address</Label>
                <Textarea
                  id="address"
                  value={editForm.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="note">Order Note</Label>
                <Textarea
                  id="note"
                  value={editForm.note}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                  placeholder="Additional notes for this order..."
                />
              </div>
            </CardContent>
          </Card>

          {/* Order Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5" />
                Order Items ({currentProducts.length})
              </CardTitle>
              <CardDescription>
                Manage products in this order. Removed products can be restored using undo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {currentProducts.map((product, index) => (
                  <Card key={product._id} className="relative">
                    <CardContent className="p-4">
                      <div className="flex gap-4">
                        <Image width={100} height={100}
                          src={product.images[0]}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1">
                          <div className="flex justify-between items-start">
                            <div>
                              <h4 className="font-semibold">{product.name}</h4>
                              <p className="text-sm text-muted-foreground">{product.brand}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className="font-semibold text-green-600">
                                  {formatPrice(product.generalPrice.currentPrice)}
                                </span>
                                {product.generalPrice.prevPrice > product.generalPrice.currentPrice && (
                                  <span className="text-sm text-muted-foreground line-through">
                                    {formatPrice(product.generalPrice.prevPrice)}
                                  </span>
                                )}
                              </div>
                            </div>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => removeProduct(product._id, index)}
                              className="text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}

                {currentProducts.length === 0 && (
                  <div className="text-center py-8 text-muted-foreground">
                    <Package className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>No products in this order</p>
                  </div>
                )}
              </div>

              {/* Removed Products Section */}
              {removedProducts.length > 0 && (
                <div className="mt-6">
                  <h4 className="font-semibold text-sm text-muted-foreground mb-3">
                    Removed Products ({removedProducts.length})
                  </h4>
                  <div className="space-y-2">
                    {removedProducts.map((removed) => (
                      <div
                        key={removed.product._id}
                        className="flex items-center justify-between p-3 border border-dashed border-gray-300 rounded-lg bg-gray-50"
                      >
                        <div className="flex items-center gap-3">
                          <Image width={100} height={100}
                            src={removed.product.images[0]}
                            alt={removed.product.name}
                            className="w-10 h-10 object-cover rounded"
                          />
                          <div>
                            <p className="font-medium text-sm line-through">
                              {removed.product.name}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {formatPrice(removed.product.generalPrice.currentPrice)}
                            </p>
                          </div>
                        </div>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => undoRemove(removed.product._id)}
                          className="text-green-600 hover:text-green-700 hover:bg-green-50"
                        >
                          <Undo className="w-4 h-4 mr-1" />
                          Restore
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column - Order Details & Actions */}
        <div className="space-y-6">
          {/* Order Status */}
          <Card>
            <CardHeader>
              <CardTitle>Order Status</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="orderStatus">Order Status</Label>
                <Select
                  value={editForm.orderStatus}
                  onValueChange={(value) => handleInputChange('orderStatus', value)}
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
                  onValueChange={(value) => handleInputChange('paymentStatus', value)}
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

              <div className="space-y-2">
                <Label htmlFor="paymentMethod">Payment Method</Label>
                <Select
                  value={editForm.paymentMethod}
                  onValueChange={(value) => handleInputChange('paymentMethod', value)}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cash-on-delivery">Cash on Delivery</SelectItem>
                    <SelectItem value="bkash">bKash</SelectItem>
                    <SelectItem value="nagad">Nagad</SelectItem>
                    <SelectItem value="rocket">Rocket</SelectItem>
                    <SelectItem value="card">Card</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="trackingId">Tracking ID</Label>
                <Input
                  id="trackingId"
                  value={editForm.trackingId}
                  onChange={(e) => handleInputChange('trackingId', e.target.value)}
                  placeholder="Enter tracking number"
                />
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isDelivered"
                  checked={editForm.isDelivered}
                  onChange={(e) => handleInputChange('isDelivered', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isDelivered">Order Delivered</Label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="isPaid"
                  checked={editForm.isPaid}
                  onChange={(e) => handleInputChange('isPaid', e.target.checked)}
                  className="rounded border-gray-300"
                />
                <Label htmlFor="isPaid">Payment Received</Label>
              </div>
            </CardContent>
          </Card>

          {/* Pricing */}
          <Card>
            <CardHeader>
              <CardTitle>Pricing Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="deliveryCharge">Delivery Charge</Label>
                <Input
                  id="deliveryCharge"
                  type="number"
                  value={editForm.deliveryCharge}
                  onChange={(e) => handleNumberInputChange('deliveryCharge', e.target.value)}
                  min="0"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="discount">Discount</Label>
                <Input
                  id="discount"
                  type="number"
                  value={editForm.discount}
                  onChange={(e) => handleNumberInputChange('discount', e.target.value)}
                  min="0"
                />
              </div>

              <Separator />

              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span>{formatPrice(totalAmount)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Delivery Charge:</span>
                  <span>{formatPrice(editForm.deliveryCharge)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Discount:</span>
                  <span className="text-green-600">-{formatPrice(editForm.discount)}</span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total:</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Actions */}
          <Card>
            <CardContent className="pt-6">
              <Button 
                type="submit" 
                className="w-full" 
                disabled={saving}
                size="lg"
              >
                <Save className="w-4 h-4 mr-2" />
                {saving ? 'Saving...' : 'Update Order'}
              </Button>
            </CardContent>
          </Card>
        </div>
      </form>
    </div>
  )
}