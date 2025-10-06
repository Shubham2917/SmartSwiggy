import { Star, Clock } from "lucide-react";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion } from "framer-motion";

interface RestaurantCardProps {
  name: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  price: string;
  imageUrl: string;
  offer?: string;
  distance?: string;
  onClick?: () => void;
}

export function RestaurantCard({
  name,
  cuisine,
  rating,
  deliveryTime,
  price,
  imageUrl,
  offer,
  distance,
  onClick
}: RestaurantCardProps) {
  return (
    <motion.div
      onClick={onClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ 
        scale: 1.03, 
        y: -8,
        boxShadow: "0 20px 40px rgba(0,0,0,0.15)"
      }}
      whileTap={{ scale: 0.98 }}
      transition={{ 
        type: "spring",
        stiffness: 300,
        damping: 20
      }}
      className="group cursor-pointer rounded-xl overflow-hidden border border-gray-200 bg-white"
    >
      <div className="relative h-48 overflow-hidden">
        <motion.div
          whileHover={{ scale: 1.1 }}
          transition={{ duration: 0.4 }}
        >
          <ImageWithFallback
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
        </motion.div>
        {offer && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4"
          >
            <p className="text-white">{offer}</p>
          </motion.div>
        )}
      </div>
      
      <div className="p-4">
        <h3>{name}</h3>
        <p className="text-gray-600 mb-2">{cuisine}</p>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <motion.div
              whileHover={{ scale: 1.1 }}
              className="flex items-center gap-1 bg-green-600 text-white px-2 py-1 rounded"
            >
              <Star className="w-3 h-3 fill-white" />
              <span className="text-sm">{rating}</span>
            </motion.div>
            
            <div className="flex items-center gap-1 text-gray-600">
              <Clock className="w-4 h-4" />
              <span className="text-sm">{deliveryTime}</span>
            </div>
          </div>
          
          <p className="text-gray-600 text-sm">{price}</p>
        </div>
        
        {distance && (
          <p className="text-gray-500 text-sm mt-2">{distance}</p>
        )}
      </div>
    </motion.div>
  );
}
