
import { useState } from "react";
import { Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import CartSummary from "@/components/CartSummary";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";
import { ShoppingBag, ArrowLeft, CheckCircle } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

const Cart = () => {
  const { items, clearCart } = useCart();
  const { toast } = useToast();
  const [orderComplete, setOrderComplete] = useState(false);

  const handleCheckout = () => {
    // In a real app, this would trigger the payment process
    // For demo, we'll just show a success message and clear the cart
    toast({
      title: "Order placed successfully!",
      description: "Your burgers will be ready soon.",
    });
    
    setOrderComplete(true);
    clearCart();
  };

  if (orderComplete) {
    return (
      <div className="min-h-screen flex flex-col">
        <NavBar />
        
        <div className="flex flex-col items-center justify-center flex-grow py-20 px-4">
          <div className="text-center max-w-md">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500 mb-4" />
            <h1 className="text-3xl font-bold mb-4">Order Confirmed!</h1>
            <p className="text-lg text-gray-600 mb-8">
              Thank you for your order. Your delicious burgers will be ready soon!
            </p>
            <Button asChild className="bg-burger-red hover:bg-red-700">
              <Link to="/">Return to Home</Link>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="bg-white py-8 px-4 flex-grow">
        <div className="container mx-auto max-w-4xl">
          <div className="mb-6">
            <Button asChild variant="ghost" className="mb-4">
              <Link to="/">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Continue Shopping
              </Link>
            </Button>
            <h1 className="text-3xl font-bold">Your Cart</h1>
          </div>
          
          {items.length === 0 ? (
            <div className="text-center py-20">
              <ShoppingBag className="mx-auto h-16 w-16 text-gray-400 mb-4" />
              <h2 className="text-2xl font-bold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Looks like you haven't added any burgers yet.</p>
              <Button asChild className="bg-burger-red hover:bg-red-700">
                <Link to="/menu">Browse Menu</Link>
              </Button>
            </div>
          ) : (
            <CartSummary onCheckout={handleCheckout} />
          )}
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-burger-brown text-white py-8 px-6 mt-auto">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-2">Brrrgrrr</h3>
              <p className="text-sm">The ultimate burger customization experience.</p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="font-bold mb-2">Menu</h4>
                <ul className="space-y-1 text-sm">
                  <li><Link to="/" className="hover:underline">Home</Link></li>
                  <li><Link to="/menu" className="hover:underline">Menu</Link></li>
                  <li><Link to="/customize" className="hover:underline">Build a Burger</Link></li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-bold mb-2">Contact</h4>
                <ul className="space-y-1 text-sm">
                  <li>info@brrrgrrr.com</li>
                  <li>123-456-7890</li>
                </ul>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white border-opacity-20 mt-8 pt-4 text-center text-sm">
            <p>&copy; 2025 Brrrgrrr. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Cart;
