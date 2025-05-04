import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { toast } from "sonner";

interface WalletContextType {
  account: string | null;
  chainId: number | null;
  isConnecting: boolean;
  connectWallet: () => Promise<void>;
  disconnectWallet: () => void;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const [account, setAccount] = useState<string | null>(null);
  const [chainId, setChainId] = useState<number | null>(null);
  const [isConnecting, setIsConnecting] = useState(false);

  // Check if window.ethereum exists
  const isMetaMaskAvailable = typeof window !== "undefined" && window.ethereum;

  // Check local storage on mount
  useEffect(() => {
    const storedAccount = localStorage.getItem("wallet_account");
    if (storedAccount) {
      setAccount(storedAccount);
      detectCurrentChain();
    }
  }, []);

  // Listen for account changes
  useEffect(() => {
    if (!isMetaMaskAvailable) return;

    const handleAccountsChanged = (accounts: string[]) => {
      if (accounts.length === 0) {
        // User disconnected their wallet
        disconnectWallet();
      } else {
        setAccount(accounts[0]);
        localStorage.setItem("wallet_account", accounts[0]);
      }
    };

    const handleChainChanged = (chainIdHex: string) => {
      const newChainId = parseInt(chainIdHex, 16);
      setChainId(newChainId);
      toast.info(`Network switched to ${getNetworkName(newChainId)}`);
    };

    window.ethereum?.on("accountsChanged", handleAccountsChanged);
    window.ethereum?.on("chainChanged", handleChainChanged);

    return () => {
      window.ethereum?.removeListener("accountsChanged", handleAccountsChanged);
      window.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, [isMetaMaskAvailable]);

  const detectCurrentChain = async () => {
    if (isMetaMaskAvailable) {
      try {
        const chainIdHex = await window.ethereum.request({ method: "eth_chainId" });
        setChainId(parseInt(chainIdHex, 16));
      } catch (error) {
        console.error("Error detecting chain:", error);
      }
    }
  };

  const connectWallet = async () => {
    if (!isMetaMaskAvailable) {
      toast.error("MetaMask is not installed! Please install MetaMask to connect.");
      window.open("https://metamask.io/download/", "_blank");
      return;
    }

    setIsConnecting(true);

    try {
      const accounts = await window.ethereum.request({ method: "eth_requestAccounts" });
      setAccount(accounts[0]);
      localStorage.setItem("wallet_account", accounts[0]);
      
      await detectCurrentChain();
      
      toast.success("Wallet connected successfully!");
    } catch (error: any) {
      if (error.code === 4001) {
        toast.error("Connection rejected. Please try again.");
      } else {
        toast.error("Failed to connect wallet. Please try again.");
        console.error("Connect wallet error:", error);
      }
    } finally {
      setIsConnecting(false);
    }
  };

  const disconnectWallet = () => {
    setAccount(null);
    localStorage.removeItem("wallet_account");
    toast.info("Wallet disconnected");
  };

  const getNetworkName = (id: number): string => {
    switch (id) {
      case 1:
        return "Ethereum Mainnet";
      case 3:
        return "Ropsten Testnet";
      case 4:
        return "Rinkeby Testnet";
      case 5:
        return "Goerli Testnet";
      case 42:
        return "Kovan Testnet";
      case 56:
        return "Binance Smart Chain";
      case 137:
        return "Polygon";
      default:
        return `Chain ID: ${id}`;
    }
  };

  return (
    <WalletContext.Provider
      value={{
        account,
        chainId,
        isConnecting,
        connectWallet,
        disconnectWallet
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export const useWallet = () => {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error("useWallet must be used within a WalletProvider");
  }
  return context;
};