import { motion } from "framer-motion";
import { Users, Share2, ShoppingCart, DollarSign } from "lucide-react";

export function GroupOrderGuide() {
  const steps = [
    {
      icon: Users,
      title: "Create Group",
      description: "Start a group order and get a unique code",
      color: "from-purple-500 to-purple-600",
    },
    {
      icon: Share2,
      title: "Share Code",
      description: "Send code to friends via WhatsApp or SMS",
      color: "from-pink-500 to-pink-600",
    },
    {
      icon: ShoppingCart,
      title: "Order Together",
      description: "Everyone adds items to the shared cart",
      color: "from-orange-500 to-orange-600",
    },
    {
      icon: DollarSign,
      title: "Split & Pay",
      description: "Auto-split bill, everyone pays their share",
      color: "from-green-500 to-green-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {steps.map((step, index) => {
        const Icon = step.icon;
        return (
          <motion.div
            key={step.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.05, y: -5 }}
            className="relative bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all cursor-pointer overflow-hidden group"
          >
            {/* Background gradient on hover */}
            <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-10 transition-opacity`} />
            
            {/* Step number */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-600">
              {index + 1}
            </div>

            {/* Icon */}
            <motion.div
              whileHover={{ rotate: [0, -10, 10, -10, 0] }}
              transition={{ duration: 0.5 }}
              className={`w-12 h-12 rounded-lg bg-gradient-to-br ${step.color} flex items-center justify-center mb-4`}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>

            {/* Content */}
            <h4 className="mb-2">{step.title}</h4>
            <p className="text-sm text-gray-600">{step.description}</p>

            {/* Arrow indicator on hover */}
            {index < steps.length - 1 && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                whileHover={{ opacity: 1, x: 0 }}
                className="hidden lg:block absolute -right-2 top-1/2 -translate-y-1/2 text-gray-300"
              >
                →
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
