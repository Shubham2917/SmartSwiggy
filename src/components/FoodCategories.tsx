import { Pizza, Coffee, Salad, IceCream, Soup, Cookie } from "lucide-react";
import { motion } from "framer-motion";

interface FoodCategoriesProps {
  selectedCategory: string | null;
  onCategoryClick: (category: string) => void;
}

export function FoodCategories({ selectedCategory, onCategoryClick }: FoodCategoriesProps) {
  const categories = [
    { name: "Pizza", icon: Pizza },
    { name: "Burgers", icon: Cookie },
    { name: "Biryani", icon: Soup },
    { name: "Chinese", icon: Salad },
    { name: "Beverages", icon: Coffee },
    { name: "Desserts", icon: IceCream },
  ];

  return (
    <div className="mb-8">
      <h2 className="mb-4">What's on your mind?</h2>
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {categories.map((category, index) => {
          const Icon = category.icon;
          const isSelected = selectedCategory === category.name;
          return (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -4 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onCategoryClick(category.name)}
              className={`flex flex-col items-center gap-2 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                isSelected
                  ? "bg-orange-50 border-[#FC8019] shadow-md"
                  : "border-gray-200 hover:bg-orange-50 hover:border-[#FC8019]"
              }`}
            >
              <motion.div
                animate={isSelected ? { rotate: [0, -10, 10, -10, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                <Icon className="w-8 h-8 text-[#FC8019]" />
              </motion.div>
              <span className="text-sm text-center">{category.name}</span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
