/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'

import { useState, useEffect } from 'react'
import useContextData from "@/defaults/custom-component/useContextData"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  Truck, 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  Loader2, 
  ShoppingCart, 
  Home, 
  Plus, 
  Minus, 
  Trash2,
  User,
  Phone,
  Navigation,
  Clock,
  ShieldCheck,
  PhoneCall
} from 'lucide-react'
import { toast } from "sonner"
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

interface OrderFormData {
  name: string
  number: string
  division: string
  district: string
  upazilla: string
  union: string
  houseAddress: string
  note: string
  paymentMethod: 'cash-on-delivery'
}

interface PurchaseItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface CartProduct {
  product: {
    id: string
  }
  expiresAt: number
  quantity: number
}

interface WishlistProduct {
  product: {
    id: string
  }
  expiresAt: number
}

export default function PurchaseProducts() {
  const { purchasesData, handlePurchasedData, handleAddCart,  handleAddWishlist } = useContextData()
  const [loading, setLoading] = useState(false)
  const [orderSuccess, setOrderSuccess] = useState(false)
  const [orderId, setOrderId] = useState<string>('')
  const router = useRouter()
  const [formData, setFormData] = useState<OrderFormData>({
    name: '',
    number: '',
    division: '',
    district: '',
    upazilla: '',
    union: '',
    houseAddress: '',
    note: '',
    paymentMethod: 'cash-on-delivery'
  })

  // Initialize quantities for items
  const [itemsWithQuantity, setItemsWithQuantity] = useState<PurchaseItem[]>([])

  // Initialize quantities when purchasesData changes
  useEffect(() => {
    if (purchasesData.length > 0) {
      const initializedItems = purchasesData.map((item: any) => ({
        ...item,
        quantity: item.quantity || 1
      }))
      setItemsWithQuantity(initializedItems)
    } else {
      setItemsWithQuantity([])
    }
  }, [purchasesData])

  // Calculate totals based on quantities
  const subtotal = itemsWithQuantity.reduce((sum: number, item: PurchaseItem) => 
    sum + (item.price * item.quantity), 0)
  
  const deliveryCharge = formData.district ? 
    (formData.district.toLowerCase().includes('dhaka') ? 80 : 120) : 0
  const discount = 0
  const grandTotal = subtotal + deliveryCharge - discount

  const handleInputChange = (field: keyof OrderFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return
    
    setItemsWithQuantity(prev => 
      prev.map(item => 
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  const handleRemoveItem = (id: string) => {
    setItemsWithQuantity(prev => prev.filter(item => item.id !== id))
    handlePurchasedData((prev: any) => prev.filter((item: any) => item.id !== id))
  }

  // Function to remove products from cart and wishlist after successful order
  const removeProductsFromStorage = (productIds: string[]) => {
    // Remove from cart
    const cartExisting = localStorage.getItem("cartProducts")
    if (cartExisting) {
      const cartProducts: CartProduct[] = JSON.parse(cartExisting)
      const now = Date.now()
      const validProducts = cartProducts.filter((item) => item.expiresAt > now)
      
      const updatedCartProducts = validProducts.filter(
        (item) => !productIds.includes(item.product.id)
      )
      
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts))
      handleAddCart(updatedCartProducts)
    }

    // Remove from wishlist
    const wishlistExisting = localStorage.getItem("WishlistProducts")
    if (wishlistExisting) {
      const wishlistProducts: WishlistProduct[] = JSON.parse(wishlistExisting)
      const now = Date.now()
      const validProducts = wishlistProducts.filter((item) => item.expiresAt > now)
      
      const updatedWishlistProducts = validProducts.filter(
        (item) => !productIds.includes(item.product.id)
      )
      
      localStorage.setItem("WishlistProducts", JSON.stringify(updatedWishlistProducts))
      handleAddWishlist(updatedWishlistProducts)
    }
  }

  const handleSubmitOrder = async () => {
    // Validate required fields
    const requiredFields = [
      { field: 'name', label: 'Full Name' },
      { field: 'number', label: 'Phone Number' },
      { field: 'houseAddress', label: 'House Address' },
      { field: 'division', label: 'Division' },
      { field: 'district', label: 'District' },
      { field: 'upazilla', label: 'Upazilla' },
      { field: 'union', label: 'Union' }
    ]

    const missingField = requiredFields.find(field => !formData[field.field as keyof OrderFormData])
    if (missingField) {
      toast.error(`Please fill in the ${missingField.label} field`)
      return
    }

    if (itemsWithQuantity.length === 0) {
      toast.error('No products in cart')
      return
    }

    // Validate phone number format
    const phoneRegex = /^01[3-9]\d{8}$/
    if (!phoneRegex.test(formData.number)) {
      toast.error('Please enter a valid Bangladeshi phone number (01XXXXXXXXX)')
      return
    }

    setLoading(true)

    try {
      // Create products array with quantity considered (if quantity is 2, include product id twice)
      const productsWithQuantity: string[] = []
      itemsWithQuantity.forEach(item => {
        for (let i = 0; i < item.quantity; i++) {
          productsWithQuantity.push(item.id)
        }
      })

      const orderData = {
        name: formData.name,
        number: formData.number,
        address: `${formData.houseAddress}, ${formData.union}, ${formData.upazilla}, ${formData.district}, ${formData.division}`,
        products: productsWithQuantity,
        totalAmount: subtotal,
        deliveryCharge,
        discount,
        grandTotal,
        paymentMethod: formData.paymentMethod,
        note: formData.note
      }

      const response = await fetch('/api/v1/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) throw new Error('Failed to create order')

      const result = await response.json()
handlePurchasedData([])
      // Remove ordered products from cart and wishlist
      const orderedProductIds = itemsWithQuantity.map(item => item.id)
      removeProductsFromStorage(orderedProductIds)
      
      // Set success state with order ID
      setOrderSuccess(true)
      setOrderId(result.orderId || `ORD-${Date.now()}`)
      
      toast.success('Order placed successfully!')
      
      // Reset form and cart data
      handlePurchasedData([])
      setItemsWithQuantity([])
      setFormData({
        name: '',
        number: '',
        division: '',
        district: '',
        upazilla: '',
        union: '',
        houseAddress: '',
        note: '',
        paymentMethod: 'cash-on-delivery'
      })
      
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error('Failed to place order. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  // Success Modal Component
  const OrderSuccessModal = () => (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999999999] p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl max-w-md w-full p-6 shadow-2xl">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-4">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
            অর্ডার সফল!
          </h3>
          
          <div className="space-y-3 mb-6">
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <ShieldCheck className="h-4 w-4 text-green-500" />
              <span>আপনার অর্ডারটি সফলভাবে প্লেস হয়েছে</span>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <PhoneCall className="h-4 w-4 text-blue-500" />
              <span className="text-center">
                আমরা ১ ঘন্টার মধ্যে আপনার সাথে ফোনে যোগাযোগ করে অর্ডার কনফার্ম করব
              </span>
            </div>
            
            <div className="flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-300">
              <Clock className="h-4 w-4 text-orange-500" />
              <span>ডেলিভারি সময়: ৩-৫ কার্যদিবস</span>
            </div>
          </div>

          {orderId && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 mb-4">
              <p className="text-sm text-gray-600 dark:text-gray-300">অর্ডার আইডি:</p>
              <p className="font-mono font-bold text-lg text-gray-900 dark:text-white">{orderId}</p>
            </div>
          )}

          <div className="flex gap-3">
            <Button
              onClick={() => router.push('/')}
              className="flex-1"
              variant="outline"
            >
              বন্ধ করুন
            </Button>
            <Button
              asChild
              className="flex-1"
            >
              <Link href="/products">
                আরও শপিং
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  )

  if (orderSuccess) {
    return <OrderSuccessModal />
  }

  if (itemsWithQuantity.length === 0) {
    return (
      <div className="container mx-auto p-6">
        <Card className="text-center py-12">
          <CardContent>
            <ShoppingCart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-xl font-semibold mb-2">Your cart is empty</h3>
            <p className="text-muted-foreground mb-4">Add some products to continue shopping</p>
            <Button asChild>
              <Link href="/products">Continue Shopping</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Order Summary */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0 pt-0">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
              <CardTitle className="flex items-center gap-2 text-xl">
                <ShoppingCart className="h-6 w-6 pt-4 pb-2 text-blue-600" />
                Order Summary ({itemsWithQuantity.reduce((sum, item) => sum + item.quantity, 0)} items)
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 pt-6">
              {itemsWithQuantity.map((item: PurchaseItem, index: number) => (
                <div key={item.id || index} className="flex items-center gap-4 p-4 border border-gray-200 dark:border-gray-700 rounded-xl hover:shadow-md transition-shadow duration-200">
                  <Image 
                    width={64}
                    height={64}
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-sm truncate">{item.name}</h4>
                    <p className="text-green-600 font-bold">{item.price} BDT</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-3 mt-2">
                      <Label htmlFor={`quantity-${item.id}`} className="text-sm text-muted-foreground">
                        Quantity:
                      </Label>
                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                          disabled={item.quantity <= 1}
                          className="h-8 w-8 p-0 border-2"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0 border-2"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                      <span className="text-sm font-bold ml-auto text-blue-600">
                        = {item.price * item.quantity} BDT
                      </span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveItem(item.id)}
                    className="text-red-600 hover:text-red-700 hover:bg-red-50 border-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              
              <Separator className="my-4" />
              
              <div className="space-y-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Subtotal:</span>
                  <span className="font-semibold">{subtotal} BDT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Delivery Charge:</span>
                  <span className="font-semibold">{deliveryCharge} BDT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">Discount:</span>
                  <span className="font-semibold text-red-600">-{discount} BDT</span>
                </div>
                <Separator />
                <div className="flex justify-between items-center text-lg font-bold pt-2">
                  <span className="text-gray-900 dark:text-white">Grand Total:</span>
                  <span className="text-green-600 text-xl">{grandTotal} BDT</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Shipping Information */}
        <div className="space-y-6">
          <Card className="shadow-lg border-0 pt-0">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
              <CardTitle className="flex items-center gap-2 text-xl">
                <MapPin className="h-6 pt-4 pb-2 w-6 text-green-600" />
                Shipping Information
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              {/* Personal Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <User className="h-5 w-5 text-blue-500" />
                  Personal Information
                </h4>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="flex items-center gap-2 font-medium">
                      <User className="h-4 w-4 text-blue-500" />
                      Full Name *
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => handleInputChange('name', e.target.value)}
                      placeholder="Enter your full name"
                      className="w-full border-2 focus:border-blue-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="number" className="flex items-center gap-2 font-medium">
                      <Phone className="h-4 w-4 text-green-500" />
                      Phone Number *
                    </Label>
                    <Input
                      id="number"
                      value={formData.number}
                      onChange={(e) => handleInputChange('number', e.target.value)}
                      placeholder="01XXXXXXXXX"
                      pattern="01[3-9]\d{8}"
                      className="w-full border-2 focus:border-green-500 transition-colors"
                      required
                    />
                  </div>
                </div>
              </div>

              <Separator />

              {/* Address Information */}
              <div className="space-y-4">
                <h4 className="font-semibold text-lg text-gray-700 dark:text-gray-300 flex items-center gap-2">
                  <Navigation className="h-5 w-5 text-purple-500" />
                  Address Details
                </h4>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="division" className="font-medium">Division *</Label>
                    <Input
                      id="division"
                      value={formData.division}
                      onChange={(e) => handleInputChange('division', e.target.value)}
                      placeholder="e.g., Dhaka Division"
                      className="w-full border-2 focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="district" className="font-medium">District *</Label>
                    <Input
                      id="district"
                      value={formData.district}
                      onChange={(e) => handleInputChange('district', e.target.value)}
                      placeholder="e.g., Dhaka District"
                      className="w-full border-2 focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="upazilla" className="font-medium">Upazilla/Thana *</Label>
                    <Input
                      id="upazilla"
                      value={formData.upazilla}
                      onChange={(e) => handleInputChange('upazilla', e.target.value)}
                      placeholder="e.g., Mirpur"
                      className="w-full border-2 focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="union" className="font-medium">Union/Ward *</Label>
                    <Input
                      id="union"
                      value={formData.union}
                      onChange={(e) => handleInputChange('union', e.target.value)}
                      placeholder="e.g., Ward No-1"
                      className="w-full border-2 focus:border-purple-500 transition-colors"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="houseAddress" className="flex items-center gap-2 font-medium">
                    <Home className="h-4 w-4 text-orange-500" />
                    House Address & Road No *
                  </Label>
                  <Textarea
                    id="houseAddress"
                    value={formData.houseAddress}
                    onChange={(e) => handleInputChange('houseAddress', e.target.value)}
                    placeholder="Enter your complete house address with road number, house number, village, area, building name etc."
                    rows={3}
                    className="resize-none border-2 focus:border-orange-500 transition-colors"
                    required
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label htmlFor="note" className="font-medium">Order Note (Optional)</Label>
                <Textarea
                  id="note"
                  value={formData.note}
                  onChange={(e) => handleInputChange('note', e.target.value)}
                  placeholder="Any special instructions for your order, delivery preferences, or additional information..."
                  rows={2}
                  className="resize-none border-2 focus:border-gray-400 transition-colors"
                />
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
              <CardTitle className="flex items-center gap-2 text-xl">
                <CreditCard className="h-6 w-6 text-amber-600" />
                Payment Method
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="flex items-center gap-3 p-4 border-2 border-green-300 rounded-xl bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/30 dark:to-emerald-950/30 dark:border-green-700">
                <Truck className="h-8 w-8 text-green-600" />
                <div className="flex-1">
                  <p className="font-bold text-green-900 dark:text-green-100 text-lg">Cash on Delivery</p>
                  <p className="text-sm text-green-700 dark:text-green-300">Pay when you receive your order</p>
                </div>
                <Badge variant="secondary" className="bg-green-200 text-green-800 hover:bg-green-300 text-sm font-bold px-3 py-1">
                  Selected
                </Badge>
              </div>
            </CardContent>
          </Card>

          {/* Place Order Button */}
          <Button 
            onClick={handleSubmitOrder}
            disabled={loading || !formData.name || !formData.number || !formData.houseAddress || !formData.union || !formData.division || !formData.district || !formData.upazilla}
            className="w-full py-6 text-lg font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 border-0"
            size="lg"
          >
            {loading ? (
              <>
                <Loader2 className="h-6 w-6 animate-spin mr-2" />
                Placing Order...
              </>
            ) : (
              <>
                <CheckCircle className="h-6 w-6 mr-2" />
                Place Order - {grandTotal} BDT
              </>
            )}
          </Button>

          {/* Delivery Info */}
          <Card className={`border-2 shadow-lg ${formData.district ? 'border-blue-300 bg-gradient-to-r from-blue-50 to-cyan-50 dark:from-blue-950/30 dark:to-cyan-950/30 dark:border-blue-700' : 'border-orange-300 bg-gradient-to-r from-orange-50 to-amber-50 dark:from-orange-950/30 dark:to-amber-950/30 dark:border-orange-700'}`}>
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Truck className={`h-6 w-6 ${formData.district ? 'text-blue-600' : 'text-orange-600'} mt-0.5`} />
                <div className="space-y-2">
                  <p className={`font-bold text-lg ${formData.district ? 'text-blue-900 dark:text-blue-100' : 'text-orange-900 dark:text-orange-100'}`}>
                    Delivery Information
                  </p>
                  <p className={`text-sm ${formData.district ? 'text-blue-700 dark:text-blue-300' : 'text-orange-700 dark:text-orange-300'}`}>
                    {formData.district ? 
                      `Delivery to ${formData.district}: ${deliveryCharge} BDT, 3-5 business days` :
                      'Enter your district to see delivery charge and estimated time'
                    }
                  </p>
                  {formData.district && (
                    <div className="space-y-1">
                      <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">
                        🚚 ১০০০ BDT এর উপর অর্ডারে ফ্রি ডেলিভারি!
                      </p>
                      <p className="text-xs text-green-600 dark:text-green-400 font-medium">
                        ⚡ ১ ঘন্টার মধ্যে ফোনে কনফার্মেশন
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}