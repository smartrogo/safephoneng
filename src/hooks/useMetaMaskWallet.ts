import { useState, useCallback } from 'react';
import { useToast } from '@/hooks/use-toast';

interface WalletState {
  isConnected: boolean;
  address: string | null;
  chainId: string | null;
}

export const useMetaMaskWallet = () => {
  const [wallet, setWallet] = useState<WalletState>({
    isConnected: false,
    address: null,
    chainId: null,
  });
  const [isConnecting, setIsConnecting] = useState(false);
  const { toast } = useToast();

  const connectWallet = useCallback(async () => {
    if (!window.ethereum) {
      toast({
        title: "MetaMask Not Found",
        description: "Please install MetaMask to connect your wallet.",
        variant: "destructive",
      });
      return;
    }

    setIsConnecting(true);
    
    // Show immediate feedback
    toast({
      title: "Connecting...",
      description: "Opening MetaMask wallet connection...",
    });

    try {
      // First try to get existing accounts (faster)
      let accounts = await Promise.race([
        window.ethereum.request({ method: 'eth_accounts' }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Timeout')), 3000)
        )
      ]);

      // If no accounts, request connection with timeout
      if (!accounts || accounts.length === 0) {
        accounts = await Promise.race([
          window.ethereum.request({ method: 'eth_requestAccounts' }),
          new Promise((_, reject) => 
            setTimeout(() => reject(new Error('Connection timeout')), 10000)
          )
        ]);
      }

      if (!accounts || accounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask.');
      }

      // Get chain ID with timeout
      const chainId = await Promise.race([
        window.ethereum.request({ method: 'eth_chainId' }),
        new Promise((_, reject) => 
          setTimeout(() => reject(new Error('Chain ID timeout')), 3000)
        )
      ]);

      setWallet({
        isConnected: true,
        address: accounts[0],
        chainId,
      });

      toast({
        title: "Wallet Connected Successfully!",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      
      let errorMessage = "Failed to connect to MetaMask wallet.";
      if (error.code === 4001) {
        errorMessage = "Connection rejected by user.";
      } else if (error.code === -32002) {
        errorMessage = "MetaMask is already processing a request. Please check MetaMask extension.";
      } else if (error.message?.includes('User rejected')) {
        errorMessage = "Connection rejected by user.";
      } else if (error.message?.includes('timeout') || error.message?.includes('Timeout')) {
        errorMessage = "Connection timed out. Please try again and ensure MetaMask is unlocked.";
      }

      toast({
        title: "Connection Failed",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  }, [toast]);

  const disconnectWallet = useCallback(() => {
    setWallet({
      isConnected: false,
      address: null,
      chainId: null,
    });
    toast({
      title: "Wallet Disconnected",
      description: "Your MetaMask wallet has been disconnected.",
    });
  }, [toast]);

  return {
    wallet,
    connectWallet,
    disconnectWallet,
    isConnecting,
  };
};

declare global {
  interface Window {
    ethereum?: any;
  }
}