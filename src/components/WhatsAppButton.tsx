import React from 'react';
import { MessageCircle } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from './ui/use-toast';

interface WhatsAppButtonProps {
  phoneNumber?: string;
  message?: string;
  className?: string;
}

const WhatsAppButton: React.FC<WhatsAppButtonProps> = ({ 
  phoneNumber = "2348123456789", // Default phone number - replace with your actual number
  message = "Hello! I'm interested in learning more about AfriTap.",
  className = ""
}) => {
  
  const handleWhatsAppClick = () => {
    // Format phone number (remove any non-numeric characters)
    const formattedPhone = phoneNumber.replace(/\D/g, '');
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(message);
    
    // Create WhatsApp URL
    const whatsappUrl = `https://wa.me/${2349091659065}?text=${encodedMessage}`;
    
    // Open WhatsApp in a new tab
    window.open(whatsappUrl, '_blank');
    
    // Show toast notification
    toast({
      title: "Opening WhatsApp",
      description: "Connecting you to our support team.",
      duration: 3000,
    });
  };

  return (
    <Button
      onClick={handleWhatsAppClick}
      className={`fixed bottom-6 right-6 rounded-full w-14 h-14 p-0 bg-green-600 hover:bg-green-700 shadow-lg z-50 flex items-center justify-center ${className}`}
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-7 w-7 text-white" />
    </Button>
  );
};

export default WhatsAppButton;
