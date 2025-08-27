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
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Truck,
  Clock,
  Shield,
  Phone,
  Mail,
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export default function DeliveryDetailsPage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
          Delivery Services
        </h1>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          We provide fast, reliable, and secure delivery services across
          Bangladesh. Your satisfaction is our priority.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Truck className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="dark:text-white">
              Nationwide Delivery
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              We deliver to all 64 districts of Bangladesh with our extensive
              network of delivery partners.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Clock className="h-12 w-12 text-green-600 dark:text-green-400" />
            </div>
            <CardTitle className="dark:text-white">Fast Delivery</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Dhaka: 1-2 days, Other Divisions: 2-5 days, Remote Areas: 5-7
              days.
            </p>
          </CardContent>
        </Card>

        <Card className="text-center dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <div className="flex justify-center mb-4">
              <Shield className="h-12 w-12 text-purple-600 dark:text-purple-400" />
            </div>
            <CardTitle className="dark:text-white">Secure Packaging</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 dark:text-gray-300">
              Your products are packed with care to ensure they reach you in
              perfect condition.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">
              Delivery Coverage Areas
            </CardTitle>
            <CardDescription className="dark:text-gray-400">
              We deliver to all these areas in Bangladesh
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h3 className="font-semibold mb-2 dark:text-white">
                  Divisional Cities
                </h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Dhaka
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Chittagong
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Sylhet
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Rajshahi
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Khulna
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Barishal
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Rangpur
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Mymensingh
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold mb-2 dark:text-white">
                  District Towns
                </h3>
                <ul className="space-y-1 text-sm text-gray-600 dark:text-gray-300">
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Comilla
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Bogura
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Cox`s Bazar
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Jessore
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Gazipur
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Narayanganj
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" />{" "}
                    Rangamati
                  </li>
                  <li className="flex items-center">
                    <CheckCircle className="h-4 w-4 text-green-500 mr-2" /> And
                    all others
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-6">
              <Badge
                variant="outline"
                className="bg-blue-50 text-blue-700 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-700"
              >
                <MapPin className="h-4 w-4 mr-1" />
                Serving all 64 districts
              </Badge>
            </div>
          </CardContent>
        </Card>

        <Card className="dark:bg-gray-800 dark:border-gray-700">
          <CardHeader>
            <CardTitle className="dark:text-white">Delivery Charges</CardTitle>
            <CardDescription className="dark:text-gray-400">
              Transparent pricing for all locations
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium dark:text-white">
                    Inside Dhaka City
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Up to 2 kg
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold dark:text-white">৳ 60</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    1-2 business days
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium dark:text-white">
                    Other Divisional Cities
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Up to 2 kg
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold dark:text-white">৳ 100</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    2-4 business days
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium dark:text-white">
                    District Towns
                  </h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Up to 2 kg
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold dark:text-white">৳ 120</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    3-5 business days
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div>
                  <h4 className="font-medium dark:text-white">Remote Areas</h4>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Up to 2 kg
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold dark:text-white">৳ 150</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    5-7 business days
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              <p>* Additional ৳ 20 per kg for weight above 2 kg</p>
              <p>* Free delivery on orders above ৳ 1500</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mb-12 dark:bg-gray-800 dark:border-gray-700">
        <CardHeader>
          <CardTitle className="dark:text-white">
            Frequently Asked Questions
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Common questions about our delivery services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem
              value="item-1"
              className="border-b dark:border-gray-700"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline dark:text-white">
                How long does delivery take?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Delivery times vary by location: Dhaka (1-2 days), divisional
                cities (2-4 days), district towns (3-5 days), and remote areas
                (5-7 days). These are business day estimates and may vary during
                holidays or unforeseen circumstances.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-2"
              className="border-b dark:border-gray-700"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline dark:text-white">
                Do you deliver on weekends?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Yes, we deliver on Fridays and Saturdays. However, our delivery
                partners may have limited operations on Sundays and government
                holidays.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-3"
              className="border-b dark:border-gray-700"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline dark:text-white">
                Can I track my order?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Yes, once your order is shipped, you will receive a tracking
                number via SMS and email that you can use to monitor your
                package`s journey until it reaches your doorstep.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-4"
              className="border-b dark:border-gray-700"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline dark:text-white">
                What if I`m not available during delivery?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Our delivery agent will attempt to contact you three times. If
                unsuccessful, your package will be held at the nearest delivery
                hub for 3 days. You can reschedule delivery through our customer
                service or pick it up directly from the hub.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-5"
              className="border-b dark:border-gray-700"
            >
              <AccordionTrigger className="text-left font-medium hover:no-underline dark:text-white">
                Do you offer cash on delivery?
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 dark:text-gray-300">
                Yes, we offer cash on delivery (COD) service across Bangladesh.
                There are no additional charges for COD orders. You can pay with
                cash or mobile financial services when your order is delivered.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/30 dark:to-indigo-900/30 border-none">
        <CardHeader>
          <CardTitle className="dark:text-white">
            Need Help With Delivery?
          </CardTitle>
          <CardDescription className="dark:text-gray-400">
            Our customer service team is here to assist you
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  delivery-support@example.com
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  We respond within 24 hours
                </p>
              </div>
            </div>
          </div>
          <Button className="mt-6 dark:bg-blue-600 dark:hover:bg-blue-700">
            Contact Support <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
