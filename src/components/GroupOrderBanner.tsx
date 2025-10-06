import { Users, Sparkles, ArrowRight } from "lucide-react";
import { Button } from "./ui/button";
import { motion } from "framer-motion";

interface GroupOrderBannerProps {
  onStartGroupOrder: () => void;
}

export function GroupOrderBanner({ onStartGroupOrder }: GroupOrderBannerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 rounded-xl p-6 mb-8 relative overflow-hidden"
    >
      {/* Animated background elements */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"
      />
      <motion.div
        animate={{
          scale: [1.2, 1, 1.2],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear",
        }}
        className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full blur-3xl"
      />

      <div className="relative z-10 flex flex-col md:flex-row items-start md:items-center gap-4">
        <motion.div
          animate={{
            rotate: [0, 10, -10, 10, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatDelay: 2,
          }}
          className="bg-white rounded-full p-3 shadow-lg"
        >
          <Users className="w-6 h-6 text-purple-600" />
        </motion.div>

        <div className="flex-1 text-white">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <h3 className="text-white">🎉 New! Group Order & Split Payment</h3>
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Badge className="bg-white/20 text-white border-white/40">
                <Sparkles className="w-3 h-3 mr-1" />
                Popular
              </Badge>
            </motion.div>
          </div>
          <p className="text-white/90 mb-3">
            Ordering with friends? No more payment hassles! Create a group, everyone orders
            together, and split the bill automatically. Save time, save money on delivery! 🤝
          </p>

          <div className="flex flex-wrap gap-3">
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg"
            >
              <span className="text-2xl">💰</span>
              <span className="text-sm text-white">Easy Split</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg"
            >
              <span className="text-2xl">👥</span>
              <span className="text-sm text-white">Order Together</span>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-3 py-2 rounded-lg"
            >
              <span className="text-2xl">🚀</span>
              <span className="text-sm text-white">Save Delivery Fee</span>
            </motion.div>
          </div>
        </div>

        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Button
            onClick={onStartGroupOrder}
            className="bg-white text-purple-600 hover:bg-white/90 shadow-lg"
            size="lg"
          >
            <Users className="w-4 h-4 mr-2" />
            Start Group Order
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs border ${className}`}>
      {children}
    </span>
  );
}