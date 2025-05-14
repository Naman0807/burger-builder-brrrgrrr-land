
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

export interface IngredientType {
  id: string;
  name: string;
  price: number;
  image: string;
  category: 'patty' | 'bun' | 'cheese' | 'vegetable' | 'sauce';
}

export interface BurgerItem {
  id: string;
  name: string;
  price: number;
  ingredients: IngredientType[];
  isCustom?: boolean;
  quantity: number;
}

interface CartContextType {
  items: BurgerItem[];
  addToCart: (burger: BurgerItem) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  itemCount: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [items, setItems] = useState<BurgerItem[]>([]);
  
  const itemCount = items.reduce((total, item) => total + item.quantity, 0);
  
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity, 
    0
  );

  // Add a burger to cart
  const addToCart = (burger: BurgerItem) => {
    setItems(prevItems => {
      // Check if this burger already exists in cart
      const existingItemIndex = prevItems.findIndex(
        item => item.id === burger.id
      );

      if (existingItemIndex >= 0) {
        // If it exists, update quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += burger.quantity;
        
        toast({
          title: "Added to cart",
          description: `Updated ${burger.name} quantity in your cart`,
        });
        
        return newItems;
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${burger.name} was added to your cart`,
        });
        
        return [...prevItems, burger];
      }
    });
  };

  // Remove a burger from cart
  const removeFromCart = (id: string) => {
    setItems(prevItems => {
      const newItems = prevItems.filter(item => item.id !== id);
      
      toast({
        title: "Removed from cart",
        description: "Item was removed from your cart",
      });
      
      return newItems;
    });
  };

  // Update quantity of a burger
  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  // Clear cart
  const clearCart = () => {
    setItems([]);
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart",
    });
  };

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        itemCount,
        totalPrice
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  
  return context;
};
