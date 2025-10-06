import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input as CustomInput } from "./ui/input";
import { Badge } from "./ui/badge";
import { Users, Copy, Check, UserPlus, Share2, DollarSign, Trash2, Crown, Sparkles, Edit2, Save, X as XIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import { GroupOrderGuide } from "./GroupOrderGuide";
import { Input } from "./ui/input";

interface GroupMember {
  id: string;
  name: string;
  avatar: string;
  isHost: boolean;
  items: Array<{
    id: number;
    name: string;
    price: number;
    quantity: number;
  }>;
  totalAmount: number;
}

interface GroupOrderModalProps {
  open: boolean;
  onClose: () => void;
  onCreateGroup: (groupCode: string) => void;
  currentUser: string | null;
}

export function GroupOrderModal({ open, onClose, onCreateGroup, currentUser }: GroupOrderModalProps) {
  const [step, setStep] = useState<"create" | "active" | "split" | "sending">("create");
  const [groupCode, setGroupCode] = useState("");
  const [copied, setCopied] = useState(false);
  const [groupName, setGroupName] = useState("");
  const [splitMethod, setSplitMethod] = useState<"equal" | "byitem" | "custom">("equal");
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState("");
  const [editingAmount, setEditingAmount] = useState("");
  const [sendingToMember, setSendingToMember] = useState<string | null>(null);
  
  // Mock group members for demo
  const [groupMembers, setGroupMembers] = useState<GroupMember[]>([
    {
      id: "1",
      name: currentUser || "You",
      avatar: "👤",
      isHost: true,
      items: [
        { id: 1, name: "Chicken Biryani", price: 280, quantity: 1 },
        { id: 2, name: "Cold Coffee", price: 120, quantity: 1 }
      ],
      totalAmount: 400
    },
    {
      id: "2",
      name: "Rahul",
      avatar: "👨",
      isHost: false,
      items: [
        { id: 3, name: "Margherita Pizza", price: 299, quantity: 1 }
      ],
      totalAmount: 299
    },
    {
      id: "3",
      name: "Priya",
      avatar: "👩",
      isHost: false,
      items: [
        { id: 4, name: "Veg Burger", price: 149, quantity: 2 }
      ],
      totalAmount: 298
    }
  ]);

  const totalAmount = groupMembers.reduce((sum, member) => sum + member.totalAmount, 0);
  const deliveryFee = 40;
  const gst = Math.round(totalAmount * 0.05);
  const grandTotal = totalAmount + deliveryFee + gst;

  const handleCreateGroup = () => {
    const code = Math.random().toString(36).substring(2, 8).toUpperCase();
    setGroupCode(code);
    setStep("active");
    onCreateGroup(code);
    toast.success("Group order created! Share the code with friends 🎉");
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(groupCode);
    setCopied(true);
    toast.success("Code copied to clipboard!");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleProceedToSplit = () => {
    setStep("split");
  };

  const calculateSplitAmounts = () => {
    const perPerson = (grandTotal / groupMembers.length).toFixed(2);
    
    switch (splitMethod) {
      case "equal":
        return groupMembers.map(member => ({
          ...member,
          payAmount: perPerson
        }));
      
      case "byitem":
        const itemTotal = totalAmount;
        const sharedCosts = deliveryFee + gst;
        const sharedPerPerson = sharedCosts / groupMembers.length;
        
        return groupMembers.map(member => ({
          ...member,
          payAmount: (member.totalAmount + sharedPerPerson).toFixed(2)
        }));
      
      case "custom":
        return groupMembers.map(member => ({
          ...member,
          payAmount: perPerson
        }));
    }
  };

  const splitAmounts = calculateSplitAmounts();

  const startEditing = (member: any) => {
    setEditingMemberId(member.id);
    setEditingName(member.name);
    setEditingAmount(member.payAmount);
  };

  const saveEdit = () => {
    const memberIndex = groupMembers.findIndex(m => m.id === editingMemberId);
    if (memberIndex !== -1) {
      const updatedMembers = [...groupMembers];
      updatedMembers[memberIndex] = {
        ...updatedMembers[memberIndex],
        name: editingName
      };
      setGroupMembers(updatedMembers);
      toast.success("Member details updated!");
    }
    setEditingMemberId(null);
  };

  const cancelEdit = () => {
    setEditingMemberId(null);
    setEditingName("");
    setEditingAmount("");
  };

  const removeMember = (memberId: string) => {
    if (groupMembers.length <= 1) {
      toast.error("Cannot remove the last member!");
      return;
    }
    const member = groupMembers.find(m => m.id === memberId);
    if (member?.isHost) {
      toast.error("Cannot remove the host!");
      return;
    }
    setGroupMembers(groupMembers.filter(m => m.id !== memberId));
    toast.success("Member removed from group");
  };

  const addNewMember = () => {
    const newId = (groupMembers.length + 1).toString();
    const newMember: GroupMember = {
      id: newId,
      name: `Guest ${newId}`,
      avatar: "👤",
      isHost: false,
      items: [],
      totalAmount: 0
    };
    setGroupMembers([...groupMembers, newMember]);
    toast.success("New member added! Click to edit details.");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Users className="w-5 h-5 text-[#FC8019]" />
            {step === "create" && "Create Group Order"}
            {step === "active" && "Group Order Active"}
            {step === "split" && "Split Payment"}
          </DialogTitle>
          <DialogDescription>
            {step === "create" && "Order together with friends and split the bill easily!"}
            {step === "active" && "Invite friends to add their items to the group order"}
            {step === "split" && "Choose how to split the total bill among group members"}
          </DialogDescription>
        </DialogHeader>

        <AnimatePresence mode="wait">
          {step === "create" && (
            <motion.div
              key="create"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-purple-50 via-pink-50 to-orange-50 border-2 border-purple-200 rounded-xl p-6">
                <div className="flex items-start gap-4 mb-4">
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-full p-3"
                  >
                    <Sparkles className="w-6 h-6 text-white" />
                  </motion.div>
                  <div className="flex-1">
                    <h3 className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">Perfect for Campus Groups!</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm text-gray-700">
                      <p>✅ No money hassles</p>
                      <p>✅ Auto bill split</p>
                      <p>✅ Save delivery fee</p>
                      <p>✅ Order together</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block mb-2">Group Name (Optional)</label>
                  <Input
                    placeholder="e.g., Study Group Lunch, Hostel Gang"
                    value={groupName}
                    onChange={(e) => setGroupName(e.target.value)}
                  />
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h4 className="text-blue-900 mb-2">How it works:</h4>
                  <ol className="text-sm text-blue-800 space-y-1 list-decimal list-inside">
                    <li>You create the group and get a unique code</li>
                    <li>Share code with friends via WhatsApp/SMS</li>
                    <li>Everyone adds their items to the group cart</li>
                    <li>Choose how to split the bill at checkout</li>
                    <li>Pay your share via UPI/Card</li>
                  </ol>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleCreateGroup}
                  className="w-full bg-[#FC8019] hover:bg-[#e67315] text-white"
                  size="lg"
                >
                  <UserPlus className="w-4 h-4 mr-2" />
                  Create Group Order
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === "active" && (
            <motion.div
              key="active"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div className="bg-gradient-to-r from-green-50 to-green-100 border-2 border-green-300 rounded-xl p-6">
                <div className="text-center mb-4">
                  <h3 className="text-green-900 mb-2">Group Code</h3>
                  <div className="flex items-center justify-center gap-3">
                    <motion.div
                      animate={{ scale: [1, 1.05, 1] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="bg-white px-6 py-3 rounded-lg border-2 border-green-400"
                    >
                      <span className="text-3xl tracking-wider font-mono text-green-900">
                        {groupCode}
                      </span>
                    </motion.div>
                    <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                      <Button
                        variant="outline"
                        size="icon"
                        onClick={handleCopyCode}
                        className="border-green-400 hover:bg-green-50"
                      >
                        {copied ? (
                          <Check className="w-4 h-4 text-green-600" />
                        ) : (
                          <Copy className="w-4 h-4 text-green-600" />
                        )}
                      </Button>
                    </motion.div>
                  </div>
                  <p className="text-sm text-green-700 mt-3">
                    Share this code with friends to join
                  </p>
                </div>

                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1 border-green-400 text-green-700 hover:bg-green-50"
                    onClick={() => {
                      toast.success("Opening WhatsApp...");
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    className="flex-1 border-green-400 text-green-700 hover:bg-green-50"
                    onClick={() => {
                      toast.success("Opening Messages...");
                    }}
                  >
                    <Share2 className="w-4 h-4 mr-2" />
                    SMS
                  </Button>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4>Group Members ({groupMembers.length})</h4>
                  <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></span>
                    Live
                  </Badge>
                </div>

                <div className="space-y-3">
                  <AnimatePresence>
                    {groupMembers.map((member, index) => (
                      <motion.div
                        key={member.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <motion.div
                              whileHover={{ scale: 1.1, rotate: 10 }}
                              className="text-3xl"
                            >
                              {member.avatar}
                            </motion.div>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{member.name}</span>
                                {member.isHost && (
                                  <Badge className="bg-[#FC8019] text-white">
                                    <Crown className="w-3 h-3 mr-1" />
                                    Host
                                  </Badge>
                                )}
                              </div>
                              <p className="text-sm text-gray-600">
                                {member.items.length} item(s)
                              </p>
                            </div>
                          </div>
                          <p className="text-[#FC8019]">₹{member.totalAmount}</p>
                        </div>

                        <div className="space-y-1 bg-gray-50 rounded p-2">
                          {member.items.map((item) => (
                            <div
                              key={item.id}
                              className="flex justify-between text-sm"
                            >
                              <span className="text-gray-700">
                                {item.quantity}x {item.name}
                              </span>
                              <span className="text-gray-900">₹{item.price * item.quantity}</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Items Total</span>
                  <span>₹{totalAmount}</span>
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
                  <span>Grand Total</span>
                  <span className="text-[#FC8019]">₹{grandTotal}</span>
                </div>
              </div>

              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button
                  onClick={handleProceedToSplit}
                  className="w-full bg-[#FC8019] hover:bg-[#e67315] text-white"
                  size="lg"
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  Proceed to Split Payment
                </Button>
              </motion.div>
            </motion.div>
          )}

          {step === "split" && (
            <motion.div
              key="split"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="space-y-6"
            >
              <div>
                <h4 className="mb-4">Choose Split Method</h4>
                <div className="grid grid-cols-1 gap-3">
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSplitMethod("equal")}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      splitMethod === "equal"
                        ? "border-[#FC8019] bg-orange-50"
                        : "border-gray-200 hover:border-orange-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="text-[#FC8019] mb-1">Equal Split</h5>
                        <p className="text-sm text-gray-600">
                          Divide total amount equally among all members
                        </p>
                        <p className="text-sm mt-2">
                          ₹{(grandTotal / groupMembers.length).toFixed(2)} per person
                        </p>
                      </div>
                      {splitMethod === "equal" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-[#FC8019] rounded-full flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSplitMethod("byitem")}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      splitMethod === "byitem"
                        ? "border-[#FC8019] bg-orange-50"
                        : "border-gray-200 hover:border-orange-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="text-[#FC8019] mb-1">Split by Items</h5>
                        <p className="text-sm text-gray-600">
                          Pay for your items + share delivery & GST equally
                        </p>
                        <p className="text-sm text-green-600 mt-2">✓ Most Fair</p>
                      </div>
                      {splitMethod === "byitem" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-[#FC8019] rounded-full flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>

                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setSplitMethod("custom")}
                    className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                      splitMethod === "custom"
                        ? "border-[#FC8019] bg-orange-50"
                        : "border-gray-200 hover:border-orange-200"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h5 className="text-[#FC8019] mb-1">Custom Split</h5>
                        <p className="text-sm text-gray-600">
                          Manually adjust each person's share
                        </p>
                      </div>
                      {splitMethod === "custom" && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-6 h-6 bg-[#FC8019] rounded-full flex items-center justify-center"
                        >
                          <Check className="w-4 h-4 text-white" />
                        </motion.div>
                      )}
                    </div>
                  </motion.div>
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-4">
                  <h4>Payment Breakdown</h4>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={addNewMember}
                      className="border-[#FC8019] text-[#FC8019] hover:bg-orange-50"
                    >
                      <UserPlus className="w-4 h-4 mr-1" />
                      Add Member
                    </Button>
                  </motion.div>
                </div>
                <div className="space-y-3">
                  {splitAmounts.map((member, index) => (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="flex items-center justify-between p-4 bg-white border rounded-lg group hover:shadow-md transition-all"
                    >
                      <div className="flex items-center gap-3 flex-1">
                        <span className="text-2xl">{member.avatar}</span>
                        {editingMemberId === member.id ? (
                          <div className="flex-1 flex items-center gap-2">
                            <Input
                              value={editingName}
                              onChange={(e) => setEditingName(e.target.value)}
                              className="max-w-[150px]"
                              placeholder="Name"
                            />
                            <Input
                              value={editingAmount}
                              onChange={(e) => setEditingAmount(e.target.value)}
                              className="max-w-[100px]"
                              placeholder="Amount"
                              type="number"
                              disabled={splitMethod !== "custom"}
                            />
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={saveEdit}
                              className="p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200"
                            >
                              <Save className="w-4 h-4" />
                            </motion.button>
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={cancelEdit}
                              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200"
                            >
                              <XIcon className="w-4 h-4" />
                            </motion.button>
                          </div>
                        ) : (
                          <div className="flex-1">
                            <p className="font-medium">{member.name}</p>
                            {splitMethod === "byitem" && (
                              <p className="text-xs text-gray-500">
                                Items: ₹{member.totalAmount} + Shared: ₹
                                {((deliveryFee + gst) / groupMembers.length).toFixed(2)}
                              </p>
                            )}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-lg text-[#FC8019]">
                            ₹{member.payAmount}
                          </p>
                          {member.isHost && (
                            <Badge className="bg-blue-50 text-blue-700 text-xs">
                              Will collect
                            </Badge>
                          )}
                        </div>
                        {editingMemberId !== member.id && (
                          <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                            <motion.button
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => startEditing(member)}
                              className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200"
                            >
                              <Edit2 className="w-4 h-4" />
                            </motion.button>
                            {!member.isHost && (
                              <motion.button
                                whileHover={{ scale: 1.1 }}
                                whileTap={{ scale: 0.9 }}
                                onClick={() => removeMember(member.id)}
                                className="p-2 rounded-full bg-red-100 text-red-600 hover:bg-red-200"
                              >
                                <Trash2 className="w-4 h-4" />
                              </motion.button>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <p className="text-sm text-green-800">
                  💡 <strong>Payment Flow:</strong> Each member will receive a payment request
                  on their SmartSwiggy app. Once everyone pays their share, the order will be
                  placed automatically!
                </p>
              </div>

              <div className="flex gap-3">
                <Button
                  variant="outline"
                  onClick={() => setStep("active")}
                  className="flex-1"
                >
                  Back
                </Button>
                <motion.div className="flex-1" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  <Button
                    onClick={() => {
                      setStep("sending");
                      // Simulate sending to each member with delay
                      groupMembers.forEach((member, index) => {
                        setTimeout(() => {
                          setSendingToMember(member.id);
                          toast.success(`Payment request sent to ${member.name}! 💸`);
                        }, index * 800);
                      });
                      
                      // Final confirmation after all sent
                      setTimeout(() => {
                        setSendingToMember(null);
                        toast.success("All payment requests sent successfully! 🎉", {
                          duration: 3000,
                        });
                        setTimeout(() => {
                          onClose();
                        }, 2000);
                      }, groupMembers.length * 800 + 1000);
                    }}
                    className="w-full bg-[#FC8019] hover:bg-[#e67315] text-white"
                  >
                    Send Payment Requests
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {step === "sending" && (
            <motion.div
              key="sending"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="space-y-6 py-8"
            >
              <div className="text-center">
                <motion.div
                  animate={{ 
                    rotate: 360,
                    scale: [1, 1.2, 1]
                  }}
                  transition={{ 
                    rotate: { duration: 2, repeat: Infinity, ease: "linear" },
                    scale: { duration: 1, repeat: Infinity }
                  }}
                  className="w-20 h-20 mx-auto mb-6 bg-gradient-to-r from-[#FC8019] to-orange-600 rounded-full flex items-center justify-center"
                >
                  <DollarSign className="w-10 h-10 text-white" />
                </motion.div>
                <h3 className="text-[#FC8019] mb-2">Sending Payment Requests</h3>
                <p className="text-gray-600 text-sm mb-6">
                  Notifying all group members...
                </p>
              </div>

              <div className="space-y-3">
                {groupMembers.map((member, index) => {
                  const isSent = sendingToMember && groupMembers.findIndex(m => m.id === member.id) <= groupMembers.findIndex(m => m.id === sendingToMember);
                  const isCurrent = sendingToMember === member.id;
                  
                  return (
                    <motion.div
                      key={member.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className={`flex items-center justify-between p-4 rounded-lg border-2 transition-all ${
                        isCurrent ? "border-[#FC8019] bg-orange-50" : 
                        isSent ? "border-green-300 bg-green-50" : 
                        "border-gray-200 bg-white"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-2xl">{member.avatar}</span>
                        <div>
                          <p className="font-medium">{member.name}</p>
                          <p className="text-sm text-gray-600">
                            ₹{splitAmounts.find(m => m.id === member.id)?.payAmount}
                          </p>
                        </div>
                      </div>
                      <div>
                        {isSent ? (
                          <motion.div
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center"
                          >
                            <Check className="w-5 h-5 text-white" />
                          </motion.div>
                        ) : isCurrent ? (
                          <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                            className="w-8 h-8 border-4 border-[#FC8019] border-t-transparent rounded-full"
                          />
                        ) : (
                          <div className="w-8 h-8 border-2 border-gray-300 rounded-full" />
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center"
              >
                <p className="text-sm text-blue-800">
                  📱 Members will receive notifications on their SmartSwiggy app
                </p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </DialogContent>
    </Dialog>
  );
}