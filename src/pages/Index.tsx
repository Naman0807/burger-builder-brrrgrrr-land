
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import BurgerCard from "@/components/BurgerCard";
import NavBar from "@/components/NavBar";
import { predefinedBurgers } from "@/data/burgerData";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-burger-beige to-burger-yellow py-20 px-6">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-4 text-burger-brown">
            Brrr<span className="text-burger-red">grrr</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-burger-brown max-w-2xl mx-auto">
            Create your perfect burger with our customizable options or choose from our delicious signature burgers.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Button 
              asChild
              size="lg" 
              className="bg-burger-red hover:bg-red-700 text-white font-bold py-3 px-8 rounded-md"
            >
              <Link to="/customize">Build Your Burger</Link>
            </Button>
            <Button 
              asChild
              variant="outline" 
              size="lg" 
              className="border-burger-brown text-burger-brown hover:bg-burger-brown hover:text-white font-bold py-3 px-8 rounded-md"
            >
              <Link to="/menu">View Menu</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* Featured Burgers */}
      <div className="py-16 px-6 bg-white">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">Featured Burgers</h2>
          <p className="text-gray-600 mb-8 text-center">Try our most popular creations</p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {predefinedBurgers.map((burger) => (
              <BurgerCard key={burger.id} burgerId={burger.id} />
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <Button asChild variant="outline" className="border-burger-brown text-burger-brown hover:bg-burger-brown hover:text-white">
              <Link to="/menu">View All Burgers</Link>
            </Button>
          </div>
        </div>
      </div>
      
      {/* How It Works */}
      <div className="py-16 px-6 bg-burger-beige bg-opacity-30">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold mb-2 text-center">How It Works</h2>
          <p className="text-gray-600 mb-12 text-center">Creating your perfect burger is easy!</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-burger-red rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">1</div>
              <h3 className="text-xl font-bold mb-2">Choose Your Base</h3>
              <p className="text-gray-600">Select from our signature burgers or start from scratch.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-burger-red rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4 animate-bounce-light">2</div>
              <h3 className="text-xl font-bold mb-2">Customize</h3>
              <p className="text-gray-600">Add or remove ingredients to create your perfect burger.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-burger-red rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">3</div>
              <h3 className="text-xl font-bold mb-2">Order & Enjoy</h3>
              <p className="text-gray-600">Add to cart, checkout and get ready for burger bliss!</p>
            </div>
          </div>
          
          <div className="mt-12 text-center">
            <Button asChild className="bg-burger-red hover:bg-red-700">
              <Link to="/customize">Start Building Now</Link>
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

export default Index;
