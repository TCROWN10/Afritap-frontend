import React, { useState } from 'react';
import { Search, Users, MapPin, Award, MessageSquare, List, Map } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useToast } from "@/components/ui/use-toast";
import MapView from '@/components/MapView';
import VendorProfile from '@/components/VendorProfile';
import ConnectDialog from '@/components/ConnectDialog';

// Mock vendor data
const vendorData = [
  { 
    id: 1, 
    name: "Sarah's Market Stall", 
    location: "Lagos Central Market", 
    rating: 4.8, 
    specialty: "Fresh Produce",
    distance: "0.8 km",
    tags: ["grocery", "produce", "organic"],
    bio: "With over 10 years of experience in fresh produce, I offer the finest selection of fruits and vegetables sourced directly from local farms.",
    contactInfo: {
      phone: "+234 812 345 6780",
      email: "sarah@marketstall.com"
    },
    businessHours: "Mon-Sat: 8:00 AM - 6:00 PM",
    products: ["Fruits", "Vegetables", "Spices", "Grains"]
  },
  { 
    id: 2, 
    name: "TechNow Solutions", 
    location: "Nairobi Business District", 
    rating: 4.5, 
    specialty: "Mobile Repairs & Accessories",
    distance: "1.2 km",
    tags: ["tech", "repairs", "phones"],
    bio: "We provide fast and reliable repairs for all major phone brands and sell genuine accessories at competitive prices.",
    contactInfo: {
      phone: "+254 712 345 678",
      email: "support@technow.co.ke"
    },
    businessHours: "Mon-Fri: 9:00 AM - 7:00 PM, Sat: 10:00 AM - 5:00 PM",
    products: ["Phone Repairs", "Screen Protectors", "Cases", "Chargers"]
  },
  { 
    id: 3, 
    name: "Adamu's Textiles", 
    location: "Kano Fabric Market", 
    rating: 4.9, 
    specialty: "Traditional Fabrics & Clothing",
    distance: "3.5 km",
    tags: ["fashion", "textile", "traditional"],
    bio: "Family-owned textile business specializing in handcrafted traditional fabrics and garments that celebrate African heritage.",
    contactInfo: {
      phone: "+234 905 678 1234",
      email: "info@adamustextiles.com"
    },
    businessHours: "Mon-Sat: 9:00 AM - 8:00 PM",
    products: ["Ankara Fabrics", "Traditional Attire", "Custom Tailoring"]
  },
  { 
    id: 4, 
    name: "MediQuick Pharmacy", 
    location: "Accra Health District", 
    rating: 4.7, 
    specialty: "Pharmaceuticals & Health Products",
    distance: "2.1 km",
    tags: ["health", "medicine", "pharmacy"],
    bio: "A trusted pharmacy providing essential medicines, health supplements, and medical consultations with registered pharmacists.",
    contactInfo: {
      phone: "+233 24 123 4567",
      email: "care@mediquick.com.gh"
    },
    businessHours: "Mon-Sun: 8:00 AM - 10:00 PM",
    products: ["Prescription Drugs", "OTC Medicines", "First Aid", "Supplements"]
  },
  { 
    id: 5, 
    name: "Solar Solutions", 
    location: "Kampala Industrial Area", 
    rating: 4.6, 
    specialty: "Solar Products & Installation",
    distance: "4.3 km",
    tags: ["energy", "solar", "electronics"],
    bio: "We provide sustainable energy solutions through quality solar products and professional installation services for homes and businesses.",
    contactInfo: {
      phone: "+256 77 123 4567",
      email: "info@solarsolutions.ug"
    },
    businessHours: "Mon-Fri: 8:30 AM - 5:30 PM",
    products: ["Solar Panels", "Inverters", "Batteries", "Solar Lighting"]
  },
];

