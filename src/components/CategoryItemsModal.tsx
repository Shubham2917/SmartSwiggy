import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Plus, Minus, Star, X, ShoppingCart, Check } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { toast } from "sonner";
import confetti from "canvas-confetti";

interface MenuItem {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  isVeg: boolean;
  rating?: number;
}

interface CategoryItemsModalProps {
  open: boolean;
  onClose: () => void;
  category: string;
  onAddToCart: (item: MenuItem, quantity: number) => void;
}

export function CategoryItemsModal({ open, onClose, category, onAddToCart }: CategoryItemsModalProps) {
  const [quantities, setQuantities] = useState<{ [key: number]: number }>({});
  const [dietFilter, setDietFilter] = useState<"all" | "veg" | "nonveg">("all");
  const [addingToCart, setAddingToCart] = useState<number | null>(null);

  const allMenuItems: MenuItem[] = [
    // Pizza Items
    {
      id: 1,
      name: "Margherita Pizza",
      description: "Classic tomato, mozzarella, and basil",
      price: 299,
      imageUrl: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400",
      category: "Pizza",
      isVeg: true,
      rating: 4.5,
    },
    {
      id: 2,
      name: "Pepperoni Pizza",
      description: "Loaded with pepperoni and cheese",
      price: 349,
      imageUrl: "https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400",
      category: "Pizza",
      isVeg: false,
      rating: 4.6,
    },
    {
      id: 3,
      name: "Veggie Supreme Pizza",
      description: "Bell peppers, olives, onions, mushrooms",
      price: 329,
      imageUrl: "https://images.unsplash.com/photo-1642789736356-d7122adfe91b?w=400",
      category: "Pizza",
      isVeg: true,
      rating: 4.4,
    },
    {
      id: 4,
      name: "BBQ Chicken Pizza",
      description: "BBQ sauce, grilled chicken, onions",
      price: 379,
      imageUrl: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400",
      category: "Pizza",
      isVeg: false,
      rating: 4.7,
    },
    {
      id: 5,
      name: "Mexican Fiesta Pizza",
      description: "Jalapeños, corn, beans, salsa",
      price: 359,
      imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400",
      category: "Pizza",
      isVeg: true,
      rating: 4.3,
    },
    {
      id: 6,
      name: "Cheese Burst Pizza",
      description: "Extra cheese in the crust",
      price: 399,
      imageUrl: "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?w=400",
      category: "Pizza",
      isVeg: true,
      rating: 4.8,
    },
    {
      id: 7,
      name: "Paneer Tikka Pizza",
      description: "Tandoori paneer with capsicum",
      price: 339,
      imageUrl: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400",
      category: "Pizza",
      isVeg: true,
      rating: 4.5,
    },
    {
      id: 8,
      name: "Chicken Tikka Pizza",
      description: "Tandoori chicken with Indian spices",
      price: 369,
      imageUrl: "https://images.unsplash.com/photo-1590947132387-155cc02f3212?w=400",
      category: "Pizza",
      isVeg: false,
      rating: 4.6,
    },
    {
      id: 9,
      name: "Farm House Pizza",
      description: "Fresh vegetables and mushrooms",
      price: 319,
      imageUrl: "https://images.unsplash.com/photo-1564128442383-9201fcc740eb?w=400",
      category: "Pizza",
      isVeg: true,
      rating: 4.4,
    },
    {
      id: 10,
      name: "Four Cheese Pizza",
      description: "Mozzarella, cheddar, parmesan, gouda",
      price: 419,
      imageUrl: "https://images.unsplash.com/photo-1595854341625-f33ee10dbf94?w=400",
      category: "Pizza",
      isVeg: true,
      rating: 4.7,
    },

    // Burgers
    {
      id: 11,
      name: "Classic Beef Burger",
      description: "Juicy beef patty with lettuce and tomato",
      price: 199,
      imageUrl: "https://images.unsplash.com/photo-1627378378955-a3f4e406c5de?w=400",
      category: "Burgers",
      isVeg: false,
      rating: 4.5,
    },
    {
      id: 12,
      name: "Veg Burger",
      description: "Crispy veg patty with special sauce",
      price: 149,
      imageUrl: "https://images.unsplash.com/photo-1594212699903-ec8a3eca50f5?w=400",
      category: "Burgers",
      isVeg: true,
      rating: 4.2,
    },
    {
      id: 13,
      name: "Chicken Burger",
      description: "Grilled chicken with cheese",
      price: 189,
      imageUrl: "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400",
      category: "Burgers",
      isVeg: false,
      rating: 4.6,
    },
    {
      id: 14,
      name: "Paneer Burger",
      description: "Crispy paneer patty with veggies",
      price: 169,
      imageUrl: "https://images.unsplash.com/photo-1550547660-d9450f859349?w=400",
      category: "Burgers",
      isVeg: true,
      rating: 4.3,
    },
    {
      id: 15,
      name: "Double Decker Burger",
      description: "Two patties, double the fun",
      price: 259,
      imageUrl: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=400",
      category: "Burgers",
      isVeg: false,
      rating: 4.7,
    },
    {
      id: 16,
      name: "Cheese Burger",
      description: "Loaded with cheddar cheese",
      price: 179,
      imageUrl: "https://images.unsplash.com/photo-1586190848861-99aa4a171e90?w=400",
      category: "Burgers",
      isVeg: true,
      rating: 4.4,
    },
    {
      id: 17,
      name: "Mushroom Burger",
      description: "Grilled mushrooms with swiss cheese",
      price: 199,
      imageUrl: "https://images.unsplash.com/photo-1553979459-d2229ba7433b?w=400",
      category: "Burgers",
      isVeg: true,
      rating: 4.5,
    },
    {
      id: 18,
      name: "Spicy Chicken Burger",
      description: "Spicy chicken with jalapeños",
      price: 209,
      imageUrl: "https://images.unsplash.com/photo-1562547757-03a0f1a39b8e?w=400",
      category: "Burgers",
      isVeg: false,
      rating: 4.6,
    },
    {
      id: 19,
      name: "Aloo Tikki Burger",
      description: "Classic potato patty burger",
      price: 129,
      imageUrl: "https://images.unsplash.com/photo-1623238027041-ac2e1994b99e?w=400",
      category: "Burgers",
      isVeg: true,
      rating: 4.1,
    },
    {
      id: 20,
      name: "Crispy Chicken Burger",
      description: "Fried chicken with coleslaw",
      price: 219,
      imageUrl: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400",
      category: "Burgers",
      isVeg: false,
      rating: 4.7,
    },

    // Biryani
    {
      id: 21,
      name: "Chicken Biryani",
      description: "Aromatic basmati rice with succulent chicken",
      price: 280,
      imageUrl: "https://images.unsplash.com/photo-1714611626323-5ba6204453be?w=400",
      category: "Biryani",
      isVeg: false,
      rating: 4.6,
    },
    {
      id: 22,
      name: "Mutton Biryani",
      description: "Tender mutton in fragrant rice",
      price: 350,
      imageUrl: "https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400",
      category: "Biryani",
      isVeg: false,
      rating: 4.7,
    },
    {
      id: 23,
      name: "Veg Biryani",
      description: "Mixed vegetables with aromatic spices",
      price: 220,
      imageUrl: "https://images.unsplash.com/photo-1642821373181-696a54913e93?w=400",
      category: "Biryani",
      isVeg: true,
      rating: 4.3,
    },
    {
      id: 24,
      name: "Hyderabadi Biryani",
      description: "Authentic Hyderabadi style chicken biryani",
      price: 320,
      imageUrl: "https://images.unsplash.com/photo-1589302168068-964664d93dc0?w=400",
      category: "Biryani",
      isVeg: false,
      rating: 4.8,
    },
    {
      id: 25,
      name: "Paneer Biryani",
      description: "Cottage cheese with basmati rice",
      price: 240,
      imageUrl: "https://images.unsplash.com/photo-1626560871175-ee8e0e17eed0?w=400",
      category: "Biryani",
      isVeg: true,
      rating: 4.4,
    },
    {
      id: 26,
      name: "Egg Biryani",
      description: "Boiled eggs in spiced rice",
      price: 200,
      imageUrl: "https://images.unsplash.com/photo-1633945274309-ad22c3e149a3?w=400",
      category: "Biryani",
      isVeg: false,
      rating: 4.2,
    },
    {
      id: 27,
      name: "Prawn Biryani",
      description: "Succulent prawns in aromatic rice",
      price: 380,
      imageUrl: "https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400",
      category: "Biryani",
      isVeg: false,
      rating: 4.7,
    },
    {
      id: 28,
      name: "Lucknowi Biryani",
      description: "Awadhi style aromatic biryani",
      price: 340,
      imageUrl: "https://images.unsplash.com/photo-1642372459112-2b51cf0f0538?w=400",
      category: "Biryani",
      isVeg: false,
      rating: 4.6,
    },
    {
      id: 29,
      name: "Mushroom Biryani",
      description: "Exotic mushrooms with basmati rice",
      price: 250,
      imageUrl: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=400",
      category: "Biryani",
      isVeg: true,
      rating: 4.3,
    },
    {
      id: 30,
      name: "Chicken Dum Biryani",
      description: "Slow cooked in traditional dum style",
      price: 310,
      imageUrl: "https://images.unsplash.com/photo-1633945274405-b6c8069047b0?w=400",
      category: "Biryani",
      isVeg: false,
      rating: 4.8,
    },

    // Chinese
    {
      id: 31,
      name: "Hakka Noodles",
      description: "Stir-fried noodles with vegetables",
      price: 160,
      imageUrl: "https://images.unsplash.com/photo-1585032226651-759b368d7246?w=400",
      category: "Chinese",
      isVeg: true,
      rating: 4.3,
    },
    {
      id: 32,
      name: "Chicken Fried Rice",
      description: "Wok-tossed rice with chicken",
      price: 180,
      imageUrl: "https://images.unsplash.com/photo-1512058564366-18510be2db19?w=400",
      category: "Chinese",
      isVeg: false,
      rating: 4.4,
    },
    {
      id: 33,
      name: "Veg Manchurian",
      description: "Vegetable balls in tangy sauce",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1626765646801-ca85e3e5498a?w=400",
      category: "Chinese",
      isVeg: true,
      rating: 4.2,
    },
    {
      id: 34,
      name: "Chilli Chicken",
      description: "Spicy chicken in Indo-Chinese sauce",
      price: 220,
      imageUrl: "https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400",
      category: "Chinese",
      isVeg: false,
      rating: 4.6,
    },
    {
      id: 35,
      name: "Spring Rolls",
      description: "Crispy vegetable spring rolls",
      price: 120,
      imageUrl: "https://images.unsplash.com/photo-1540189549336-e6e99c3679fe?w=400",
      category: "Chinese",
      isVeg: true,
      rating: 4.1,
    },
    {
      id: 36,
      name: "Chicken Schezwan Noodles",
      description: "Spicy Schezwan style noodles",
      price: 200,
      imageUrl: "https://images.unsplash.com/photo-1555126634-323283e090fa?w=400",
      category: "Chinese",
      isVeg: false,
      rating: 4.5,
    },
    {
      id: 37,
      name: "Veg Fried Rice",
      description: "Classic vegetable fried rice",
      price: 140,
      imageUrl: "https://images.unsplash.com/photo-1603133872878-684f208fb84b?w=400",
      category: "Chinese",
      isVeg: true,
      rating: 4.2,
    },
    {
      id: 38,
      name: "Chicken Chowmein",
      description: "Soft noodles with chicken",
      price: 190,
      imageUrl: "https://images.unsplash.com/photo-1586985289688-ca3cf47d3e6e?w=400",
      category: "Chinese",
      isVeg: false,
      rating: 4.4,
    },
    {
      id: 39,
      name: "Paneer Chilli",
      description: "Spicy paneer in Chinese style",
      price: 200,
      imageUrl: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=400",
      category: "Chinese",
      isVeg: true,
      rating: 4.3,
    },
    {
      id: 40,
      name: "Sweet and Sour Chicken",
      description: "Chicken in sweet and tangy sauce",
      price: 210,
      imageUrl: "https://images.unsplash.com/photo-1552332386-f8dd00dc2f85?w=400",
      category: "Chinese",
      isVeg: false,
      rating: 4.5,
    },

    // Beverages
    {
      id: 51,
      name: "Cold Coffee",
      description: "Chilled coffee with ice cream",
      price: 120,
      imageUrl: "https://images.unsplash.com/photo-1656248781390-9eb25ef2c445?w=400",
      category: "Beverages",
      isVeg: true,
      rating: 4.4,
    },
    {
      id: 52,
      name: "Fresh Lime Soda",
      description: "Refreshing lime with soda",
      price: 70,
      imageUrl: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f0e?w=400",
      category: "Beverages",
      isVeg: true,
      rating: 4.2,
    },
    {
      id: 53,
      name: "Mango Shake",
      description: "Thick mango milkshake",
      price: 110,
      imageUrl: "https://images.unsplash.com/photo-1559217832-0f159e6fa9c4?w=400",
      category: "Beverages",
      isVeg: true,
      rating: 4.5,
    },
    {
      id: 54,
      name: "Coca Cola",
      description: "Chilled Coca Cola 300ml",
      price: 50,
      imageUrl: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400",
      category: "Beverages",
      isVeg: true,
      rating: 4.3,
    },
    {
      id: 55,
      name: "Masala Chai",
      description: "Hot Indian masala tea",
      price: 40,
      imageUrl: "https://images.unsplash.com/photo-1571934811356-5cc061b6821f?w=400",
      category: "Beverages",
      isVeg: true,
      rating: 4.6,
    },
    {
      id: 56,
      name: "Lassi",
      description: "Sweet yogurt drink",
      price: 80,
      imageUrl: "https://images.unsplash.com/photo-1622472526208-5be29bb4bc6b?w=400",
      category: "Beverages",
      isVeg: true,
      rating: 4.4,
    },
    {
      id: 57,
      name: "Chocolate Shake",
      description: "Rich chocolate milkshake",
      price: 130,
      imageUrl: "https://images.unsplash.com/photo-1578775887804-699de7086ff9?w=400",
      category: "Beverages",
      isVeg: true,
      rating: 4.5,
    },
    {
      id: 58,
      name: "Green Tea",
      description: "Healthy green tea",
      price: 60,
      imageUrl: "https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=400",
      category: "Beverages",
      isVeg: true,
      rating: 4.1,
    },
    {
      id: 59,
      name: "Fresh Orange Juice",
      description: "Freshly squeezed orange juice",
      price: 90,
      imageUrl: "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400",
      category: "Beverages",
      isVeg: true,
      rating: 4.6,
    },
    {
      id: 60,
      name: "Iced Tea",
      description: "Chilled lemon iced tea",
      price: 80,
      imageUrl: "https://images.unsplash.com/photo-1547825407-0449f05b6a80?w=400",
      category: "Beverages",
      isVeg: true,
      rating: 4.3,
    },

    // Desserts
    {
      id: 61,
      name: "Gulab Jamun (2 pcs)",
      description: "Sweet milk dumplings in sugar syrup",
      price: 80,
      imageUrl: "https://images.unsplash.com/photo-1590301157890-4810ed352733?w=400",
      category: "Desserts",
      isVeg: true,
      rating: 4.6,
    },
    {
      id: 62,
      name: "Chocolate Brownie",
      description: "Warm chocolate brownie with ice cream",
      price: 150,
      imageUrl: "https://images.unsplash.com/photo-1680090966824-eb9e8500bc2b?w=400",
      category: "Desserts",
      isVeg: true,
      rating: 4.7,
    },
    {
      id: 63,
      name: "Rasmalai (2 pcs)",
      description: "Soft cottage cheese in sweet milk",
      price: 100,
      imageUrl: "https://images.unsplash.com/photo-1631211743410-346b61e7ec4e?w=400",
      category: "Desserts",
      isVeg: true,
      rating: 4.5,
    },
    {
      id: 64,
      name: "Ice Cream (1 scoop)",
      description: "Choice of vanilla, chocolate, or strawberry",
      price: 60,
      imageUrl: "https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=400",
      category: "Desserts",
      isVeg: true,
      rating: 4.4,
    },
    {
      id: 65,
      name: "Gajar Halwa",
      description: "Carrot pudding with nuts",
      price: 90,
      imageUrl: "https://images.unsplash.com/photo-1645177628172-a94c1f96e6db?w=400",
      category: "Desserts",
      isVeg: true,
      rating: 4.3,
    },
    {
      id: 66,
      name: "Tiramisu",
      description: "Classic Italian coffee dessert",
      price: 180,
      imageUrl: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400",
      category: "Desserts",
      isVeg: true,
      rating: 4.8,
    },
    {
      id: 67,
      name: "Chocolate Lava Cake",
      description: "Molten chocolate center",
      price: 160,
      imageUrl: "https://images.unsplash.com/photo-1624353365286-3f8d62daad51?w=400",
      category: "Desserts",
      isVeg: true,
      rating: 4.7,
    },
    {
      id: 68,
      name: "Ras Malai Cake",
      description: "Fusion of rasmalai and cake",
      price: 200,
      imageUrl: "https://images.unsplash.com/photo-1578985545062-69928b1d9587?w=400",
      category: "Desserts",
      isVeg: true,
      rating: 4.6,
    },
    {
      id: 69,
      name: "Kulfi (2 pcs)",
      description: "Traditional Indian ice cream",
      price: 70,
      imageUrl: "https://images.unsplash.com/photo-1613739118925-cfbd72332e7b?w=400",
      category: "Desserts",
      isVeg: true,
      rating: 4.5,
    },
    {
      id: 70,
      name: "Cheesecake",
      description: "Creamy New York style cheesecake",
      price: 190,
      imageUrl: "https://images.unsplash.com/photo-1524351199678-941a58a3df50?w=400",
      category: "Desserts",
      isVeg: true,
      rating: 4.8,
    },
  ];

  const categoryItems = allMenuItems.filter(item => item.category === category);
  const filteredItems = categoryItems.filter((item) => {
    if (dietFilter === "veg") return item.isVeg;
    if (dietFilter === "nonveg") return !item.isVeg;
    return true;
  });

  const updateQuantity = (itemId: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [itemId]: Math.max(0, (prev[itemId] || 0) + delta),
    }));
  };

  const handleAddToCart = (item: MenuItem) => {
    const quantity = quantities[item.id] || 1;
    
    // Set adding state for animation
    setAddingToCart(item.id);
    
    // Fire confetti
    confetti({
      particleCount: 50,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#FC8019', '#ff9a3d', '#FFD700']
    });
    
    // Wait for animation then add to cart
    setTimeout(() => {
      onAddToCart(item, quantity);
      setQuantities((prev) => ({ ...prev, [item.id]: 0 }));
      setAddingToCart(null);
    }, 800);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-5xl max-h-[90vh] p-0 flex flex-col">
        <DialogHeader className="px-6 pt-6 pb-4 border-b shrink-0 bg-white dark:bg-gray-900">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl">All {category} Items</DialogTitle>
            <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-gray-100 dark:hover:bg-gray-800">
              <X className="w-5 h-5" />
            </Button>
          </div>
        </DialogHeader>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="px-6 py-4 border-b shrink-0 bg-gray-50 dark:bg-gray-900/50"
        >
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filter:</span>
            <div className="flex gap-2 flex-wrap">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setDietFilter("all")}
                  size="sm"
                  className={dietFilter === "all" ? "bg-[#FC8019] hover:bg-[#e67315] text-white" : "bg-white hover:bg-gray-100 text-gray-700 border border-gray-300 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700"}
                >
                  All Items
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setDietFilter("veg")}
                  size="sm"
                  className={dietFilter === "veg" ? "bg-green-600 hover:bg-green-700 text-white" : "bg-white hover:bg-green-50 text-green-700 border border-green-300 dark:bg-gray-800 dark:text-green-400 dark:border-green-800"}
                >
                  🟢 Veg Only
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => setDietFilter("nonveg")}
                  size="sm"
                  className={dietFilter === "nonveg" ? "bg-red-600 hover:bg-red-700 text-white" : "bg-white hover:bg-red-50 text-red-700 border border-red-300 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"}
                >
                  🔴 Non-Veg Only
                </Button>
              </motion.div>
            </div>
          </div>
        </motion.div>

        <div className="overflow-y-auto flex-1 px-6 py-6 bg-gray-50 dark:bg-gray-950">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
            <AnimatePresence>
              {filteredItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ y: -4 }}
                  className="bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all border border-gray-200 dark:border-gray-800"
                >
                  {/* Image Section */}
                  <div className="relative h-48 w-full overflow-hidden">
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-3 left-3">
                      <Badge 
                        variant={item.isVeg ? "outline" : "destructive"} 
                        className={`${item.isVeg ? "bg-green-50 border-green-600 text-green-700 dark:bg-green-900/30 dark:border-green-500 dark:text-green-400" : "bg-red-50 dark:bg-red-900/30"} backdrop-blur-sm`}
                      >
                        {item.isVeg ? "🟢 Veg" : "🔴 Non-Veg"}
                      </Badge>
                    </div>
                    {item.rating && (
                      <div className="absolute top-3 right-3 bg-white dark:bg-gray-900 backdrop-blur-sm rounded-lg px-2 py-1 flex items-center gap-1 shadow-sm">
                        <Star className="w-3.5 h-3.5 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{item.rating}</span>
                      </div>
                    )}
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col h-[160px]">
                    <div className="flex-1">
                      <h4 className="font-medium text-base mb-1.5 line-clamp-1">{item.name}</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">{item.description}</p>
                    </div>

                    {/* Price and Add Section */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100 dark:border-gray-800">
                      <div className="flex items-baseline gap-1">
                        <span className="text-lg font-semibold text-[#FC8019]">₹{item.price}</span>
                      </div>

                      <AnimatePresence mode="wait">
                        {addingToCart === item.id ? (
                          <motion.div
                            key="adding"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            className="flex items-center gap-2 bg-green-100 dark:bg-green-900/30 px-4 py-2 rounded-lg"
                          >
                            <motion.div
                              animate={{ rotate: 360, scale: [1, 1.2, 1] }}
                              transition={{ duration: 0.6 }}
                            >
                              <Check className="w-5 h-5 text-green-600 dark:text-green-400" />
                            </motion.div>
                            <span className="text-sm font-medium text-green-600 dark:text-green-400">Added!</span>
                          </motion.div>
                        ) : quantities[item.id] > 0 ? (
                          <motion.div
                            key="quantity"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="flex items-center gap-2 bg-gradient-to-r from-orange-50 to-orange-100 dark:from-orange-900/20 dark:to-orange-900/30 rounded-xl p-1 shadow-sm"
                          >
                            <motion.button
                              whileHover={{ scale: 1.15, backgroundColor: "#FFA500" }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateQuantity(item.id, -1)}
                              className="w-8 h-8 rounded-lg bg-white dark:bg-gray-800 text-[#FC8019] flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                            >
                              <Minus className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.div
                              key={quantities[item.id]}
                              initial={{ scale: 1.3 }}
                              animate={{ scale: 1 }}
                              className="w-10 text-center font-bold text-[#FC8019]"
                            >
                              {quantities[item.id]}
                            </motion.div>
                            
                            <motion.button
                              whileHover={{ scale: 1.15 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() => updateQuantity(item.id, 1)}
                              className="w-8 h-8 rounded-lg bg-[#FC8019] text-white flex items-center justify-center shadow-sm hover:shadow-md transition-all"
                            >
                              <Plus className="w-4 h-4" />
                            </motion.button>
                            
                            <motion.div
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              <Button 
                                size="sm" 
                                onClick={() => handleAddToCart(item)} 
                                disabled={addingToCart !== null}
                                className="ml-1 bg-gradient-to-r from-[#FC8019] to-[#ff6b00] hover:from-[#e67315] hover:to-[#e65a00] text-white h-9 px-4 shadow-md hover:shadow-lg transition-all"
                              >
                                <ShoppingCart className="w-4 h-4 mr-1" />
                                Add to Cart
                              </Button>
                            </motion.div>
                          </motion.div>
                        ) : (
                          <motion.div 
                            key="initial"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            whileHover={{ scale: 1.05 }} 
                            whileTap={{ scale: 0.95 }}
                          >
                            <Button
                              size="sm"
                              onClick={() => {
                                updateQuantity(item.id, 1);
                              }}
                              className="bg-gradient-to-r from-white to-orange-50 dark:from-gray-800 dark:to-orange-900/20 hover:from-orange-50 hover:to-orange-100 dark:hover:from-orange-900/30 dark:hover:to-orange-900/40 border-2 border-[#FC8019] text-[#FC8019] h-9 px-4 font-bold shadow-sm hover:shadow-md transition-all"
                            >
                              <Plus className="w-4 h-4 mr-1" />
                              Add
                            </Button>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
