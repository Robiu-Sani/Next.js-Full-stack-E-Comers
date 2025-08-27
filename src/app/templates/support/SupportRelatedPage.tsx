"use client";
import React, { useState } from "react";
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
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Phone,
  Mail,
  MessageSquare,
  Clock,
  MapPin,
  HeadphonesIcon,
  Truck,
  RotateCcw,
  HelpCircle,
  FileText,
  MessageCircle,
  AlertCircle,
  CheckCircle,
} from "lucide-react";

export default function SupportRelatedPage() {
  const [activeTab, setActiveTab] = useState("contact");

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Customer Support
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We`re here to help you with any questions or concerns. Our support
          team is available to assist you 7 days a week.
        </p>
      </div>

      <div className="flex flex-wrap gap-4 mb-8 justify-center">
        <Button
          variant={activeTab === "contact" ? "default" : "outline"}
          onClick={() => setActiveTab("contact")}
          className="flex items-center gap-2"
        >
          <MessageCircle className="h-4 w-4" />
          Contact Us
        </Button>
        <Button
          variant={activeTab === "faq" ? "default" : "outline"}
          onClick={() => setActiveTab("faq")}
          className="flex items-center gap-2"
        >
          <HelpCircle className="h-4 w-4" />
          FAQs
        </Button>
        <Button
          variant={activeTab === "track" ? "default" : "outline"}
          onClick={() => setActiveTab("track")}
          className="flex items-center gap-2"
        >
          <Truck className="h-4 w-4" />
          Track Order
        </Button>
        <Button
          variant={activeTab === "return" ? "default" : "outline"}
          onClick={() => setActiveTab("return")}
          className="flex items-center gap-2"
        >
          <RotateCcw className="h-4 w-4" />
          Returns
        </Button>
      </div>

      {activeTab === "contact" && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
          <Card className="dark:bg-gray-800 dark:border-gray-700">
            <CardHeader>
              <CardTitle className="dark:text-white">Get in Touch</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Reach out to our support team for assistance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="dark:text-gray-300">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="Enter your full name"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="dark:text-gray-300">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone" className="dark:text-gray-300">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="e.g. 01XXXXXXXXX"
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="subject" className="dark:text-gray-300">
                    Subject
                  </Label>
                  <Select>
                    <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                      <SelectValue placeholder="Select an issue" />
                    </SelectTrigger>
                    <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                      <SelectItem
                        value="order"
                        className="dark:text-gray-300 dark:focus:bg-gray-700"
                      >
                        Order Issue
                      </SelectItem>
                      <SelectItem
                        value="delivery"
                        className="dark:text-gray-300 dark:focus:bg-gray-700"
                      >
                        Delivery Problem
                      </SelectItem>
                      <SelectItem
                        value="return"
                        className="dark:text-gray-300 dark:focus:bg-gray-700"
                      >
                        Return Request
                      </SelectItem>
                      <SelectItem
                        value="product"
                        className="dark:text-gray-300 dark:focus:bg-gray-700"
                      >
                        Product Question
                      </SelectItem>
                      <SelectItem
                        value="payment"
                        className="dark:text-gray-300 dark:focus:bg-gray-700"
                      >
                        Payment Issue
                      </SelectItem>
                      <SelectItem
                        value="other"
                        className="dark:text-gray-300 dark:focus:bg-gray-700"
                      >
                        Other
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message" className="dark:text-gray-300">
                    Message
                  </Label>
                  <Textarea
                    id="message"
                    placeholder="Describe your issue in detail"
                    rows={5}
                    className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
                <Button type="submit" className="w-full">
                  Submit Request
                </Button>
              </form>
            </CardContent>
          </Card>

          <div className="space-y-6">
            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Contact Information
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  Our support channels
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start">
                  <Phone className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold dark:text-white">
                      Phone Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      +880 9612 345678
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Saturday-Thursday, 9AM-11PM
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Mail className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold dark:text-white">
                      Email Support
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      support@example.com
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Response within 24 hours
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <MessageSquare className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold dark:text-white">Live Chat</h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      Available on website
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      10AM-8PM, 7 days a week
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="dark:bg-gray-800 dark:border-gray-700">
              <CardHeader>
                <CardTitle className="dark:text-white">
                  Visit Our Office
                </CardTitle>
                <CardDescription className="dark:text-gray-400">
                  We`re here to help in person
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-4 mt-1" />
                  <div>
                    <h3 className="font-semibold dark:text-white">
                      Head Office
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      House #123, Road #456, Gulshan-1
                    </p>
                    <p className="text-gray-600 dark:text-gray-300">
                      Dhaka 1212, Bangladesh
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Sunday-Thursday, 9AM-5PM
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {activeTab === "faq" && (
        <Card className="mb-12 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">
              Frequently Asked Questions
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              Find answers to common questions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1" className="dark:border-gray-700">
                <AccordionTrigger className="dark:text-white hover:no-underline">
                  How long does delivery take in Bangladesh?
                </AccordionTrigger>
                <AccordionContent className="dark:text-gray-300">
                  Delivery times vary by location: Dhaka (1-2 days), divisional
                  cities (2-4 days), district towns (3-5 days), and remote areas
                  (5-7 days). These are business day estimates and may vary
                  during holidays or unforeseen circumstances.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-2" className="dark:border-gray-700">
                <AccordionTrigger className="dark:text-white hover:no-underline">
                  What payment methods do you accept?
                </AccordionTrigger>
                <AccordionContent className="dark:text-gray-300">
                  We accept cash on delivery (COD), credit/debit cards, and
                  mobile banking services including bKash, Nagad, and Rocket.
                  All online payments are secured with SSL encryption.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3" className="dark:border-gray-700">
                <AccordionTrigger className="dark:text-white hover:no-underline">
                  How can I track my order?
                </AccordionTrigger>
                <AccordionContent className="dark:text-gray-300">
                  Once your order is shipped, you will receive a tracking number
                  via SMS and email. You can enter this tracking number in the
                  ``Track Order`` section of our website or mobile app to see
                  the current status of your delivery.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-4" className="dark:border-gray-700">
                <AccordionTrigger className="dark:text-white hover:no-underline">
                  What is your return policy?
                </AccordionTrigger>
                <AccordionContent className="dark:text-gray-300">
                  We offer a 7-day return policy for most items. Products must
                  be unused, in original packaging, and with all tags attached.
                  Some items like personal care products and underwear are not
                  returnable for hygiene reasons. Please see our Returns page
                  for details.
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-5" className="dark:border-gray-700">
                <AccordionTrigger className="dark:text-white hover:no-underline">
                  Do you deliver to remote areas of Bangladesh?
                </AccordionTrigger>
                <AccordionContent className="dark:text-gray-300">
                  Yes, we deliver to all 64 districts of Bangladesh. Delivery to
                  remote areas may take longer (5-7 days) and may have
                  additional shipping charges. You can check delivery
                  availability by entering your address during checkout.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </CardContent>
        </Card>
      )}

      {activeTab === "track" && (
        <Card className="mb-12 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Track Your Order</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Enter your order details to check status
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="order-id" className="dark:text-gray-300">
                      Order ID
                    </Label>
                    <Input
                      id="order-id"
                      placeholder="e.g. ORD123456"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="track-phone" className="dark:text-gray-300">
                      Phone Number
                    </Label>
                    <Input
                      id="track-phone"
                      placeholder="Phone number used for order"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Track Order
                  </Button>
                </form>
              </div>
              <div>
                <div className="bg-gray-50 dark:bg-gray-700 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 dark:text-white">
                    Order Status:{" "}
                    <span className="text-green-600 dark:text-green-400">
                      On the Way
                    </span>
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">
                          Order Placed
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          June 12, 2023 - 10:30 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">
                          Order Confirmed
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          June 12, 2023 - 11:15 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center mr-3">
                        <CheckCircle className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">Shipped</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          June 13, 2023 - 9:45 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center mr-3">
                        <Truck className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">
                          Out for Delivery
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          June 14, 2023 - 8:30 AM
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-300 dark:bg-gray-600 flex items-center justify-center mr-3">
                        <Clock className="h-5 w-5 text-gray-600 dark:text-gray-300" />
                      </div>
                      <div>
                        <p className="font-medium dark:text-white">Delivered</p>
                        <p className="text-sm text-gray-500 dark:text-gray-300">
                          Expected by today 5:00 PM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {activeTab === "return" && (
        <Card className="mb-12 dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Start a Return</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Initiate the return process for your order
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <form className="space-y-4">
                  <div className="space-y-2">
                    <Label
                      htmlFor="return-order-id"
                      className="dark:text-gray-300"
                    >
                      Order ID
                    </Label>
                    <Input
                      id="return-order-id"
                      placeholder="e.g. ORD123456"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="return-phone"
                      className="dark:text-gray-300"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="return-phone"
                      placeholder="Phone number used for order"
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="return-reason"
                      className="dark:text-gray-300"
                    >
                      Reason for Return
                    </Label>
                    <Select>
                      <SelectTrigger className="dark:bg-gray-700 dark:border-gray-600 dark:text-white">
                        <SelectValue placeholder="Select a reason" />
                      </SelectTrigger>
                      <SelectContent className="dark:bg-gray-800 dark:border-gray-700">
                        <SelectItem
                          value="damaged"
                          className="dark:text-gray-300 dark:focus:bg-gray-700"
                        >
                          Damaged Product
                        </SelectItem>
                        <SelectItem
                          value="wrong"
                          className="dark:text-gray-300 dark:focus:bg-gray-700"
                        >
                          Wrong Item Received
                        </SelectItem>
                        <SelectItem
                          value="quality"
                          className="dark:text-gray-300 dark:focus:bg-gray-700"
                        >
                          Quality Issues
                        </SelectItem>
                        <SelectItem
                          value="size"
                          className="dark:text-gray-300 dark:focus:bg-gray-700"
                        >
                          Size Doesn`t Fit
                        </SelectItem>
                        <SelectItem
                          value="other"
                          className="dark:text-gray-300 dark:focus:bg-gray-700"
                        >
                          Other Reason
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label
                      htmlFor="return-details"
                      className="dark:text-gray-300"
                    >
                      Additional Details
                    </Label>
                    <Textarea
                      id="return-details"
                      placeholder="Please provide more details about your return"
                      rows={3}
                      className="dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Request Return
                  </Button>
                </form>
              </div>
              <div>
                <div className="bg-blue-50 dark:bg-blue-900/20 p-6 rounded-lg">
                  <h3 className="font-semibold mb-4 text-blue-800 dark:text-blue-300">
                    Return Policy Highlights
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                      <span className="dark:text-gray-300">
                        7-day return policy from delivery date
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                      <span className="dark:text-gray-300">
                        Free pickup in Dhaka, Chittagong, and Sylhet
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                      <span className="dark:text-gray-300">
                        Refund processed within 3-5 business days after return
                      </span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400 mr-2 mt-0.5" />
                      <span className="dark:text-gray-300">
                        Original packaging and tags must be included
                      </span>
                    </li>
                  </ul>
                  <Alert className="mt-6 bg-amber-50 dark:bg-amber-900/20 border-amber-200 dark:border-amber-700">
                    <AlertCircle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                    <AlertDescription className="text-amber-700 dark:text-amber-300 text-sm">
                      Some items like personal care products, underwear, and
                      perishables are not returnable for hygiene reasons.
                    </AlertDescription>
                  </Alert>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <HeadphonesIcon className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="dark:text-white">24/7 Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Our customer care team is available around the clock to assist you
              with any issues.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <FileText className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="dark:text-white">Help Center</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Browse our comprehensive help articles for instant answers to
              common questions.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <MessageSquare className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="dark:text-white">Live Chat</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Chat instantly with our support agents during business hours for
              quick solutions.
            </p>
          </CardContent>
        </Card>
      </div>

      <Alert className="bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700">
        <AlertCircle className="h-5 w-5 text-green-600 dark:text-green-400" />
        <AlertTitle className="text-green-800 dark:text-green-200">
          Support Availability
        </AlertTitle>
        <AlertDescription className="text-green-700 dark:text-green-300">
          Our customer support is available Saturday-Thursday from 9:00 AM to
          11:00 PM and Friday from 3:00 PM to 11:00 PM (Bangladesh Time).
        </AlertDescription>
      </Alert>
    </div>
  );
}
