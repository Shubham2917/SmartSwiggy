import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Badge } from "./ui/badge";

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  filters: {
    rating: number;
    deliveryTime: number;
    priceRange: number[];
    cuisines: string[];
    offers: boolean;
  };
  onApplyFilters: (filters: any) => void;
}

export function FilterModal({ open, onClose, filters, onApplyFilters }: FilterModalProps) {
  const [localFilters, setLocalFilters] = useState(filters);

  const cuisineOptions = [
    "North Indian",
    "South Indian",
    "Chinese",
    "Italian",
    "Fast Food",
    "Biryani",
    "Desserts",
    "Beverages",
  ];

  const handleApply = () => {
    onApplyFilters(localFilters);
    onClose();
  };

  const handleReset = () => {
    setLocalFilters({
      rating: 0,
      deliveryTime: 60,
      priceRange: [0, 1000],
      cuisines: [],
      offers: false,
    });
  };

  const toggleCuisine = (cuisine: string) => {
    setLocalFilters((prev) => ({
      ...prev,
      cuisines: prev.cuisines.includes(cuisine)
        ? prev.cuisines.filter((c) => c !== cuisine)
        : [...prev.cuisines, cuisine],
    }));
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Filters</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div>
            <Label className="mb-3 block">Minimum Rating</Label>
            <div className="flex gap-2">
              {[3, 3.5, 4, 4.5].map((rating) => (
                <Badge
                  key={rating}
                  variant={localFilters.rating === rating ? "default" : "outline"}
                  className={`cursor-pointer ${
                    localFilters.rating === rating
                      ? "bg-[#FC8019] hover:bg-[#e67315]"
                      : ""
                  }`}
                  onClick={() => setLocalFilters({ ...localFilters, rating })}
                >
                  {rating}+ ⭐
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <Label className="mb-3 block">
              Max Delivery Time: {localFilters.deliveryTime} mins
            </Label>
            <Slider
              value={[localFilters.deliveryTime]}
              onValueChange={([value]) =>
                setLocalFilters({ ...localFilters, deliveryTime: value })
              }
              max={60}
              min={15}
              step={5}
              className="w-full"
            />
          </div>

          <div>
            <Label className="mb-3 block">
              Price Range: ₹{localFilters.priceRange[0]} - ₹{localFilters.priceRange[1]}
            </Label>
            <Slider
              value={localFilters.priceRange}
              onValueChange={(value) =>
                setLocalFilters({ ...localFilters, priceRange: value })
              }
              max={1000}
              min={0}
              step={50}
              className="w-full"
            />
          </div>

          <div>
            <Label className="mb-3 block">Cuisines</Label>
            <div className="grid grid-cols-2 gap-3">
              {cuisineOptions.map((cuisine) => (
                <div key={cuisine} className="flex items-center space-x-2">
                  <Checkbox
                    id={cuisine}
                    checked={localFilters.cuisines.includes(cuisine)}
                    onCheckedChange={() => toggleCuisine(cuisine)}
                  />
                  <Label htmlFor={cuisine} className="cursor-pointer">
                    {cuisine}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              id="offers"
              checked={localFilters.offers}
              onCheckedChange={(checked) =>
                setLocalFilters({ ...localFilters, offers: checked as boolean })
              }
            />
            <Label htmlFor="offers" className="cursor-pointer">
              Show only restaurants with offers
            </Label>
          </div>

          <div className="flex gap-3 pt-4 border-t">
            <Button variant="outline" onClick={handleReset} className="flex-1">
              Reset
            </Button>
            <Button
              onClick={handleApply}
              className="flex-1 bg-[#FC8019] hover:bg-[#e67315] text-white"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
