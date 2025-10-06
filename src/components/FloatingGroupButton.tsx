import { Users } from "lucide-react";
import { motion } from "framer-motion";

interface FloatingGroupButtonProps {
  onClick: () => void;
}

export function FloatingGroupButton({ onClick }: FloatingGroupButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      whileHover={{ scale: 1.1, rotate: 5 }}
      whileTap={{ scale: 0.9 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="fixed bottom-8 right-8 z-40 bg-gradient-to-r from-purple-500 to-pink-500 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/50 group"
    >
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute inset-0 bg-purple-400 rounded-full opacity-75 blur-md"
      />
      
      <div className="relative flex items-center gap-2">
        <Users className="w-6 h-6" />
        <motion.span
          initial={{ width: 0, opacity: 0 }}
          whileHover={{ width: "auto", opacity: 1 }}
          className="overflow-hidden whitespace-nowrap"
        >
          Group Order
        </motion.span>
      </div>

      {/* Pulse animation */}
      <motion.div
        animate={{
          scale: [1, 1.5, 1],
          opacity: [0.5, 0, 0.5],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeOut",
        }}
        className="absolute inset-0 rounded-full border-4 border-purple-300"
      />
    </motion.button>
  );
}
