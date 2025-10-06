import { MapPin, Search, User, ShoppingCart, Calendar, Users } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  location: string;
  userName: string | null;
  cartItemCount: number;
  onLocationClick: () => void;
  onSignInClick: () => void;
  onCartClick: () => void;
  onSmartSlotsClick: () => void;
  onGroupOrderClick: () => void;
}

export function Header({
  location,
  userName,
  cartItemCount,
  onLocationClick,
  onSignInClick,
  onCartClick,
  onSmartSlotsClick,
  onGroupOrderClick,
}: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-8">
            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <motion.div 
                className="bg-[#FC8019] text-white px-3 py-2 rounded-lg cursor-pointer"
                whileHover={{ 
                  boxShadow: "0 4px 20px rgba(252, 128, 25, 0.4)",
                  y: -2
                }}
                transition={{ duration: 0.2 }}
              >
                <h1 className="text-white">SmartSwiggy</h1>
              </motion.div>
            </motion.div>
            
            <button
              onClick={onLocationClick}
              className="hidden md:flex items-center gap-2 border-b-2 border-[#FC8019] pb-1 hover:bg-orange-50 px-2 py-1 rounded-t transition-all"
            >
              <MapPin className="w-5 h-5 text-[#FC8019]" />
              <div className="text-left">
                <p className="text-sm text-gray-600">Deliver to</p>
                <p className="text-sm">{location}</p>
              </div>
            </button>
          </div>

          <div className="hidden lg:flex items-center gap-4 flex-1 max-w-xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search for restaurants and food"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FC8019] bg-gray-50"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="ghost" 
                className="gap-2 bg-purple-50 text-purple-600 hover:bg-purple-100 hover:text-purple-700 relative dark:bg-purple-900/30 dark:text-purple-400"
                onClick={onGroupOrderClick}
              >
                <Users className="w-5 h-5" />
                <span className="hidden md:inline">Group Order</span>
                <span className="absolute -top-1 -right-1 w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              </Button>
            </motion.div>
            <Button variant="ghost" className="gap-2" onClick={onSmartSlotsClick}>
              <Calendar className="w-5 h-5" />
              <span className="hidden md:inline">Smart Slots</span>
            </Button>
            <Button variant="ghost" className="gap-2" onClick={onSignInClick}>
              <User className="w-5 h-5" />
              <span className="hidden md:inline">{userName || "Sign In"}</span>
            </Button>
            <Button variant="ghost" className="gap-2 relative" onClick={onCartClick}>
              <ShoppingCart className="w-5 h-5" />
              <span className="hidden md:inline">Cart</span>
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#FC8019] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}
