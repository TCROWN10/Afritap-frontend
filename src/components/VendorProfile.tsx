import React from 'react';
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Award, MapPin, MessageSquare, Star, Phone, Mail, Store, Tag } from 'lucide-react';
import { useToast } from "@/components/ui/use-toast";

interface VendorProfileProps {
  vendor: {
    id: number;
    name: string;
    location: string;
    rating: number;
    specialty: string;
    distance: string;
    tags: string[];
    bio?: string;
    contactInfo?: {
      phone?: string;
      email?: string;
    };
    businessHours?: string;
    products?: string[];
    image?: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const VendorProfile: React.FC<VendorProfileProps> = ({ vendor, isOpen, onClose }) => {
  const { toast } = useToast();

  const handleConnect = () => {
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${vendor.name} has been sent.`,
      duration: 3000,
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold flex items-center gap-2">
            {vendor.name}
            <div className="flex items-center bg-green-100 dark:bg-green-900/30 text-[#2E7D32] dark:text-green-400 px-2 py-1 rounded-full text-sm ml-2">
              <Award className="h-3 w-3 mr-1" />
              {vendor.rating}
            </div>
          </DialogTitle>
          <DialogDescription>
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-1">
              <MapPin className="h-4 w-4 mr-1 text-[#2E7D32]" />
              {vendor.location} • {vendor.distance}
            </div>
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {/* Vendor Image */}
          <div className="w-full h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center mb-4">
            {vendor.image ? (
              <img 
                src={vendor.image} 
                alt={vendor.name} 
                className="w-full h-full object-cover rounded-lg" 
              />
            ) : (
              <Store className="h-16 w-16 text-gray-400" />
            )}
          </div>
          
          {/* Vendor Details */}
          <div className="space-y-3">
            <h3 className="font-medium text-base">About</h3>
            <p className="text-gray-600 dark:text-gray-300">
              {vendor.bio || `${vendor.name} specializes in ${vendor.specialty} and has been serving customers in the ${vendor.location} area.`}
            </p>
            
            <h3 className="font-medium text-base mt-4">Specialty</h3>
            <p className="text-gray-800 dark:text-gray-200">{vendor.specialty}</p>
            
            {vendor.businessHours && (
              <>
                <h3 className="font-medium text-base mt-4">Business Hours</h3>
                <p className="text-gray-800 dark:text-gray-200">{vendor.businessHours}</p>
              </>
            )}
            
            {vendor.contactInfo && (
              <>
                <h3 className="font-medium text-base mt-4">Contact Information</h3>
                <div className="space-y-2">
                  {vendor.contactInfo.phone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 mr-2 text-[#2E7D32]" />
                      <span>{vendor.contactInfo.phone}</span>
                    </div>
                  )}
                  {vendor.contactInfo.email && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 mr-2 text-[#2E7D32]" />
                      <span>{vendor.contactInfo.email}</span>
                    </div>
                  )}
                </div>
              </>
            )}
            
            <h3 className="font-medium text-base mt-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {vendor.tags.map((tag, index) => (
                <span
                  key={index}
                  className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-2 py-1 rounded-full text-xs flex items-center"
                >
                  <Tag className="h-3 w-3 mr-1 text-[#2E7D32]" />
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
        
        <div className="flex justify-between items-center mt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          <Button 
            className="bg-[#2E7D32] hover:bg-green-700 text-white"
            onClick={handleConnect}
          >
            <MessageSquare className="h-4 w-4 mr-2" />
            Connect with Vendor
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default VendorProfile;