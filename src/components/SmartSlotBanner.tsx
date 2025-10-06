import { Calendar, Clock, Sparkles } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface SmartSlotBannerProps {
  onSetUpClick: () => void;
}

export function SmartSlotBanner({ onSetUpClick }: SmartSlotBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-gradient-to-r from-orange-50 to-orange-100 border border-orange-200 rounded-xl p-6 mb-8"
    >
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            repeatDelay: 3,
          }}
          className="bg-[#FC8019] rounded-full p-3"
        >
          <Sparkles className="w-6 h-6 text-white" />
        </motion.div>
        
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-[#FC8019]">New! Smart-Slot Delivery 🎯</h3>
          </div>
          <p className="text-gray-600 mb-3">
            Never miss a class again! Schedule your food delivery during your free time. 
            We'll sync with your class schedule and deliver when you're available.
          </p>
          
          <div className="flex flex-wrap gap-4">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm"
            >
              <Calendar className="w-4 h-4 text-[#FC8019]" />
              <span className="text-sm">Sync Class Schedule</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 bg-white px-3 py-2 rounded-lg shadow-sm"
            >
              <Clock className="w-4 h-4 text-[#FC8019]" />
              <span className="text-sm">Choose Free Slots</span>
            </motion.div>
          </div>
        </div>
        
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button 
            onClick={onSetUpClick}
            className="bg-[#FC8019] hover:bg-[#e67315] text-white"
          >
            Set Up Now
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}
