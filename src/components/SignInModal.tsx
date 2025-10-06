import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import { Phone, Mail } from "lucide-react";

interface SignInModalProps {
  open: boolean;
  onClose: () => void;
  onSignIn: (name: string) => void;
}

export function SignInModal({ open, onClose, onSignIn }: SignInModalProps) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");

  const handleSignIn = () => {
    if (name.trim()) {
      onSignIn(name);
      onClose();
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Welcome to SmartSwiggy</DialogTitle>
          <DialogDescription>
            Sign in to order food and use Smart-Slot delivery features.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="phone" className="mt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="phone">Phone</TabsTrigger>
            <TabsTrigger value="email">Email</TabsTrigger>
          </TabsList>

          <TabsContent value="phone" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <div className="flex gap-2">
                <Input
                  id="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="flex-1"
                />
              </div>
            </div>
            <Button
              onClick={handleSignIn}
              className="w-full bg-[#FC8019] hover:bg-[#e67315] text-white"
              disabled={!name.trim() || !phone.trim()}
            >
              <Phone className="w-4 h-4 mr-2" />
              Continue with Phone
            </Button>
          </TabsContent>

          <TabsContent value="email" className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name-email">Name</Label>
              <Input
                id="name-email"
                placeholder="Enter your name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <Button
              onClick={handleSignIn}
              className="w-full bg-[#FC8019] hover:bg-[#e67315] text-white"
              disabled={!name.trim() || !email.trim()}
            >
              <Mail className="w-4 h-4 mr-2" />
              Continue with Email
            </Button>
          </TabsContent>
        </Tabs>

        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white px-2 text-muted-foreground">Or</span>
          </div>
        </div>

        <p className="text-xs text-center text-gray-500">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </DialogContent>
    </Dialog>
  );
}
