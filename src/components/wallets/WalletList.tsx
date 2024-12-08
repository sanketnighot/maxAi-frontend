import React from 'react';
import { useAccount } from 'wagmi';
import { UserAccounts } from './UserAccounts';

interface WalletAccount {
  address: string;
  name: string;
  balance: string;
  network: string;
}

export function WalletList() {
  const { address: currentAddress } = useAccount();
  const [selectedAddress, setSelectedAddress] = React.useState<string | undefined>(currentAddress);

  // Mock data - replace with actual wallet data from your backend
  const accounts: WalletAccount[] = [
    {
      address: "0x510f0A4384bD93915B3977d7f2A91e4b1525c298",
      name: "Main Wallet",
      balance: "0.0011 ETH",
      network: "Ethereum"
    },
  ];

  const handleSelectAccount = (address: string) => {
    setSelectedAddress(address);
    // Add any additional logic for when an account is selected
  };

  return (
    <UserAccounts
      accounts={accounts}
      selectedAddress={selectedAddress}
      onSelectAccount={handleSelectAccount}
    />
  );
}