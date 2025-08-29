import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { ShoppingCart } from "lucide-react";
import useContextData from "../custom-component/useContextData";
import CartListHandle from "./childrens/CartListHandle";

export default function CartList() {
  const { cartData } = useContextData();
  const products = cartData.map((item) => item.product);
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <ShoppingCart className="w-5 h-5" />
          {cartData.length > 0 && (
            <span className="absolute -top-1 -right-1 bg-primary text-primary-foreground text-xs rounded-full h-4 w-4 flex items-center justify-center">
              {cartData.length}
            </span>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent side="right">
        <SheetHeader>
          <SheetTitle>Your Cart</SheetTitle>
          <SheetDescription></SheetDescription>
          <CartListHandle products={products} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
