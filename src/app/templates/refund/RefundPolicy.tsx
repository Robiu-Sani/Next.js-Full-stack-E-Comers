import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Shield,
  Clock,
  RotateCcw,
  Phone,
  Mail,
  FileText,
  CheckCircle,
  XCircle,
  AlertCircle,
} from "lucide-react";

export default function RefundPolicyPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Refund & Return Policy
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We strive to ensure complete customer satisfaction. If you`re not
          happy with your purchase, we`re here to help with our straightforward
          refund and return process.
        </p>
      </div>

      <Alert className="mb-8 bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
        <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        <AlertTitle className="text-blue-800 dark:text-blue-300">
          Important Notice
        </AlertTitle>
        <AlertDescription className="text-blue-700 dark:text-blue-300/90">
          Please read our refund policy carefully before requesting a return.
          Terms may vary based on product category and condition.
        </AlertDescription>
      </Alert>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="dark:text-white">Return Window</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300 mb-2">
              Most products are eligible for return within
            </p>
            <Badge className="text-lg px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200">
              7 Days
            </Badge>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              From the date of delivery
            </p>
          </CardContent>
        </Card>

        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <RotateCcw className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="dark:text-white">Easy Returns</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Simple return process with pickup from your location in major
              cities
            </p>
          </CardContent>
        </Card>

        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="dark:text-white">
              Money Back Guarantee
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Full refund initiated within 3-5 business days after return
              completion
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">
              Eligibility for Returns
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              When you can return a product
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold dark:text-white">
                  Defective or Damaged Products
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Items received damaged, defective, or not as described
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold dark:text-white">
                  Wrong Item Received
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  If you received a different product than what you ordered
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold dark:text-white">
                  Missing Parts or Accessories
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  If the product is missing components or accessories
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <CheckCircle className="h-6 w-6 text-green-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold dark:text-white">Size Exchange</h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  For clothing and footwear (subject to availability)
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">
              Non-Returnable Items
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Products that cannot be returned
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-start">
              <XCircle className="h-6 w-6 text-red-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold dark:text-white">
                  Personal Care Products
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Skincare, makeup, and personal hygiene items for health
                  reasons
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <XCircle className="h-6 w-6 text-red-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold dark:text-white">
                  Underwear & Lingerie
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  For personal hygiene reasons
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <XCircle className="h-6 w-6 text-red-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold dark:text-white">
                  Perishable Goods
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Food items, flowers, and other perishable products
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <XCircle className="h-6 w-6 text-red-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold dark:text-white">
                  Software & Digital Products
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Once activated or downloaded
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <XCircle className="h-6 w-6 text-red-500 mr-3 mt-1" />
              <div>
                <h3 className="font-semibold dark:text-white">
                  Products without original packaging
                </h3>
                <p className="text-gray-600 dark:text-gray-300 text-sm">
                  Items missing original packaging, tags, or accessories
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-12 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Return Process</CardTitle>
          <CardDescription className="dark:text-gray-400">
            Step-by-step guide to returning a product
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-800 dark:text-blue-300 font-bold">
                  1
                </span>
              </div>
              <h3 className="font-semibold mb-2 dark:text-white">
                Request Return
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Login to your account and request return from order history
                within 7 days
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-800 dark:text-blue-300 font-bold">
                  2
                </span>
              </div>
              <h3 className="font-semibold mb-2 dark:text-white">
                Wait for Approval
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Our team will verify your request within 24 hours
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-800 dark:text-blue-300 font-bold">
                  3
                </span>
              </div>
              <h3 className="font-semibold mb-2 dark:text-white">
                Package Pickup
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                We`ll collect the product from your address (Dhaka, Chittagong,
                Sylhet)
              </p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-800 dark:text-blue-300 font-bold">
                  4
                </span>
              </div>
              <h3 className="font-semibold mb-2 dark:text-white">
                Refund Processed
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Refund initiated after quality check (3-5 business days)
              </p>
            </div>
          </div>

          <div className="mt-8 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
            <h4 className="font-semibold mb-2 dark:text-white">
              For customers outside major cities:
            </h4>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              You can ship the product to our return center at your cost. Please
              ensure proper packaging to avoid damage during transit. Once
              received and verified, we will process your refund including your
              return shipping costs (up to ৳ 100).
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="mb-12 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">Refund Methods</CardTitle>
          <CardDescription className="dark:text-gray-400">
            How you`ll receive your refund
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-4 border rounded-lg dark:border-gray-700 dark:bg-gray-700/30">
              <h3 className="font-semibold mb-2 flex items-center dark:text-white">
                <Badge className="mr-2 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300">
                  Original Payment Method
                </Badge>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Refunds will be credited to the original payment method used for
                purchase. For credit/debit cards, it may take 5-10 business days
                to reflect in your statement.
              </p>
            </div>

            <div className="p-4 border rounded-lg dark:border-gray-700 dark:bg-gray-700/30">
              <h3 className="font-semibold mb-2 flex items-center dark:text-white">
                <Badge className="mr-2 bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  Mobile Banking
                </Badge>
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                For cash on delivery orders, refunds will be sent via bKash,
                Nagad, or Rocket. Please ensure your mobile banking account is
                active and verified.
              </p>
            </div>
          </div>

          <Alert className="mt-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-800">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-400" />
            <AlertTitle className="text-amber-800 dark:text-amber-300">
              Please Note
            </AlertTitle>
            <AlertDescription className="text-amber-700 dark:text-amber-300/90">
              Refund processing time may vary depending on your bank or mobile
              financial service provider. Delivery charges are non-refundable
              except for defective or wrong items.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      <Card className="mb-12 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Common questions about returns and refunds
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1" className="dark:border-gray-700">
              <AccordionTrigger className="dark:text-gray-200 hover:no-underline">
                How long does it take to process a refund?
              </AccordionTrigger>
              <AccordionContent className="dark:text-gray-300">
                Once we receive and inspect the returned product, we process
                refunds within 3-5 business days. The time it appears in your
                account depends on your payment method and financial
                institution.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-2" className="dark:border-gray-700">
              <AccordionTrigger className="dark:text-gray-200 hover:no-underline">
                What should I do if I receive a damaged product?
              </AccordionTrigger>
              <AccordionContent className="dark:text-gray-300">
                Contact us immediately within 24 hours of delivery. Provide
                photos of the damaged product and packaging. We will arrange a
                pickup and replacement or refund at no additional cost to you.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-3" className="dark:border-gray-700">
              <AccordionTrigger className="dark:text-gray-200 hover:no-underline">
                Do I need to include the original packaging?
              </AccordionTrigger>
              <AccordionContent className="dark:text-gray-300">
                Yes, please include the original packaging, tags, labels, and
                all accessories. Products without original packaging may not be
                accepted for return or may be subject to a restocking fee.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-4" className="dark:border-gray-700">
              <AccordionTrigger className="dark:text-gray-200 hover:no-underline">
                Can I exchange a product for a different size or color?
              </AccordionTrigger>
              <AccordionContent className="dark:text-gray-300">
                Yes, size exchanges are available for clothing and footwear
                within 7 days of delivery, subject to availability. If the
                replacement is not available, we will process a refund instead.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="item-5" className="dark:border-gray-700">
              <AccordionTrigger className="dark:text-gray-200 hover:no-underline">
                What if I miss the delivery agent for pickup?
              </AccordionTrigger>
              <AccordionContent className="dark:text-gray-300">
                Our delivery agent will attempt pickup three times. If
                unsuccessful, you may need to bring the product to our nearest
                service center or arrange another pickup, which may involve
                additional charges.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border-none">
        <CardHeader>
          <CardTitle className="dark:text-white">
            Need Help With a Return?
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Our customer service team is here to assist you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div className="flex items-start">
              <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold dark:text-white">Call Us</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  +880 9612 345678
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Saturday-Thursday, 9AM-6PM
                </p>
              </div>
            </div>
            <div className="flex items-start">
              <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
              <div>
                <h3 className="font-semibold dark:text-white">Email Us</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  returns@example.com
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Include your order number for faster service
                </p>
              </div>
            </div>
          </div>
          <div className="flex items-start">
            <FileText className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
            <div>
              <h3 className="font-semibold dark:text-white">Return Address</h3>
              <p className="text-gray-600 dark:text-gray-300">
                House #123, Road #456, Gulshan-1, Dhaka 1212
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                For returns outside pickup areas
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