const VendorNetwork = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredVendors, setFilteredVendors] = useState(vendorData);
  const [viewMode, setViewMode] = useState<"list" | "map">("list");
  const [selectedVendor, setSelectedVendor] = useState<typeof vendorData[0] | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isConnectOpen, setIsConnectOpen] = useState(false);
  const { toast } = useToast();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (searchTerm.trim() === "") {
      setFilteredVendors(vendorData);
      return;
    }
    
    const results = vendorData.filter(vendor => 
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.specialty.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.tags.some(tag => tag.includes(searchTerm.toLowerCase()))
    );
    
    setFilteredVendors(results);
    
    toast({
      title: `${results.length} vendors found`,
      description: results.length > 0 ? "Showing search results" : "Try a different search term",
      duration: 3000,
    });
  };

  const handleJoinCommunity = () => {
    toast({
      title: "Join Community",
      description: "Redirecting to mobile app download page...",
      duration: 3000,
    });
    // In a real app, this would link to app stores or a deep link
    window.open("https://afritap.com/download", "_blank");
  };

  const toggleView = () => {
    setViewMode(viewMode === "list" ? "map" : "list");
    toast({
      title: `Switched to ${viewMode === "list" ? "map" : "list"} view`,
      duration: 1500,
    });
  };

  const handleViewProfile = (vendor: typeof vendorData[0]) => {
    setSelectedVendor(vendor);
    setIsProfileOpen(true);
  };

  const handleConnect = (vendor: typeof vendorData[0]) => {
    setSelectedVendor(vendor);
    setIsConnectOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-[#FFF8F0] dark:bg-gray-900">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-[#2E7D32]/90 to-[#1B5E20] py-20 px-4 sm:px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="text-white space-y-6 animate-fade-in">
                <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                  Connect with AfriTap Vendor Network
                </h1>
                <p className="text-lg opacity-90">
                  Discover local merchants, build business relationships, and grow your customer base through our vibrant vendor community.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    onClick={handleJoinCommunity}
                    className="bg-[#FFD700] hover:bg-yellow-500 text-gray-900 px-6 py-6 rounded-lg flex items-center justify-center gap-2"
                    size="lg"
                  >
                    <Users className="h-5 w-5" />
                    Join Vendor Community
                  </Button>
                  <Button 
                    variant="outline" 
                    className="border-2 border-white text-white hover:bg-white/20 px-6 py-6 rounded-lg flex items-center justify-center gap-2"
                    size="lg"
                    onClick={toggleView}
                  >
                    {viewMode === "list" ? (
                      <>
                        <Map className="h-5 w-5" />
                        Map View
                      </>
                    ) : (
                      <>
                        <List className="h-5 w-5" />
                        List View
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <div className="rounded-lg bg-white/10 p-6 backdrop-blur-sm hidden md:block animate-fade-in">
                <div className="aspect-[4/3] bg-white/10 rounded-lg flex items-center justify-center">
                  <div className="text-white text-center p-8">
                    <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-white/20 flex items-center justify-center">
                      <Users className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold mb-2">300+</h3>
                    <p className="opacity-90">Verified Vendors</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Search Section */}
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 py-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 md:p-8 animate-fade-in">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">Find Vendors</h2>
            <form onSubmit={handleSearch} className="flex gap-2">
              <Input
                type="text"
                placeholder="Search by name, specialty, or tags..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-grow"
              />
              <Button type="submit" className="bg-[#2E7D32] hover:bg-green-700">
                <Search className="h-4 w-4 mr-2" />
                Search
              </Button>
            </form>
            <div className="flex justify-end mt-4">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={toggleView}
                className="flex items-center gap-2"
              >
                {viewMode === "list" ? (
                  <>
                    <Map className="h-4 w-4" />
                    Map View
                  </>
                ) : (
                  <>
                    <List className="h-4 w-4" />
                    List View
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Map View */}
        <div className="container mx-auto max-w-6xl px-4 sm:px-6 pb-8">
          <MapView isActive={viewMode === "map"} onToggleView={toggleView} />
        </div>

        {/* Vendor Listings */}
        {viewMode === "list" && (
          <div className="container mx-auto max-w-6xl px-4 sm:px-6 pb-16">
            <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
              {filteredVendors.length > 0 ? 'Available Vendors' : 'No vendors found'}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredVendors.map((vendor) => (
                <div 
                  key={vendor.id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow p-6 animate-fade-in"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {vendor.name}
                    </h3>
                    <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-[#2E7D32] dark:text-green-400 px-2 py-1 rounded-full text-sm">
                      <Award className="h-3 w-3 mr-1" />
                      {vendor.rating}
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 flex items-center text-sm mb-2">
                    <MapPin className="h-4 w-4 mr-1 text-[#2E7D32]" />
                    {vendor.location} • {vendor.distance}
                  </p>
                  
                  <p className="text-gray-800 dark:text-gray-200 mb-4">
                    <span className="font-medium">Specialty:</span> {vendor.specialty}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4">
                    {vendor.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="flex justify-between mt-4">
                  <Button 
                      variant="outline" 
                      className="text-[#2E7D32] border-[#2E7D32]"
                      onClick={() => handleViewProfile(vendor)}
                    >
                      View Profile
                    </Button>
                    <Button 
                      className="bg-[#2E7D32] hover:bg-green-700 text-white"
                      onClick={() => handleConnect(vendor)}
                    >
                      <MessageSquare className="h-4 w-4 mr-2" />
                      Connect
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
      <Footer />
          
      {/* Vendor Profile Dialog */}
      {selectedVendor && (
        <VendorProfile
          vendor={selectedVendor}
          isOpen={isProfileOpen}
          onClose={() => setIsProfileOpen(false)}
        />
      )}
      
      {/* Connect Dialog */}
      {selectedVendor && (
        <ConnectDialog
          vendorName={selectedVendor.name}
          isOpen={isConnectOpen}
          onClose={() => setIsConnectOpen(false)}
        />
      )}
    </div>
  );
};

export default VendorNetwork;