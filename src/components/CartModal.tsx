import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Minus, Plus, Trash2, ShoppingBag, Sparkles } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { motion, AnimatePresence } from "framer-motion";

interface CartItem {
  id: number;
  name: string;
  restaurant: string;
  price: number;
  quantity: number;
  imageUrl: string;
}

interface CartModalProps {
  open: boolean;
  onClose: () => void;
  items: CartItem[];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onCheckout: () => void;
}

export function CartModal({
  open,
  onClose,
  items,
  onUpdateQuantity,
  onRemove,
  onCheckout,
}: CartModalProps) {
  const [celebrating, setCelebrating] = useState(false);
  
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const deliveryFee = 40;
  const gst = Math.round(subtotal * 0.05);
  const total = subtotal + deliveryFee + gst;

  const handleCheckout = () => {
    setCelebrating(true);
    setTimeout(() => {
      setCelebrating(false);
      onCheckout();
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
        <AnimatePresence>
          {celebrating && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: [0, 1.2, 1] }}
                exit={{ scale: 0 }}
                className="bg-gradient-to-r from-[#FC8019] to-[#ff9a3d] rounded-2xl p-12 text-center"
              >
                <motion.div
                  animate={{ 
                    rotate: [0, 360],
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    ease: "linear"
                  }}
                  className="text-6xl mb-4"
                >
                  🎉
                </motion.div>
                <h2 className="text-white mb-2">Order Confirmed!</h2>
                <p className="text-white/90">Proceeding to slot selection...</p>
                <div className="flex justify-center gap-3 mt-6">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ y: 0 }}
                      animate={{ 
                        y: [-20, 0],
                        rotate: [0, 180, 360]
                      }}
                      transition={{ 
                        duration: 0.6,
                        repeat: Infinity,
                        delay: i * 0.1
                      }}
                      className="text-2xl"
                    >
                      {['🎊', '✨', '🎉', '🌟', '💫'][i]}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            Your Cart
          </DialogTitle>
          <DialogDescription>
            Review your items and proceed to checkout.
          </DialogDescription>
        </DialogHeader>

        {items.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">Your cart is empty</p>
            <p className="text-sm text-gray-400 mt-2">Add some delicious items!</p>
          </motion.div>
        ) : (
          <>
            <div className="space-y-4 max-h-96 overflow-y-auto">
              <AnimatePresence>
                {items.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ scale: 1.02 }}
                    className="flex gap-4 p-4 border rounded-lg"
                  >
                    <ImageWithFallback
                      src={item.imageUrl}
                      alt={item.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="mb-1">{item.name}</h4>
                      <p className="text-sm text-gray-600 mb-2">{item.restaurant}</p>
                      <div className="flex items-center justify-between">
                        <p className="text-[#FC8019]">₹{item.price}</p>
                        <div className="flex items-center gap-2">
                          <div className="flex items-center gap-1 border rounded-lg">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                              className="h-7 w-7 p-0"
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="w-6 text-center text-sm">{item.quantity}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                              className="h-7 w-7 p-0"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => onRemove(item.id)}
                              className="h-7 w-7 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </motion.div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="border-t pt-4 space-y-2"
            >
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Delivery Fee</span>
                <span>₹{deliveryFee}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>GST (5%)</span>
                <span>₹{gst}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Total</span>
                <span className="text-[#FC8019]">₹{total}</span>
              </div>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Button
                onClick={handleCheckout}
                className="w-full bg-[#FC8019] hover:bg-[#e67315] text-white gap-2"
                disabled={celebrating}
              >
                {celebrating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                    >
                      <Sparkles className="w-4 h-4" />
                    </motion.div>
                    Processing...
                  </>
                ) : (
                  <>
                    Proceed to Checkout - ₹{total}
                  </>
                )}
              </Button>
            </motion.div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
}
