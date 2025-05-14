
import NavBar from "@/components/NavBar";
import BurgerCard from "@/components/BurgerCard";
import { predefinedBurgers } from "@/data/burgerData";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      <div className="bg-burger-beige py-10 px-6">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-2 text-center">Our Menu</h1>
          <p className="text-center text-gray-700 mb-8">Choose from our signature burgers or create your own</p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {predefinedBurgers.map((burger) => (
              <BurgerCard key={burger.id} burgerId={burger.id} />
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild className="bg-burger-red hover:bg-red-700 text-white font-bold">
              <Link to="/customize">Create Your Own Burger</Link>
            </Button>
          </div>
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

export default Menu;
