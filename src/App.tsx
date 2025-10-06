import { useState } from "react";
import { Header } from "./components/Header";
import { SmartSlotBanner } from "./components/SmartSlotBanner";
import { FoodCategories } from "./components/FoodCategories";
import { RestaurantCard } from "./components/RestaurantCard";
import { SmartSlotModal } from "./components/SmartSlotModal";
import { SignInModal } from "./components/SignInModal";
import { CartModal } from "./components/CartModal";
import { LocationModal } from "./components/LocationModal";
import { FilterModal } from "./components/FilterModal";
import { RestaurantMenuModal } from "./components/RestaurantMenuModal";
import { GroupOrderModal } from "./components/GroupOrderModal";
import { GroupOrderBanner } from "./components/GroupOrderBanner";
import { FloatingGroupButton } from "./components/FloatingGroupButton";
import { JoinGroupModal } from "./components/JoinGroupModal";
import { CategoryItemsPage } from "./components/CategoryItemsPage";
import { Filter, Users } from "lucide-react";
import { Button } from "./components/ui/button";
import { toast } from "sonner";
import { motion } from "framer-motion";

interface CartItem {
  id: number;
  name: string;
  restaurant: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface Restaurant {
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  price: string;
  imageUrl: string;
  offer?: string;
  distance: string;
}

export default function App() {
  // Modal states
  const [smartSlotModalOpen, setSmartSlotModalOpen] = useState(false);
  const [signInModalOpen, setSignInModalOpen] = useState(false);
  const [cartModalOpen, setCartModalOpen] = useState(false);
  const [locationModalOpen, setLocationModalOpen] = useState(false);
  const [filterModalOpen, setFilterModalOpen] = useState(false);
  const [menuModalOpen, setMenuModalOpen] = useState(false);
  const [groupOrderModalOpen, setGroupOrderModalOpen] = useState(false);
  const [joinGroupModalOpen, setJoinGroupModalOpen] = useState(false);
  const [categoryPageOpen, setCategoryPageOpen] = useState(false);
  const [selectedCategoryForPage, setSelectedCategoryForPage] = useState<string | null>(null);

  // App states
  const [userName, setUserName] = useState<string | null>(null);
  const [location, setLocation] = useState("NIET Campus, Greater Noida");
  const [selectedRestaurant, setSelectedRestaurant] = useState<Restaurant | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Chicken Biryani",
      restaurant: "Biryani Blues",
      price: 280,
      quantity: 1,
      imageUrl: "https://images.unsplash.com/photo-1714611626323-5ba6204453be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kJTIwYmlyeWFuaXxlbnwxfHx8fDE3NTk2NDY1Njh8MA&ixlib=rb-4.1.0&q=80&w=400"
    },
    {
      id: 2,
      name: "Margherita Pizza",
      restaurant: "Pizza Paradise",
      price: 320,
      quantity: 1,
      imageUrl: "https://images.unsplash.com/photo-1642789736356-d7122adfe91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzU5NjQ2NTY4fDA&ixlib=rb-4.1.0&q=80&w=400"
    }
  ]);

  const [filters, setFilters] = useState({
    rating: 0,
    deliveryTime: 60,
    priceRange: [0, 1000],
    cuisines: [],
    offers: false,
  });

  const handleCategoryClick = (category: string) => {
    // Open category items page instead of modal
    setSelectedCategoryForPage(category);
    setCategoryPageOpen(true);
  };

  const restaurants: Restaurant[] = [
    {
      name: "Biryani Blues",
      cuisine: "North Indian, Biryani, Mughlai",
      rating: 4.3,
      deliveryTime: "30-35 mins",
      price: "₹300 for two",
      imageUrl: "https://images.unsplash.com/photo-1714611626323-5ba6204453be?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjBmb29kJTIwYmlyeWFuaXxlbnwxfHx8fDE3NTk2NDY1Njh8MA&ixlib=rb-4.1.0&q=80&w=1080",
      offer: "50% OFF up to ₹100",
      distance: "2.5 km"
    },
    {
      name: "Pizza Paradise",
      cuisine: "Italian, Pizza, Pasta",
      rating: 4.5,
      deliveryTime: "25-30 mins",
      price: "₹400 for two",
      imageUrl: "https://images.unsplash.com/photo-1642789736356-d7122adfe91b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwaXp6YSUyMGNsb3NlJTIwdXB8ZW58MXx8fHwxNzU5NjQ2NTY4fDA&ixlib=rb-4.1.0&q=80&w=1080",
      offer: "Buy 1 Get 1 Free",
      distance: "1.8 km"
    },
    {
      name: "The Burger Hub",
      cuisine: "American, Burgers, Fast Food",
      rating: 4.2,
      deliveryTime: "20-25 mins",
      price: "₹250 for two",
      imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXJnZXIlMjBmcmllc3xlbnwxfHx8fDE3NTk1OTc5ODl8MA&ixlib=rb-4.1.0&q=80&w=1080",
      offer: "30% OFF",
      distance: "3.2 km"
    },
    {
      name: "Cafe Delight",
      cuisine: "Cafe, Coffee, Snacks",
      rating: 4.4,
      deliveryTime: "15-20 mins",
      price: "₹200 for two",
      imageUrl: "https://images.unsplash.com/photo-1669131196140-49591336b13e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyZXN0YXVyYW50JTIwaW50ZXJpb3IlMjBtb2Rlcm58ZW58MXx8fHwxNzU5NTg4NTkwfDA&ixlib=rb-4.1.0&q=80&w=1080",
      offer: "Free Delivery",
      distance: "1.2 km"
    },
    {
      name: "Thali House",
      cuisine: "Indian, Thali, Home Food",
      rating: 4.6,
      deliveryTime: "35-40 mins",
      price: "₹350 for two",
      imageUrl: "https://images.unsplash.com/photo-1711153419402-336ee48f2138?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpbmRpYW4lMjB0aGFsaSUyMGZvb2R8ZW58MXx8fHwxNzU5NjA1MDUxfDA&ixlib=rb-4.1.0&q=80&w=1080",
      offer: "₹125 OFF above ₹499",
      distance: "2.8 km"
    },
    {
      name: "Noodle Box",
      cuisine: "Chinese, Asian, Noodles",
      rating: 4.1,
      deliveryTime: "30-35 mins",
      price: "₹300 for two",
      imageUrl: "https://images.unsplash.com/photo-1542308743-80f875fec614?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxub29kbGVzJTIwYXNpYW4lMjBmb29kfGVufDF8fHx8MTc1OTU3MDI3NXww&ixlib=rb-4.1.0&q=80&w=1080",
      offer: "40% OFF up to ₹80",
      distance: "4.1 km"
    }
  ];

  // Handlers
  const handleSignIn = (name: string) => {
    setUserName(name);
    toast.success(`Welcome ${name}! 🎉`);
  };

  const handleLocationSelect = (newLocation: string) => {
    setLocation(newLocation);
    toast.success(`Location updated to ${newLocation}`);
  };

  const handleRestaurantClick = (restaurant: Restaurant) => {
    setSelectedRestaurant(restaurant);
    setMenuModalOpen(true);
  };

  const handleAddToCart = (item: any, quantity: number) => {
    const newItem: CartItem = {
      id: Date.now(),
      name: item.name,
      restaurant: selectedRestaurant?.name || "Unknown",
      price: item.price,
      quantity: quantity,
      imageUrl: item.imageUrl,
    };
    setCartItems([...cartItems, newItem]);
    toast.success(`${item.name} added to cart!`);
  };

  const handleUpdateCartQuantity = (id: number, quantity: number) => {
    if (quantity === 0) {
      setCartItems(cartItems.filter(item => item.id !== id));
    } else {
      setCartItems(cartItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      ));
    }
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
    toast.success("Item removed from cart");
  };

  const handleCheckout = () => {
    setCartModalOpen(false);
    setSmartSlotModalOpen(true);
    toast.success("Proceeding to checkout! Select your delivery slot.");
  };

  const handleApplyFilters = (newFilters: any) => {
    setFilters(newFilters);
    toast.success("Filters applied successfully!");
  };

  const handleSlotConfirm = (slot: string) => {
    // Store the confirmed slot or proceed with checkout
    toast.success(`Delivery slot confirmed for ${slot}! 🎯`);
  };

  const handleCreateGroup = (groupCode: string) => {
    console.log("Group created with code:", groupCode);
  };

  const handleJoinGroup = (groupCode: string) => {
    console.log("Joined group with code:", groupCode);
    // Here you would typically load the group's active order
  };

  // Filter restaurants based on selected category and filters
  const filteredRestaurants = restaurants.filter((restaurant) => {
    // Category filter
    if (selectedCategory) {
      const cuisineLower = restaurant.cuisine.toLowerCase();
      const categoryLower = selectedCategory.toLowerCase();
      
      if (categoryLower === "pizza" && !cuisineLower.includes("pizza") && !cuisineLower.includes("italian")) return false;
      if (categoryLower === "burgers" && !cuisineLower.includes("burger") && !cuisineLower.includes("fast food")) return false;
      if (categoryLower === "biryani" && !cuisineLower.includes("biryani")) return false;
      if (categoryLower === "chinese" && !cuisineLower.includes("chinese") && !cuisineLower.includes("asian")) return false;
      if (categoryLower === "beverages" && !cuisineLower.includes("cafe") && !cuisineLower.includes("coffee")) return false;
      if (categoryLower === "desserts" && !cuisineLower.includes("dessert")) return false;
    }

    // Rating filter
    if (filters.rating > 0 && restaurant.rating < filters.rating) return false;

    // Cuisine filter
    if (filters.cuisines.length > 0) {
      const restaurantCuisines = restaurant.cuisine.toLowerCase();
      const matchesCuisine = filters.cuisines.some((cuisine: string) =>
        restaurantCuisines.includes(cuisine.toLowerCase().replace(" ", ""))
      );
      if (!matchesCuisine) return false;
    }

    // Offers filter
    if (filters.offers && !restaurant.offer) return false;

    return true;
  });

  // If category page is open, show that instead
  if (categoryPageOpen && selectedCategoryForPage) {
    return (
      <CategoryItemsPage
        category={selectedCategoryForPage}
        onBack={() => {
          setCategoryPageOpen(false);
          setSelectedCategoryForPage(null);
        }}
        onAddToCart={handleAddToCart}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        location={location}
        userName={userName}
        cartItemCount={cartItems.length}
        onLocationClick={() => setLocationModalOpen(true)}
        onSignInClick={() => setSignInModalOpen(true)}
        onCartClick={() => setCartModalOpen(true)}
        onSmartSlotsClick={() => setSmartSlotModalOpen(true)}
        onGroupOrderClick={() => setGroupOrderModalOpen(true)}
      />
      
      <main className="container mx-auto px-4 py-8">
        <SmartSlotBanner onSetUpClick={() => setSmartSlotModalOpen(true)} />
        
        <GroupOrderBanner onStartGroupOrder={() => setGroupOrderModalOpen(true)} />
        
        <FoodCategories 
          selectedCategory={selectedCategory}
          onCategoryClick={handleCategoryClick}
        />

        <div className="flex items-center justify-between mb-6">
          <h2>Restaurants near you</h2>
          <div className="flex items-center gap-3">
            <Button 
              variant="outline" 
              className="gap-2 border-purple-200 text-purple-600 hover:bg-purple-50"
              onClick={() => setJoinGroupModalOpen(true)}
            >
              <Users className="w-4 h-4" />
              <span className="hidden md:inline">Join Group</span>
            </Button>
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={() => setFilterModalOpen(true)}
            >
              <Filter className="w-4 h-4" />
              <span className="hidden md:inline">Filters</span>
            </Button>
            <Button 
              onClick={() => setSmartSlotModalOpen(true)}
              className="bg-[#FC8019] hover:bg-[#e67315] text-white"
            >
              <span className="hidden md:inline">Set Delivery Slot</span>
              <span className="md:hidden">Slot</span>
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {filteredRestaurants.length > 0 ? (
            filteredRestaurants.map((restaurant, index) => (
              <RestaurantCard 
                key={index} 
                {...restaurant}
                onClick={() => handleRestaurantClick(restaurant)}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-gray-600">No restaurants found</p>
              <p className="text-sm text-gray-400 mt-2">Try changing your filters</p>
            </div>
          )}
        </div>

        <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-xl p-8 text-white text-center mb-8">
          <h2 className="text-white mb-3">Why Group Orders Are Perfect for Students</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-4xl mb-3">💰</div>
              <h3 className="text-white mb-2">Split Bills Easy</h3>
              <p className="text-white/90 text-sm mb-3">
                No more awkward money collecting
              </p>
              <div className="text-white/70 text-xs mt-4 pt-4 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <p>• Equal split or by items</p>
                <p>• Automatic calculation</p>
                <p>• Everyone pays their share</p>
                <p>• No math required!</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-4xl mb-3">🚀</div>
              <h3 className="text-white mb-2">Save Delivery Fee</h3>
              <p className="text-white/90 text-sm mb-3">
                One order, shared costs
              </p>
              <div className="text-white/70 text-xs mt-4 pt-4 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <p>• Single delivery charge</p>
                <p>• Split among all members</p>
                <p>• Order more, pay less</p>
                <p>• Perfect for hostel groups!</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-white mb-2">Super Quick</h3>
              <p className="text-white/90 text-sm mb-3">
                Create & share in seconds
              </p>
              <div className="text-white/70 text-xs mt-4 pt-4 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <p>• One-click group creation</p>
                <p>• Share via WhatsApp/SMS</p>
                <p>• Everyone adds simultaneously</p>
                <p>• No waiting around!</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-4xl mb-3">🤝</div>
              <h3 className="text-white mb-2">Order Together</h3>
              <p className="text-white/90 text-sm mb-3">
                Live order collaboration
              </p>
              <div className="text-white/70 text-xs mt-4 pt-4 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <p>• See friends join in real-time</p>
                <p>• Track who ordered what</p>
                <p>• Chat while ordering</p>
                <p>• Make it a social experience!</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-[#FC8019] to-[#ff9a3d] rounded-xl p-8 text-white text-center">
          <h2 className="text-white mb-3">How Smart-Slot Delivery Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-4xl mb-3">📅</div>
              <h3 className="text-white mb-2">1. Sync Schedule</h3>
              <p className="text-white/90 text-sm mb-3">
                Connect your class timetable with SmartSwiggy
              </p>
              <div className="text-white/70 text-xs mt-4 pt-4 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <p>• Import your college timetable</p>
                <p>• Automatically identify free periods</p>
                <p>• Mark your available delivery windows</p>
                <p>• Edit schedule anytime as per your needs</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-4xl mb-3">🍕</div>
              <h3 className="text-white mb-2">2. Order Food</h3>
              <p className="text-white/90 text-sm mb-3">
                Choose from your favorite restaurants
              </p>
              <div className="text-white/70 text-xs mt-4 pt-4 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <p>• Browse 1000+ restaurants nearby</p>
                <p>• Filter by cuisine, rating & offers</p>
                <p>• Add items to cart with one click</p>
                <p>• Get personalized recommendations</p>
              </div>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 hover:bg-white/20 transition-all cursor-pointer group">
              <div className="text-4xl mb-3">⏰</div>
              <h3 className="text-white mb-2">3. Pick Free Slot</h3>
              <p className="text-white/90 text-sm mb-3">
                We deliver during your break time - no class interruptions!
              </p>
              <div className="text-white/70 text-xs mt-4 pt-4 border-t border-white/20 opacity-0 group-hover:opacity-100 transition-opacity">
                <p>• See recommended delivery slots</p>
                <p>• Choose any available free period</p>
                <p>• Get food delivered during breaks</p>
                <p>• Never miss a class for food again!</p>
              </div>
            </div>
          </div>
        </div>
      </main>

      <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white mt-16 py-8 relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-0 left-0 w-40 h-40 bg-[#FC8019] rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-48 h-48 bg-purple-500 rounded-full blur-3xl"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-6">
            {/* Brand Section */}
            <div className="col-span-2 md:col-span-1">
              <div className="bg-[#FC8019] text-white px-3 py-1.5 rounded-lg inline-block mb-3">
                <h4 className="text-white text-sm">SmartSwiggy</h4>
              </div>
              <p className="text-gray-400 text-xs mb-3">
                Never miss a class, never miss a meal! Order with friends, split bills easily, and schedule deliveries during your free periods.
              </p>
              <div className="flex gap-2">
                <motion.div 
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all text-sm"
                >
                  <span>📱</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all text-sm"
                >
                  <span>🐦</span>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center cursor-pointer hover:bg-white/20 transition-all text-sm"
                >
                  <span>💼</span>
                </motion.div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white mb-3 text-sm">Quick Links</h4>
              <ul className="space-y-1.5 text-gray-400 text-xs">
                <li className="hover:text-[#FC8019] transition-colors cursor-pointer">About Us</li>
                <li className="hover:text-[#FC8019] transition-colors cursor-pointer">How It Works</li>
                <li className="hover:text-[#FC8019] transition-colors cursor-pointer">Group Orders</li>
                <li className="hover:text-[#FC8019] transition-colors cursor-pointer">Smart Slots</li>
                <li className="hover:text-[#FC8019] transition-colors cursor-pointer">Contact Support</li>
              </ul>
            </div>

            {/* Features */}
            <div>
              <h4 className="text-white mb-3 text-sm">Features</h4>
              <ul className="space-y-1.5 text-gray-400 text-xs">
                <li className="flex items-center gap-1.5">
                  <span className="text-[#FC8019]">✓</span>
                  <span>Smart-Slot Delivery</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-purple-400">✓</span>
                  <span>Group Orders</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#FC8019]">✓</span>
                  <span>Split Payments</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-purple-400">✓</span>
                  <span>Schedule Orders</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <span className="text-[#FC8019]">✓</span>
                  <span>Track Real-time</span>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-white mb-3 text-sm">Legal</h4>
              <ul className="space-y-1.5 text-gray-400 text-xs">
                <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
                <li className="hover:text-white cursor-pointer transition-colors">Terms of Service</li>
                <li className="hover:text-white cursor-pointer transition-colors">Cookie Policy</li>
              </ul>
            </div>
          </div>

          {/* Bottom Section */}
          <div className="pt-4 border-t border-white/10">
            <p className="text-gray-500 text-xs text-center">
              © 2026 SmartSwiggy. Built for <span className="text-[#FC8019]">Swiggy Food for Thought Challenge</span>
            </p>
          </div>
        </div>
      </footer>

      {/* All Modals */}
      <SmartSlotModal 
        open={smartSlotModalOpen} 
        onClose={() => setSmartSlotModalOpen(false)}
        onConfirm={handleSlotConfirm}
      />
      
      <SignInModal 
        open={signInModalOpen}
        onClose={() => setSignInModalOpen(false)}
        onSignIn={handleSignIn}
      />
      
      <CartModal 
        open={cartModalOpen}
        onClose={() => setCartModalOpen(false)}
        items={cartItems}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />
      
      <LocationModal 
        open={locationModalOpen}
        onClose={() => setLocationModalOpen(false)}
        onSelectLocation={handleLocationSelect}
        currentLocation={location}
      />
      
      <FilterModal 
        open={filterModalOpen}
        onClose={() => setFilterModalOpen(false)}
        filters={filters}
        onApplyFilters={handleApplyFilters}
      />
      
      <RestaurantMenuModal 
        open={menuModalOpen}
        onClose={() => setMenuModalOpen(false)}
        restaurant={selectedRestaurant}
        onAddToCart={handleAddToCart}
      />
      
      <GroupOrderModal 
        open={groupOrderModalOpen}
        onClose={() => setGroupOrderModalOpen(false)}
        onCreateGroup={handleCreateGroup}
        currentUser={userName}
      />

      <JoinGroupModal 
        open={joinGroupModalOpen}
        onClose={() => setJoinGroupModalOpen(false)}
        onJoinGroup={handleJoinGroup}
      />

      <FloatingGroupButton onClick={() => setGroupOrderModalOpen(true)} />
    </div>
  );
}
