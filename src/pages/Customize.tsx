
import { useLocation, Link } from "react-router-dom";
import NavBar from "@/components/NavBar";
import BurgerBuilder from "@/components/BurgerBuilder";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useState } from "react";

const Customize = () => {
  const location = useLocation();
  const { baseIngredients, baseBurger } = location.state || {};
  const [customizing, setCustomizing] = useState(true);

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="bg-white py-8 flex-grow">
        <div className="container mx-auto">
          <div className="mb-6 flex items-center">
            <Button asChild variant="ghost" className="mr-2">
              <Link to="/menu">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Menu
              </Link>
            </Button>
            <h1 className="text-2xl md:text-3xl font-bold">
              {baseBurger ? `Customize ${baseBurger.name}` : "Build Your Burger"}
            </h1>
          </div>
          
          {customizing && (
            <div className="mb-4">
              <p className="text-gray-600">
                {baseBurger
                  ? "Customize this burger by adding or removing ingredients."
                  : "Create your own burger by selecting ingredients from the categories below."}
              </p>
            </div>
          )}
          
          <BurgerBuilder initialIngredients={baseIngredients} baseBurger={baseBurger} />
        </div>
      </div>
      
      {/* Footer */}
      <footer className="bg-burger-brown text-white py-8 px-6">
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

export default Customize;
