import React, { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    setMounted(true);
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      document.documentElement.classList.add("dark");
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.documentElement.classList.toggle("dark");
    toast({
      title: `${newTheme === "dark" ? "Dark" : "Light"} mode activated`,
      duration: 2000,
    });
  };

  const navLinkClass = "hover-underline text-sm font-medium cursor-pointer";

  return (
    <header className="sticky top-0 w-full px-4 sm:px-6 py-4 flex items-center justify-between bg-[#FFF8F0]/80 dark:bg-[#0B0B0F]/80 backdrop-blur-md z-50 transition-colors duration-300 animate-fade-in">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <img
          src="https://res.cloudinary.com/detc4yjdi/image/upload/v1746127613/AfriTap_Icon_Logo_zju4rl.png"
          alt="AfriTap Icon"
          className="h-10 w-10"
        />
        <span className="text-xl font-bold text-black dark:text-white">
          Afri<span className="text-[#2E7D32]">Tap</span>
        </span>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm text-black dark:text-white">
        <a href="#" className={navLinkClass}>Home</a>
        <a href="#" className={navLinkClass}>About</a>
        <a href="#" className={navLinkClass}>Services</a>
        <a href="#" className={navLinkClass}>Resources</a>
        <a href="#" className={navLinkClass}>Contact</a>
      </nav>

      {/* Right Side - Theme Toggle & CTA (Desktop) */}
      <div className="hidden md:flex items-center gap-4">
        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
        <Button className="bg-[#2E7D32] hover:bg-green-700 text-white rounded-full px-6">
          Connect Wallet
        </Button>
      </div>

      {/* Mobile Menu Toggle + Theme Toggle (Mobile) */}
      <div className="md:hidden flex items-center gap-2">
        {mounted && (
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full text-black dark:text-white hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            aria-label="Toggle Theme"
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        )}
        <Button
          variant="ghost"
          size="sm"
          className="text-black dark:text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu">
            <line x1="4" x2="20" y1="12" y2="12" />
            <line x1="4" x2="20" y1="6" y2="6" />
            <line x1="4" x2="20" y1="18" y2="18" />
          </svg>
        </Button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white dark:bg-[#0B0B0F] shadow-md flex flex-col items-start px-4 py-4 space-y-2 md:hidden z-40">
          <a href="#" className="text-sm font-medium text-black dark:text-white">Home</a>
          <a href="#" className="text-sm font-medium text-black dark:text-white">About</a>
          <a href="#" className="text-sm font-medium text-black dark:text-white">Services</a>
          <a href="#" className="text-sm font-medium text-black dark:text-white">Resources</a>
          <a href="#" className="text-sm font-medium text-black dark:text-white">Contact</a>
          <Button className="bg-[#2E7D32] hover:bg-green-700 text-white rounded-full w-full mt-2">
            Connect Wallet
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
