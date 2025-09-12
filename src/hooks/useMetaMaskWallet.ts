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
      // Check if MetaMask is locked
      const accounts = await window.ethereum.request({
        method: 'eth_accounts',
      });

      let finalAccounts = accounts;
      
      // If no accounts are available, request access
      if (accounts.length === 0) {
        finalAccounts = await window.ethereum.request({
          method: 'eth_requestAccounts',
        });
      }

      if (finalAccounts.length === 0) {
        throw new Error('No accounts found. Please unlock MetaMask.');
      }

      const chainId = await window.ethereum.request({
        method: 'eth_chainId',
      });

      setWallet({
        isConnected: true,
        address: finalAccounts[0],
        chainId,
      });

      toast({
        title: "Wallet Connected",
        description: `Connected to ${finalAccounts[0].slice(0, 6)}...${finalAccounts[0].slice(-4)}`,
      });
    } catch (error: any) {
      console.error('Failed to connect wallet:', error);
      
      let errorMessage = "Failed to connect to MetaMask wallet.";
      if (error.code === 4001) {
        errorMessage = "Connection rejected by user.";
      } else if (error.code === -32002) {
        errorMessage = "MetaMask is already processing a request. Please check MetaMask.";
      } else if (error.message?.includes('User rejected')) {
        errorMessage = "Connection rejected by user.";
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