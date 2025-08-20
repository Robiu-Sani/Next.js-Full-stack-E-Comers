"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Phone,
  Mail,
  FileText,
  Edit,
  AlertCircle,
  Home,
  Briefcase,
  CheckCircle,
  Clock,
  Award,
  BarChart3,
} from "lucide-react";

export default function OverViewPart() {
  // Sample data for demonstration
  const sampleData = {
    name: "John Doe",
    username: "johndoe",
    email: "john.doe@example.com",
    number: "+1 (555) 123-4567",
    dateOfBirth: "1990-05-15",
    role: "premium-user",
    joinDate: "2023-01-15",
    loyaltyPoints: 1250,
    bio: "Passionate about technology and innovation. Love exploring new gadgets and staying up-to-date with the latest trends in tech. Always looking for ways to improve user experiences.",
    contacts: [
      {
        type: "mobile",
        value: "+1 (555) 123-4567",
        icon: <Phone className="h-4 w-4" />,
      },
      {
        type: "email",
        value: "john.doe@example.com",
        icon: <Mail className="h-4 w-4" />,
      },
      {
        type: "whatsapp",
        value: "+1 (555) 987-6543",
        icon: <MessageCircle className="h-4 w-4" />,
      },
    ],
    addresses: [
      {
        type: "home",
        line: "123 Main Street",
        city: "New York",
        state: "NY",
        zip: "10001",
        icon: <Home className="h-4 w-4" />,
      },
      {
        type: "work",
        line: "456 Office Blvd",
        city: "Brooklyn",
        state: "NY",
        zip: "11201",
        icon: <Briefcase className="h-4 w-4" />,
      },
    ],
    stats: {
      totalOrders: 47,
      wishlistItems: 12,
      reviews: 8,
      completedOrders: 42,
      pendingOrders: 3,
      cancelledOrders: 2,
    },
    recentActivity: [
      { action: "Order placed", date: "2 hours ago", status: "pending" },
      { action: "Product reviewed", date: "1 day ago", status: "completed" },
      { action: "Wishlist updated", date: "2 days ago", status: "info" },
    ],
  };

  return (
    <div className="space-y-6">
      {/* Bio Section */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <FileText className="h-5 w-5" />
            About Me
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{sampleData.bio}</p>
          <Button variant="outline" className="mt-4 gap-2">
            <Edit className="h-4 w-4" />
            Edit Bio
          </Button>
        </CardContent>
      </Card>

      {/* Order Statistics */}
      <Card className="border-0 shadow-lg">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <BarChart3 className="h-5 w-5" />
            Order Statistics
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-3 gap-4">
            <div className="text-center">
              <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-green-600">
                {sampleData.stats.completedOrders}
              </div>
              <div className="text-sm text-gray-600">Completed</div>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-yellow-600">
                {sampleData.stats.pendingOrders}
              </div>
              <div className="text-sm text-gray-600">Pending</div>
            </div>
            <div className="text-center">
              <AlertCircle className="h-8 w-8 text-red-500 mx-auto mb-2" />
              <div className="text-xl font-bold text-red-600">
                {sampleData.stats.cancelledOrders}
              </div>
              <div className="text-sm text-gray-600">Cancelled</div>
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Order Completion Rate</span>
              <span>89%</span>
            </div>
            <Progress value={89} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Loyalty Program */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            Loyalty Program
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-lg font-semibold text-purple-800">
                {sampleData.loyaltyPoints} Points
              </p>
              <p className="text-sm text-purple-600">
                Earn 250 more points for Gold status
              </p>
            </div>
            <div className="text-right">
              <div className="w-20 h-20 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full flex items-center justify-center text-white font-bold">
                Silver
              </div>
            </div>
          </div>
          <Progress
            value={(sampleData.loyaltyPoints / 1500) * 100}
            className="h-2 mt-4"
          />
          <div className="flex justify-between text-xs text-gray-600 mt-2">
            <span>Silver</span>
            <span>Gold (1500)</span>
            <span>Platinum (3000)</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function MessageCircle(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
    </svg>
  );
}
