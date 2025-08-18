import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Gift, Truck, Headphones, BadgeDollarSign } from "lucide-react";

export default function OffersCards() {
  const offers = [
    {
      title: "Best Offers",
      description: "Exclusive deals and discounts for our customers",
      icon: <Gift className="h-6 w-6" />,
      colors: {
        bgFrom: "from-purple-600/10",
        bgTo: "to-blue-600/5",
        darkBgFrom: "dark:from-purple-600/20",
        darkBgTo: "dark:to-blue-600/10",
        accent: "bg-purple-600/10",
        darkAccent: "dark:bg-purple-600/20",
        text: "text-purple-600",
        darkText: "dark:text-purple-400",
        button: "bg-purple-600 hover:bg-purple-700",
      },
    },
    {
      title: "Fast Delivery",
      description: "Get your orders delivered in record time",
      icon: <Truck className="h-6 w-6" />,
      colors: {
        bgFrom: "from-green-600/10",
        bgTo: "to-emerald-600/5",
        darkBgFrom: "dark:from-green-600/20",
        darkBgTo: "dark:to-emerald-600/10",
        accent: "bg-green-600/10",
        darkAccent: "dark:bg-green-600/20",
        text: "text-green-600",
        darkText: "dark:text-green-400",
        button: "bg-green-600 hover:bg-green-700",
      },
    },
    {
      title: "Best Support",
      description: "24/7 customer support for all your needs",
      icon: <Headphones className="h-6 w-6" />,
      colors: {
        bgFrom: "from-orange-600/10",
        bgTo: "to-amber-600/5",
        darkBgFrom: "dark:from-orange-600/20",
        darkBgTo: "dark:to-amber-600/10",
        accent: "bg-orange-600/10",
        darkAccent: "dark:bg-orange-600/20",
        text: "text-orange-600",
        darkText: "dark:text-orange-400",
        button: "bg-orange-600 hover:bg-orange-700",
      },
    },
    {
      title: "Trusted Refund",
      description: "Easy and hassle-free refund process",
      icon: <BadgeDollarSign className="h-6 w-6" />,
      colors: {
        bgFrom: "from-red-600/10",
        bgTo: "to-pink-600/5",
        darkBgFrom: "dark:from-red-600/20",
        darkBgTo: "dark:to-pink-600/10",
        accent: "bg-red-600/10",
        darkAccent: "dark:bg-red-600/20",
        text: "text-red-600",
        darkText: "dark:text-red-400",
        button: "bg-red-600 hover:bg-red-700",
      },
    },
  ];

  return (
    <div className="container max-w-7xl mx-auto px-2 pb-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {offers.map((offer, index) => (
          <Card
            key={index}
            className={`relative h-[100px] overflow-hidden border-0 bg-gradient-to-br ${offer.colors.bgFrom} ${offer.colors.bgTo} ${offer.colors.darkBgFrom} ${offer.colors.darkBgTo} transition-all duration-300 hover:scale-[1.02] hover:shadow-md`}
          >
            {/* Decorative elements */}
            <div
              className={`absolute -right-6 -top-6 h-20 w-20 rounded-full ${offer.colors.accent} ${offer.colors.darkAccent}`}
            ></div>
            <div
              className={`absolute -bottom-10 -left-10 h-32 w-32 rounded-full ${offer.colors.accent} ${offer.colors.darkAccent}`}
            ></div>

            {/* Content */}
            <CardContent className="relative z-10 p-4 px-2 sm:px-4 h-full flex items-center gap-2 sm:gap-4">
              <div
                className={`p-3 rounded-full ${offer.colors.accent} ${offer.colors.darkAccent} ${offer.colors.text} ${offer.colors.darkText}`}
              >
                {offer.icon}
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-foreground line-clamp-1">
                  {offer.title}
                </h3>
                <p className="text-sm hidden sm:block md:hidden lg:block text-muted-foreground line-clamp-2">
                  {offer.description}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
