import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { ShoppingCart, Plus, Minus, Trash2 } from 'lucide-react'
import Image from 'next/image'

interface PurchaseItem {
  id: string
  name: string
  price: number
  image: string
  quantity: number
}

interface OrderSummaryProps {
  itemsWithQuantity: PurchaseItem[]
  subtotal: number
  deliveryCharge: number
  discount: number
  grandTotal: number
  onQuantityChange: (id: string, quantity: number) => void
  onRemoveItem: (id: string) => void
}

export default function OrderSummary({
  itemsWithQuantity,
  subtotal,
  deliveryCharge,
  discount,
  grandTotal,
  onQuantityChange,
  onRemoveItem
}: OrderSummaryProps) {
  return (
    <div className="space-y-6">
      <Card className="shadow-lg border-0 pt-0  overflow-hidden">
        <CardHeader className="bg-gradient-to-r from-blue-50 py-2 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20">
          <CardTitle className="flex items-center gap-2 text-xl">
            <ShoppingCart className="h-6 w-6 pt-4 pb-2 text-blue-600" />
            Order Summary ({itemsWithQuantity.reduce((sum, item) => sum + item.quantity, 0)} items)
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 p-2">
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
                
                <div className="flex items-center gap-3 mt-2">
                  <Label htmlFor={`quantity-${item.id}`} className="text-sm text-muted-foreground">
                    Quantity:
                  </Label>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                      disabled={item.quantity <= 1}
                      className="h-8 w-8 p-0 border-2"
                    >
                      <Minus className="h-3 w-3" />
                    </Button>
                    <span className="w-8 text-center font-bold text-lg">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => onQuantityChange(item.id, item.quantity + 1)}
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
                onClick={() => onRemoveItem(item.id)}
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
  )
}