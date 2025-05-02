import React, { useState, useEffect } from "react";
import { Sun, Moon, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [mounted, setMounted] = useState(false);
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

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

  const scrollToSection = (sectionId: string) => {
    setMobileMenuOpen(false); // Close mobile menu when navigating
    
    // Handle routing to home page first if not on home page
    if (location.pathname !== "/") {
      window.location.href = `/#${sectionId}`;
      return;
    }
    
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const navLinkClass = "hover-underline text-sm font-medium cursor-pointer";

  // Logo URLs based on theme
  const darkLogo = "https://res.cloudinary.com/detc4yjdi/image/upload/v1746182944/AfriTap_Green_Black_Logo_1_ktbtsg.png";
  const lightLogo = "https://res.cloudinary.com/detc4yjdi/image/upload/v1746182928/AfriTap_Green_White_Logo_1_mhpg8z.png";
  const iconLogo = "https://res.cloudinary.com/detc4yjdi/image/upload/v1746182906/AfriTap_Icon_Logo_1_nvq66r.png";

  return (
    <header className="sticky top-0 w-full px-4 sm:px-6 py-4 flex items-center justify-between bg-[#FFF8F0]/80 dark:bg-[#0B0B0F]/80 backdrop-blur-md z-50 transition-colors duration-300 animate-fade-in">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link to="/" className="flex items-center space-x-2">
          {/* Mobile view - show only icon */}
          <img
            src={iconLogo}
            alt="AfriTap Icon"
            className="h-10 w-10 block sm:hidden"
          />
          
          {/* Desktop view - show full logo based on theme */}
          <div className="hidden sm:block">
            {mounted && (
              <img
                src={theme === "dark" ? lightLogo : darkLogo}
                alt="AfriTap Logo"
                className="h-10"
              />
            )}
            {/* Show placeholder before mounted to prevent layout shift */}
            {!mounted && (
              <div className="h-10 w-32 bg-gray-200 dark:bg-black animate-pulse rounded"></div>
            )}
          </div>
        </Link>
      </div>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-6 text-sm text-black dark:text-white">
        <Link to="/" className={navLinkClass}>Home</Link>
        <button onClick={() => scrollToSection("about")} className={navLinkClass}>About</button>
        <button onClick={() => scrollToSection("services")} className={navLinkClass}>Services</button>
        <Link to="/vendor-network" className={`${navLinkClass} flex items-center gap-1`}>
          <Users className="h-4 w-4 mr-1" />
          Vendor Network
        </Link>
        <button onClick={() => scrollToSection("contact")} className={navLinkClass}>Contact</button>
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
          <Link to="/" className="text-sm font-medium text-black dark:text-white" onClick={() => setMobileMenuOpen(false)}>Home</Link>
          <button onClick={() => scrollToSection("about")} className="text-sm font-medium text-black dark:text-white text-left w-full">About</button>
          <button onClick={() => scrollToSection("services")} className="text-sm font-medium text-black dark:text-white text-left w-full">Services</button>
          <Link to="/vendor-network" className="text-sm font-medium text-black dark:text-white" onClick={() => setMobileMenuOpen(false)}>Vendor Network</Link>
          <button onClick={() => scrollToSection("contact")} className="text-sm font-medium text-black dark:text-white text-left w-full">Contact</button>
          <Button className="bg-[#2E7D32] hover:bg-green-700 text-white rounded-full w-full mt-2">
            Connect Wallet
          </Button>
        </div>
      )}
    </header>
  );
};

export default Header;
