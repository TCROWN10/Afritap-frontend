import React from "react";
import { Button } from "@/components/ui/button";
import { useWallet } from "@/context/WalletContext";
import { Wallet } from "lucide-react";

interface ConnectWalletButtonProps {
  className?: string;
}

const ConnectWalletButton: React.FC<ConnectWalletButtonProps> = ({ className }) => {
  const { account, isConnecting, connectWallet, disconnectWallet } = useWallet();

  const formatAddress = (address: string): string => {
    return address.substring(0, 6) + "..." + address.substring(address.length - 4);
  };

  return (
    <>
      {!account ? (
        <Button 
          onClick={connectWallet} 
          disabled={isConnecting}
          className={className || "bg-[#2E7D32] hover:bg-green-700 text-white rounded-full px-6"}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </Button>
      ) : (
        <Button 
          onClick={disconnectWallet}
          className={className || "bg-[#2E7D32] hover:bg-green-700 text-white rounded-full px-6"}
        >
          <Wallet className="mr-2 h-4 w-4" />
          {formatAddress(account)}
        </Button>
      )}
    </>
  );
};

export default ConnectWalletButton;