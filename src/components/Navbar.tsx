
import React, { useState, useEffect } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState<"hiring" | "freelancer">("hiring");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        <div className="flex items-center">
          <a href="/" className="text-2xl font-display font-bold text-primary">
            Freeness
          </a>
        </div>

        <div className="hidden md:flex items-center space-x-4">
          <div className="bg-secondary rounded-full p-1 flex">
            <button
              onClick={() => setActiveTab("hiring")}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300 text-sm font-medium",
                activeTab === "hiring"
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Hiring
            </button>
            <button
              onClick={() => setActiveTab("freelancer")}
              className={cn(
                "px-5 py-2 rounded-full transition-all duration-300 text-sm font-medium",
                activeTab === "freelancer"
                  ? "bg-white text-primary shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              Freelancer
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-1">
          <button className="btn-outline">Login</button>
          <button className="btn-primary">Sign Up</button>
        </div>

        <button
          className="md:hidden text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      <div
        className={cn(
          "md:hidden fixed inset-0 z-50 bg-white transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center p-4 border-b">
            <a href="/" className="text-2xl font-display font-bold text-primary">
              Freeness
            </a>
            <button
              className="text-foreground"
              onClick={() => setIsOpen(false)}
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col p-4 space-y-4">
            <div className="bg-secondary rounded-full p-1 flex self-center">
              <button
                onClick={() => setActiveTab("hiring")}
                className={cn(
                  "px-5 py-2 rounded-full transition-all duration-300 text-sm font-medium",
                  activeTab === "hiring"
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Hiring
              </button>
              <button
                onClick={() => setActiveTab("freelancer")}
                className={cn(
                  "px-5 py-2 rounded-full transition-all duration-300 text-sm font-medium",
                  activeTab === "freelancer"
                    ? "bg-white text-primary shadow-sm"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                Freelancer
              </button>
            </div>

            <div className="space-y-2 mt-4">
              <a
                href="#"
                className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md"
              >
                Find Talent
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md"
              >
                Popular Services
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md"
              >
                For Clients
              </a>
              <a
                href="#"
                className="block px-4 py-2 text-foreground hover:bg-secondary rounded-md"
              >
                For Freelancers
              </a>
            </div>

            <div className="flex flex-col space-y-2 mt-auto">
              <button className="btn-outline w-full">Login</button>
              <button className="btn-primary w-full">Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
