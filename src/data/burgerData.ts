
import { IngredientType } from '@/hooks/useCart';

// Define the ingredients available
export const ingredients: IngredientType[] = [
  // Buns
  {
    id: 'bun-regular',
    name: 'Regular Bun',
    price: 1.50,
    image: '/bun-regular.png',
    category: 'bun'
  },
  {
    id: 'bun-sesame',
    name: 'Sesame Bun',
    price: 1.75,
    image: '/bun-sesame.png',
    category: 'bun'
  },
  {
    id: 'bun-pretzel',
    name: 'Pretzel Bun',
    price: 2.25,
    image: '/bun-pretzel.png',
    category: 'bun'
  },
  
  // Patties
  {
    id: 'patty-beef',
    name: 'Beef Patty',
    price: 3.50,
    image: '/patty-beef.png',
    category: 'patty'
  },
  {
    id: 'patty-chicken',
    name: 'Chicken Patty',
    price: 3.25,
    image: '/patty-chicken.png',
    category: 'patty'
  },
  {
    id: 'patty-veggie',
    name: 'Veggie Patty',
    price: 3.00,
    image: '/patty-veggie.png',
    category: 'patty'
  },
  
  // Cheeses
  {
    id: 'cheese-american',
    name: 'American Cheese',
    price: 1.00,
    image: '/cheese-american.png',
    category: 'cheese'
  },
  {
    id: 'cheese-cheddar',
    name: 'Cheddar Cheese',
    price: 1.25,
    image: '/cheese-cheddar.png',
    category: 'cheese'
  },
  {
    id: 'cheese-swiss',
    name: 'Swiss Cheese',
    price: 1.50,
    image: '/cheese-swiss.png',
    category: 'cheese'
  },
  
  // Vegetables
  {
    id: 'veggie-lettuce',
    name: 'Lettuce',
    price: 0.50,
    image: '/veggie-lettuce.png',
    category: 'vegetable'
  },
  {
    id: 'veggie-tomato',
    name: 'Tomato',
    price: 0.75,
    image: '/veggie-tomato.png',
    category: 'vegetable'
  },
  {
    id: 'veggie-onion',
    name: 'Onion',
    price: 0.50,
    image: '/veggie-onion.png',
    category: 'vegetable'
  },
  {
    id: 'veggie-pickle',
    name: 'Pickle',
    price: 0.50,
    image: '/veggie-pickle.png',
    category: 'vegetable'
  },
  
  // Sauces
  {
    id: 'sauce-ketchup',
    name: 'Ketchup',
    price: 0.25,
    image: '/sauce-ketchup.png',
    category: 'sauce'
  },
  {
    id: 'sauce-mayo',
    name: 'Mayo',
    price: 0.25,
    image: '/sauce-mayo.png',
    category: 'sauce'
  },
  {
    id: 'sauce-mustard',
    name: 'Mustard',
    price: 0.25,
    image: '/sauce-mustard.png',
    category: 'sauce'
  },
  {
    id: 'sauce-bbq',
    name: 'BBQ Sauce',
    price: 0.50,
    image: '/sauce-bbq.png',
    category: 'sauce'
  }
];

// Find ingredient by ID helper
export const findIngredientById = (id: string): IngredientType | undefined => {
  return ingredients.find(ingredient => ingredient.id === id);
};

// Pre-defined burger options
export const predefinedBurgers = [
  {
    id: 'classic-burger',
    name: 'Classic Burger',
    description: 'Our signature beef patty with lettuce, tomato, onion, and special sauce on a sesame seed bun.',
    price: 8.99,
    image: '/classic-burger.png',
    ingredientIds: ['bun-sesame', 'patty-beef', 'veggie-lettuce', 'veggie-tomato', 'veggie-onion', 'sauce-ketchup', 'sauce-mayo'],
  },
  {
    id: 'cheese-lover',
    name: 'Cheese Lover',
    description: 'Double beef patties layered with three kinds of cheese for the ultimate cheese experience.',
    price: 10.99,
    image: '/cheese-lover.png',
    ingredientIds: ['bun-regular', 'patty-beef', 'patty-beef', 'cheese-american', 'cheese-cheddar', 'cheese-swiss', 'sauce-mayo'],
  },
  {
    id: 'veggie-delight',
    name: 'Veggie Delight',
    description: 'Plant-based patty with fresh veggies and special sauce on a pretzel bun.',
    price: 9.49,
    image: '/veggie-delight.png',
    ingredientIds: ['bun-pretzel', 'patty-veggie', 'cheese-cheddar', 'veggie-lettuce', 'veggie-tomato', 'veggie-onion', 'sauce-mayo'],
  },
  {
    id: 'chicken-supreme',
    name: 'Chicken Supreme',
    description: 'Grilled chicken patty with fresh vegetables and BBQ sauce.',
    price: 9.99,
    image: '/chicken-supreme.png',
    ingredientIds: ['bun-regular', 'patty-chicken', 'cheese-american', 'veggie-lettuce', 'veggie-tomato', 'sauce-bbq'],
  },
];
