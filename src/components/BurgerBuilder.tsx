
import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useCart, IngredientType, BurgerItem } from '@/hooks/useCart';
import { ingredients } from '@/data/burgerData';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Plus, Minus } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

interface BurgerBuilderProps {
  initialIngredients?: IngredientType[];
  baseBurger?: { id: string; name: string; price: number; };
}

const BurgerBuilder = ({ initialIngredients = [], baseBurger }: BurgerBuilderProps) => {
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [selectedIngredients, setSelectedIngredients] = useState<IngredientType[]>(initialIngredients);
  const [customBurgerName, setCustomBurgerName] = useState(baseBurger?.name || 'Custom Burger');
  const [quantity, setQuantity] = useState(1);
  
  // Calculate total price based on selected ingredients
  const totalPrice = selectedIngredients.reduce(
    (sum, ingredient) => sum + ingredient.price, 
    0
  );

  // Group ingredients by category
  const ingredientsByCategory = ingredients.reduce((acc, ingredient) => {
    if (!acc[ingredient.category]) {
      acc[ingredient.category] = [];
    }
    acc[ingredient.category].push(ingredient);
    return acc;
  }, {} as Record<string, IngredientType[]>);
  
  // Check if an ingredient is selected
  const isIngredientSelected = (ingredientId: string): boolean => {
    return selectedIngredients.some(i => i.id === ingredientId);
  };
  
  // Toggle ingredient selection
  const toggleIngredient = (ingredient: IngredientType) => {
    if (isIngredientSelected(ingredient.id)) {
      // If it's a bun or patty, check if it's the last one
      if ((ingredient.category === 'bun' || ingredient.category === 'patty') && 
          selectedIngredients.filter(i => i.category === ingredient.category).length <= 1) {
        toast({
          title: "Cannot Remove Ingredient",
          description: `Your burger needs at least one ${ingredient.category}!`,
          variant: "destructive"
        });
        return;
      }
      
      setSelectedIngredients(prev => 
        prev.filter(i => i.id !== ingredient.id)
      );
    } else {
      setSelectedIngredients(prev => [...prev, ingredient]);
    }
  };
  
  // Check if burger has required ingredients
  const hasBunAndPatty = (): boolean => {
    const hasBun = selectedIngredients.some(i => i.category === 'bun');
    const hasPatty = selectedIngredients.some(i => i.category === 'patty');
    return hasBun && hasPatty;
  };
  
  // Add burger to cart
  const handleAddToCart = () => {
    if (!hasBunAndPatty()) {
      toast({
        title: "Incomplete Burger",
        description: "Your burger needs at least one bun and one patty!",
        variant: "destructive"
      });
      return;
    }
    
    const newBurger: BurgerItem = {
      id: baseBurger?.id || `custom-burger-${Date.now()}`,
      name: customBurgerName,
      price: totalPrice,
      ingredients: selectedIngredients,
      isCustom: !baseBurger,
      quantity: quantity
    };
    
    addToCart(newBurger);
  };

  // Reset burger
  const resetBurger = () => {
    setSelectedIngredients([]);
    setCustomBurgerName('Custom Burger');
  };
  
  // Increment quantity
  const incrementQuantity = () => setQuantity(prev => prev + 1);
  
  // Decrement quantity
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  return (
    <div className="container mx-auto">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Burger visualization */}
        <Card className="lg:col-span-1">
          <CardContent className="p-6">
            <div className="mb-4 font-bold text-lg">Your Burger</div>
            
            <div className="flex flex-col items-center justify-center min-h-80 relative">
              {selectedIngredients.length > 0 ? (
                <div className="flex flex-col-reverse w-full">
                  {selectedIngredients.map((ingredient, idx) => (
                    <div 
                      key={`${ingredient.id}-${idx}`} 
                      className="flex justify-center py-1"
                    >
                      <div className="bg-burger-beige px-3 py-1 rounded-full text-sm">
                        {ingredient.name}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-500">
                  Add ingredients to build your burger!
                </div>
              )}
            </div>
            
            <div className="mt-4">
              <div className="flex justify-between items-center mb-2">
                <span>Burger Name:</span>
                <input
                  type="text"
                  value={customBurgerName}
                  onChange={(e) => setCustomBurgerName(e.target.value)}
                  className="border rounded px-2 py-1 text-sm ml-2"
                />
              </div>
              
              <div className="flex justify-between font-bold">
                <span>Total Price:</span>
                <span>${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center mt-2">
                <span>Quantity:</span>
                <div className="flex items-center">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className="h-8 w-8"
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={incrementQuantity}
                    className="h-8 w-8"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              
              {!hasBunAndPatty() && (
                <Alert variant="destructive" className="mt-4">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    Your burger needs at least one bun and one patty!
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="grid grid-cols-2 gap-2 mt-4">
                <Button 
                  onClick={resetBurger}
                  variant="outline"
                  className="w-full"
                >
                  Reset
                </Button>
                <Button 
                  onClick={handleAddToCart}
                  className="w-full bg-burger-red hover:bg-red-700"
                  disabled={!hasBunAndPatty()}
                >
                  Add to Cart
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
        
        {/* Ingredients selection */}
        <Card className="lg:col-span-2">
          <CardContent className="p-6">
            <Tabs defaultValue="bun">
              <TabsList className="mb-4 grid grid-cols-5 w-full">
                <TabsTrigger value="bun">Buns</TabsTrigger>
                <TabsTrigger value="patty">Patties</TabsTrigger>
                <TabsTrigger value="cheese">Cheese</TabsTrigger>
                <TabsTrigger value="vegetable">Veggies</TabsTrigger>
                <TabsTrigger value="sauce">Sauces</TabsTrigger>
              </TabsList>
              
              {Object.entries(ingredientsByCategory).map(([category, categoryIngredients]) => (
                <TabsContent key={category} value={category} className="mt-0">
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                    {categoryIngredients.map((ingredient) => (
                      <div 
                        key={ingredient.id}
                        className={`
                          ingredient-item cursor-pointer p-4 rounded-lg border-2
                          ${isIngredientSelected(ingredient.id) 
                            ? 'border-burger-red bg-red-50' 
                            : 'border-gray-200 hover:border-burger-red'}
                        `}
                        onClick={() => toggleIngredient(ingredient)}
                      >
                        <div className="h-20 flex items-center justify-center bg-burger-beige rounded mb-2">
                          <div className="text-sm font-medium text-burger-brown">
                            {ingredient.name}
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="font-medium text-sm">{ingredient.name}</span>
                          <span className="text-burger-brown font-bold">${ingredient.price.toFixed(2)}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default BurgerBuilder;
