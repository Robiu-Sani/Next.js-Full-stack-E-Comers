import React from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Youtube,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  ShieldCheck,
  Truck,
  CreditCard,
} from "lucide-react";

export default function ParentFooter() {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-gray-200">
      {/* Promo Card */}
      <div className="container mx-auto px-4 py-8">
        <Card className="relative mt-4 overflow-hidden border-0 bg-gradient-to-br from-purple-600/10 to-blue-600/5 dark:from-purple-600/20 dark:to-blue-600/10">
          {/* Decorative elements */}
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-purple-600/10 dark:bg-purple-600/20"></div>
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-blue-600/5 dark:bg-blue-600/10"></div>

          {/* Content */}
          <CardContent className="relative z-10 p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-3">
              <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-foreground">
                Stay Updated with Our Latest Offers!
              </h3>
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="text-muted-foreground">
                  Subscribe to our newsletter and get 15% off your first order
                  plus exclusive deals.
                </p>
                <div className="h-1 w-8 rounded-full bg-purple-600/30"></div>
                <div className="flex gap-2">
                  <span className="inline-flex items-center rounded-full bg-purple-600/10 px-3 py-1 text-xs font-medium text-purple-600 dark:bg-purple-600/20 dark:text-purple-400">
                    Exclusive Deals
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blue-600/10 px-3 py-1 text-xs font-medium text-blue-600 dark:bg-blue-600/20 dark:text-blue-400">
                    Limited Time
                  </span>
                </div>
              </div>
            </div>
            <div className="flex w-full max-w-sm items-center space-x-2">
              <Input
                type="email"
                placeholder="Your email address"
                className="bg-background focus-visible:ring-purple-300"
              />
              <Button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white font-medium"
              >
                Subscribe
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Shop Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" />
              Our Store
            </h3>
            <p className="mb-4 text-gray-600 dark:text-gray-400">
              Providing high quality products with fast delivery and excellent
              customer service.
            </p>
            <div className="flex space-x-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <Facebook className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Twitter className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Instagram className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Linkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Youtube className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Home
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Shop
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  About Us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  FAQs
                </a>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  My Account
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Order Tracking
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Wishlist
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Returns & Exchanges
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Shipping Info
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition"
                >
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 mt-0.5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  123 Street, City, Country
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  +1 234 567 890
                </span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                <span className="text-gray-600 dark:text-gray-400">
                  support@example.com
                </span>
              </li>
            </ul>
          </div>
        </div>

        <Separator className="my-8 bg-gray-300 dark:bg-gray-700" />

        {/* Features */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <Truck className="w-6 h-6 text-purple-600" />
            <div>
              <h4 className="font-medium">Free Shipping</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                On orders over $100
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <CreditCard className="w-6 h-6 text-purple-600" />
            <div>
              <h4 className="font-medium">Secure Payment</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                100% secure payment
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <ShieldCheck className="w-6 h-6 text-purple-600" />
            <div>
              <h4 className="font-medium">Quality Products</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Guaranteed quality
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 rounded-lg bg-white dark:bg-gray-800 shadow-sm">
            <Phone className="w-6 h-6 text-purple-600" />
            <div>
              <h4 className="font-medium">24/7 Support</h4>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Dedicated support
              </p>
            </div>
          </div>
        </div>

        <Separator className="my-4 bg-gray-300 dark:bg-gray-700" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center py-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">
            © {new Date().getFullYear()} Your E-commerce Store. All rights
            reserved.
          </p>
          <div className="flex gap-4 mt-4 md:mt-0">
            <a
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Terms of Service
            </a>
            <a
              href="#"
              className="text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              Cookies Policy
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
