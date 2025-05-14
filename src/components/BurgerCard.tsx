
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { predefinedBurgers, findIngredientById } from "@/data/burgerData";
import { useCart, BurgerItem } from "@/hooks/useCart";
import { useNavigate } from "react-router-dom";

interface BurgerCardProps {
  burgerId: string;
  showActions?: boolean;
}

const BurgerCard = ({ burgerId, showActions = true }: BurgerCardProps) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  
  const burger = predefinedBurgers.find(b => b.id === burgerId);
  
  if (!burger) {
    return null;
  }
  
  const handleAddToCart = () => {
    // Convert ingredient IDs to actual ingredient objects
    const ingredients = burger.ingredientIds
      .map(findIngredientById)
      .filter(Boolean);
      
    const burgerItem: BurgerItem = {
      id: burger.id,
      name: burger.name,
      price: burger.price,
      ingredients: ingredients as any,
      quantity: 1
    };
    
    addToCart(burgerItem);
  };
  
  const handleCustomize = () => {
    // Convert ingredient IDs to actual ingredient objects
    const ingredients = burger.ingredientIds
      .map(findIngredientById)
      .filter(Boolean);
      
    navigate('/customize', { 
      state: { 
        baseIngredients: ingredients,
        baseBurger: burger
      } 
    });
  };

  return (
    <Card className="overflow-hidden burger-shadow hover:shadow-lg transition-shadow">
      <div className="relative h-48 bg-secondary">
        {/* Placeholder image for demonstration */}
        <div className="absolute inset-0 flex items-center justify-center bg-burger-beige">
          <div className="text-burger-brown text-lg font-bold">{burger.name}</div>
        </div>
      </div>
      <CardHeader>
        <CardTitle>{burger.name}</CardTitle>
        <CardDescription>{burger.description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-1 mb-2">
          {burger.ingredientIds.slice(0, 5).map(id => {
            const ingredient = findIngredientById(id);
            return ingredient && (
              <div key={id} className="text-xs bg-muted px-2 py-1 rounded-full">
                {ingredient.name}
              </div>
            );
          })}
          {burger.ingredientIds.length > 5 && (
            <div className="text-xs bg-muted px-2 py-1 rounded-full">
              +{burger.ingredientIds.length - 5} more
            </div>
          )}
        </div>
        <p className="font-bold text-xl text-burger-brown">${burger.price.toFixed(2)}</p>
      </CardContent>
      {showActions && (
        <CardFooter className="flex gap-2">
          <Button 
            variant="default" 
            className="flex-1 bg-burger-red hover:bg-red-700"
            onClick={handleAddToCart}
          >
            Add to Cart
          </Button>
          <Button 
            variant="outline" 
            className="flex-1 border-burger-brown text-burger-brown hover:bg-burger-brown hover:text-white"
            onClick={handleCustomize}
          >
            Customize
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default BurgerCard;
