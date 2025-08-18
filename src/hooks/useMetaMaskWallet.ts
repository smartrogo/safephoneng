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
    try {
      const accounts = await window.ethereum.request({
        method: 'eth_requestAccounts',
      });

      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      setWallet({
        isConnected: true,
        address: accounts[0],
        chainId,
      });

      toast({
        title: "Wallet Connected",
        description: `Connected to ${accounts[0].slice(0, 6)}...${accounts[0].slice(-4)}`,
      });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
      toast({
        title: "Connection Failed",
        description: "Failed to connect to MetaMask wallet.",
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