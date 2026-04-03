import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, X, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [browseOpen, setBrowseOpen] = useState(false);

  const browseCategories = [
    { label: "Religion", items: ["Hindu", "Muslim", "Christian", "Sikh", "Jain", "Buddhist"] },
    { label: "City", items: ["Hyderabad", "Mumbai", "Delhi", "Bangalore", "Chennai", "Kolkata"] },
    { label: "Caste", items: ["Brahmin", "Reddy", "Kamma", "Kapu", "Naidu", "Yadav"] },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/" className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-gradient-hero flex items-center justify-center">
              <Heart className="w-5 h-5 text-primary-foreground fill-current" />
            </div>
            <div>
              <span className="text-lg font-heading font-bold text-foreground">Vivah</span>
              <span className="text-lg font-heading font-bold text-crimson">Matrimony</span>
            </div>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            <a href="/auth" className="px-4 py-2 text-sm font-medium text-foreground hover:text-crimson transition-colors">Register</a>
            <a href="/search" className="px-4 py-2 text-sm font-medium text-foreground hover:text-crimson transition-colors">Search</a>
            
            <div className="relative" onMouseEnter={() => setBrowseOpen(true)} onMouseLeave={() => setBrowseOpen(false)}>
              <button className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-foreground hover:text-crimson transition-colors">
                Browse Profiles <ChevronDown className="w-3 h-3" />
              </button>
              <AnimatePresence>
                {browseOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 8 }}
                    className="absolute top-full left-0 bg-card rounded-lg shadow-elevated border border-border p-6 min-w-[480px]"
                  >
                    <div className="grid grid-cols-3 gap-6">
                      {browseCategories.map((cat) => (
                        <div key={cat.label}>
                          <h4 className="font-heading font-semibold text-sm text-crimson mb-2">{cat.label}</h4>
                          <ul className="space-y-1">
                            {cat.items.map((item) => (
                              <li key={item}>
                                <a href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">{item}</a>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <a href="#" className="px-4 py-2 text-sm font-medium text-foreground hover:text-crimson transition-colors">Services</a>
          </div>

          {/* CTA */}
          <div className="hidden md:flex items-center gap-3">
            <Button variant="ghost" className="text-foreground hover:text-crimson">Login</Button>
            <Button className="bg-gradient-hero text-primary-foreground hover:opacity-90 transition-opacity">Register Free</Button>
          </div>

          {/* Mobile toggle */}
          <button className="md:hidden p-2 text-foreground" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="md:hidden overflow-hidden border-t border-border"
            >
              <div className="py-4 space-y-2">
                <a href="#" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md">Register</a>
                <a href="#" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md">Search</a>
                <a href="#" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md">Browse Profiles</a>
                <a href="#" className="block px-4 py-2 text-sm font-medium text-foreground hover:bg-muted rounded-md">Services</a>
                <div className="pt-2 px-4 space-y-2">
                  <Button variant="outline" className="w-full">Login</Button>
                  <Button className="w-full bg-gradient-hero text-primary-foreground">Register Free</Button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
};

export default Navbar;
