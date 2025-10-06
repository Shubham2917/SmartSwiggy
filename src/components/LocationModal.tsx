import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { MapPin, Search, Navigation } from "lucide-react";

interface LocationModalProps {
  open: boolean;
  onClose: () => void;
  onSelectLocation: (location: string) => void;
  currentLocation: string;
}

export function LocationModal({
  open,
  onClose,
  onSelectLocation,
  currentLocation,
}: LocationModalProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const popularLocations = [
    "NIET Campus, Greater Noida",
    "Knowledge Park II, Greater Noida",
    "Alpha 1, Greater Noida",
    "Pari Chowk, Greater Noida",
    "Beta 1, Greater Noida",
    "Gamma 1, Greater Noida",
  ];

  const filteredLocations = popularLocations.filter((location) =>
    location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSelectLocation = (location: string) => {
    onSelectLocation(location);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Delivery Location</DialogTitle>
          <DialogDescription>
            Choose your delivery address to see nearby restaurants.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 mt-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search for area, street name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <Button
            variant="outline"
            className="w-full justify-start gap-2"
            onClick={() => handleSelectLocation("Current Location (GPS)")}
          >
            <Navigation className="w-4 h-4 text-[#FC8019]" />
            Use Current Location
          </Button>

          <div>
            <h4 className="mb-3 text-gray-600">Popular Locations</h4>
            <div className="space-y-2">
              {filteredLocations.map((location) => (
                <button
                  key={location}
                  onClick={() => handleSelectLocation(location)}
                  className={`w-full text-left p-3 rounded-lg border hover:border-[#FC8019] hover:bg-orange-50 transition-all ${
                    location === currentLocation
                      ? "border-[#FC8019] bg-orange-50"
                      : "border-gray-200"
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#FC8019] mt-0.5" />
                    <div>
                      <p>{location}</p>
                      {location === currentLocation && (
                        <p className="text-xs text-[#FC8019] mt-1">Current Location</p>
                      )}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
