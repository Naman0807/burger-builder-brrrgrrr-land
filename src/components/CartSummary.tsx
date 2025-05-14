
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ShoppingBag, Trash } from "lucide-react";
import { useCart } from "@/hooks/useCart";

interface CartSummaryProps {
  showCheckoutButton?: boolean;
  onCheckout?: () => void;
}

const CartSummary = ({ showCheckoutButton = true, onCheckout }: CartSummaryProps) => {
  const { items, totalPrice, removeFromCart, updateQuantity } = useCart();

  const handleCheckout = () => {
    if (onCheckout) {
      onCheckout();
    }
  };

  if (items.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center">Your Cart</CardTitle>
        </CardHeader>
        <CardContent className="text-center py-8">
          <ShoppingBag className="mx-auto h-12 w-12 text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Your cart is empty</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex justify-between">
          <span>Your Cart</span>
          <span>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
        </CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {items.map((item) => (
          <div key={item.id} className="flex flex-col">
            <div className="flex justify-between">
              <div className="flex flex-col">
                <span className="font-medium">{item.name}</span>
                <span className="text-sm text-muted-foreground">Qty: {item.quantity}</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-muted-foreground hover:text-destructive"
                  onClick={() => removeFromCart(item.id)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <div className="text-xs text-muted-foreground mt-1 line-clamp-1">
              {item.ingredients.map(ing => ing.name).join(', ')}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2"
                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                disabled={item.quantity <= 1}
              >
                -
              </Button>
              <span className="text-sm">{item.quantity}</span>
              <Button
                variant="outline"
                size="sm"
                className="h-7 px-2"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                +
              </Button>
            </div>
            <Separator className="mt-3" />
          </div>
        ))}

        <div className="mt-2 space-y-2">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-muted-foreground">
            <span>Tax (8%)</span>
            <span>${(totalPrice * 0.08).toFixed(2)}</span>
          </div>
          <Separator />
          <div className="flex justify-between font-medium text-lg">
            <span>Total</span>
            <span>${(totalPrice * 1.08).toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
      {showCheckoutButton && (
        <CardFooter>
          <Button
            className="w-full bg-burger-red hover:bg-red-700"
            onClick={handleCheckout}
          >
            Proceed to Checkout
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default CartSummary;
