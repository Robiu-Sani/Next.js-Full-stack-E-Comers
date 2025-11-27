import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { 
  MapPin, 
  CreditCard, 
  CheckCircle, 
  Loader2, 
  User,
  Phone,
  Navigation,
  Home,
  Truck
} from 'lucide-react'

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

interface ShippingFormProps {
  formData: OrderFormData
  onInputChange: (field: keyof OrderFormData, value: string) => void
  deliveryCharge: number
  grandTotal: number
  loading: boolean
  onSubmitOrder: () => void
  isFormValid: boolean
}

export default function ShippingForm({
  formData,
  onInputChange,
  deliveryCharge,
  grandTotal,
  loading,
  onSubmitOrder,
  isFormValid
}: ShippingFormProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 pt-0">
        <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardTitle className="flex items-center gap-2 text-xl">
            <MapPin className="h-6 pt-4 pb-2 w-6 text-green-600" />
            Shipping Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6 pt-6">
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
                  onChange={(e) => onInputChange('name', e.target.value)}
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
                  onChange={(e) => onInputChange('number', e.target.value)}
                  placeholder="01XXXXXXXXX"
                  pattern="01[3-9]\d{8}"
                  className="w-full border-2 focus:border-green-500 transition-colors"
                  required
                />
              </div>
            </div>
          </div>

          <Separator />

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
                  onChange={(e) => onInputChange('division', e.target.value)}
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
                  onChange={(e) => onInputChange('district', e.target.value)}
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
                  onChange={(e) => onInputChange('upazilla', e.target.value)}
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
                  onChange={(e) => onInputChange('union', e.target.value)}
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
                onChange={(e) => onInputChange('houseAddress', e.target.value)}
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
              onChange={(e) => onInputChange('note', e.target.value)}
              placeholder="Any special instructions for your order, delivery preferences, or additional information..."
              rows={2}
              className="resize-none border-2 focus:border-gray-400 transition-colors"
            />
          </div>
        </CardContent>
      </Card>

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

      <Button 
        onClick={onSubmitOrder}
        disabled={loading || !isFormValid}
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
  )
}