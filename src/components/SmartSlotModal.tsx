import { useState } from "react";
import { Calendar, Clock, CheckCircle2, BookOpen, Edit2, Plus, Trash2 } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { toast } from "sonner";

interface ScheduleSlot {
  time: string;
  activity: string;
  type: "class" | "free";
  recommended?: boolean;
}

interface SmartSlotModalProps {
  open: boolean;
  onClose: () => void;
  onConfirm?: (slot: string) => void;
}

export function SmartSlotModal({ open, onClose, onConfirm }: SmartSlotModalProps) {
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [syncEnabled, setSyncEnabled] = useState(false);
  const [editMode, setEditMode] = useState(false);
  
  const [schedule, setSchedule] = useState<ScheduleSlot[]>([
    { time: "9:00 AM - 10:30 AM", activity: "Data Structures Lecture", type: "class" },
    { time: "10:30 AM - 11:00 AM", activity: "Break", type: "free", recommended: false },
    { time: "11:00 AM - 12:30 PM", activity: "Web Development Lab", type: "class" },
    { time: "12:30 PM - 1:30 PM", activity: "Lunch Break", type: "free", recommended: true },
    { time: "1:30 PM - 3:00 PM", activity: "Database Management", type: "class" },
    { time: "3:00 PM - 3:30 PM", activity: "Tea Break", type: "free" },
    { time: "3:30 PM - 5:00 PM", activity: "Project Work", type: "class" },
  ]);

  const handleConfirm = () => {
    if (selectedSlot) {
      toast.success("Delivery slot confirmed!", {
        description: `Your order will be delivered at ${selectedSlot}`,
        duration: 3000,
      });
      onConfirm?.(selectedSlot);
      onClose();
    }
  };

  const handleToggleSlotType = (index: number) => {
    const newSchedule = [...schedule];
    newSchedule[index].type = newSchedule[index].type === "class" ? "free" : "class";
    setSchedule(newSchedule);
    toast.success(`Slot updated to ${newSchedule[index].type === "free" ? "Available" : "In Class"}`);
  };

  const handleRemoveSlot = (index: number) => {
    const newSchedule = schedule.filter((_, i) => i !== index);
    setSchedule(newSchedule);
    toast.success("Slot removed from schedule");
  };

  const handleAddSlot = () => {
    const newSlot: ScheduleSlot = {
      time: "5:00 PM - 6:00 PM",
      activity: "New Slot",
      type: "free",
    };
    setSchedule([...schedule, newSlot]);
    toast.success("New slot added");
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Smart-Slot Delivery Scheduler</DialogTitle>
          <DialogDescription>
            Schedule your food delivery during your free time by syncing with your class schedule.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#FC8019] mt-1" />
              <div className="flex-1">
                <h4 className="text-[#FC8019] mb-1">Sync Your Class Schedule</h4>
                <p className="text-sm text-gray-600 mb-3">
                  Connect your college timetable to automatically get delivery suggestions during your free time.
                </p>
                <div className="flex gap-2">
                  <Button
                    onClick={() => setSyncEnabled(!syncEnabled)}
                    variant={syncEnabled ? "default" : "outline"}
                    className={syncEnabled ? "bg-green-600 hover:bg-green-700" : ""}
                  >
                    {syncEnabled ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2" />
                        Schedule Synced
                      </>
                    ) : (
                      "Connect Schedule"
                    )}
                  </Button>
                  <Button
                    onClick={() => setEditMode(!editMode)}
                    variant="outline"
                    className="gap-2"
                  >
                    <Edit2 className="w-4 h-4" />
                    {editMode ? "Done Editing" : "Edit Schedule"}
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-[#FC8019]" />
                <h4>Today's Schedule - October 5, 2025</h4>
              </div>
              {editMode && (
                <Button
                  onClick={handleAddSlot}
                  size="sm"
                  variant="outline"
                  className="gap-2"
                >
                  <Plus className="w-4 h-4" />
                  Add Slot
                </Button>
              )}
            </div>

            <div className="space-y-2">
              {schedule.map((slot, index) => (
                <div
                  key={index}
                  onClick={() => !editMode && slot.type === "free" && setSelectedSlot(slot.time)}
                  className={`p-4 rounded-lg border-2 transition-all ${
                    editMode
                      ? "cursor-default"
                      : slot.type === "class"
                      ? "cursor-not-allowed opacity-60"
                      : "cursor-pointer"
                  } ${
                    slot.type === "class"
                      ? "bg-gray-50 border-gray-200"
                      : selectedSlot === slot.time
                      ? "border-[#FC8019] bg-orange-50"
                      : "border-green-200 bg-green-50 hover:border-green-400"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {slot.type === "class" ? (
                        <BookOpen className="w-5 h-5 text-gray-400" />
                      ) : (
                        <Clock className="w-5 h-5 text-green-600" />
                      )}
                      <div>
                        <p className="text-sm">{slot.time}</p>
                        <p className={slot.type === "class" ? "text-gray-600" : ""}>
                          {slot.activity}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {editMode && (
                        <>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleToggleSlotType(index);
                            }}
                            size="sm"
                            variant="outline"
                          >
                            {slot.type === "class" ? "Mark Free" : "Mark Busy"}
                          </Button>
                          <Button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleRemoveSlot(index);
                            }}
                            size="sm"
                            variant="ghost"
                            className="text-red-500 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </>
                      )}
                      {!editMode && (
                        <>
                          {slot.recommended && (
                            <Badge className="bg-[#FC8019] text-white">Recommended</Badge>
                          )}
                          {slot.type === "free" && (
                            <Badge variant="outline" className="border-green-600 text-green-600">
                              Available
                            </Badge>
                          )}
                          {slot.type === "class" && (
                            <Badge variant="outline" className="border-gray-400 text-gray-600">
                              In Class
                            </Badge>
                          )}
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {selectedSlot && !editMode && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
                <h4 className="text-green-800">Selected Delivery Slot</h4>
              </div>
              <p className="text-gray-600 mb-3">
                Your order will be delivered at: <strong>{selectedSlot}</strong>
              </p>
              <Button 
                onClick={handleConfirm}
                className="w-full bg-[#FC8019] hover:bg-[#e67315] text-white"
              >
                Confirm & Proceed to Cart
              </Button>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
