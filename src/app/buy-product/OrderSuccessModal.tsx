import { Button } from "@/components/ui/button"
import { CheckCircle, ShieldCheck, PhoneCall, Clock } from 'lucide-react'
import Link from 'next/link'
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime'

interface OrderSuccessModalProps {
  orderId: string
  router: AppRouterInstance
}

export default function OrderSuccessModal({ orderId, router }: OrderSuccessModalProps) {
  return (
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
}