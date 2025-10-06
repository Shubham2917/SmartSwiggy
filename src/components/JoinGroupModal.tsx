import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Users, ArrowRight, AlertCircle, CheckCircle } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "sonner";

interface JoinGroupModalProps {
  open: boolean;
  onClose: () => void;
  onJoinGroup: (code: string) => void;
}

export function JoinGroupModal({ open, onClose, onJoinGroup }: JoinGroupModalProps) {
  const [groupCode, setGroupCode] = useState("");
  const [isValidating, setIsValidating] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleJoinGroup = () => {
    if (!groupCode.trim()) {
      toast.error("Please enter a group code");
      return;
    }

    setIsValidating(true);
    
    // Simulate validation
    setTimeout(() => {
      setIsValidating(false);
      setShowSuccess(true);
      
      // Show success animation
      setTimeout(() => {
        onJoinGroup(groupCode.toUpperCase());
        toast.success(`Joined group ${groupCode.toUpperCase()} successfully! 🎉`);
        onClose();
        setGroupCode("");
        setShowSuccess(false);
      }, 1500);
    }, 1000);
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-purple-600" />
            Join Group Order
          </DialogTitle>
          <DialogDescription>
            Enter the code shared by your friend to join their group order
          </DialogDescription>
        </DialogHeader>

        {showSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="py-12 text-center space-y-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-green-100 rounded-full flex items-center justify-center"
            >
              <CheckCircle className="w-12 h-12 text-green-600" />
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <h3 className="text-green-600 mb-2">Successfully Joined!</h3>
              <p className="text-gray-600">Group Code: <span className="font-mono text-lg text-purple-600">{groupCode}</span></p>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
          <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-purple-600 mt-0.5" />
              <div>
                <h4 className="text-purple-900 text-sm mb-1">How to Join</h4>
                <ol className="text-xs text-purple-800 space-y-1 list-decimal list-inside">
                  <li>Get the group code from your friend</li>
                  <li>Enter it below and click Join</li>
                  <li>Browse menu and add your items</li>
                  <li>Pay your share at checkout</li>
                </ol>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <label>Group Code</label>
            <Input
              placeholder="Enter 6-digit code (e.g., ABC123)"
              value={groupCode}
              onChange={(e) => setGroupCode(e.target.value.toUpperCase())}
              maxLength={6}
              className="text-center text-2xl tracking-widest font-mono"
            />
            <p className="text-xs text-gray-500 text-center">
              The code is case-insensitive
            </p>
          </div>

          <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg p-4">
            <h4 className="text-sm mb-2">What happens next?</h4>
            <div className="space-y-2 text-sm text-gray-700">
              <p>✓ You'll see the group's active order</p>
              <p>✓ Browse and add items you want</p>
              <p>✓ See what others ordered</p>
              <p>✓ Bill splits automatically</p>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              className="flex-1"
            >
              Cancel
            </Button>
            <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                onClick={handleJoinGroup}
                disabled={isValidating || !groupCode.trim()}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white"
              >
                {isValidating ? (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"
                    />
                    Joining...
                  </>
                ) : (
                  <>
                    Join Group
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-500 mb-2">Don't have a code?</p>
            <Button
              variant="link"
              className="text-purple-600 hover:text-purple-700"
              onClick={() => {
                onClose();
                toast.info("Ask your friend to share their group code!");
              }}
            >
              Learn how to get one
            </Button>
          </div>
        </motion.div>
        )}
      </DialogContent>
    </Dialog>
  );
}
