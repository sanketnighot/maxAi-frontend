import React, { useState } from 'react';
import { ConnectWallet } from '../components/wallets/ConnectWallet';
import { WalletList } from '../components/wallets/WalletList';

interface WalletAccount {
  address: string;
  provider: string;
}

export function Wallets() {
  const [accounts, setAccounts] = useState<WalletAccount[]>([]);

  const handleRemoveAccount = (address: string) => {
    setAccounts(accounts => accounts.filter(acc => acc.address !== address));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-8">Wallet Management</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WalletList accounts={accounts} onRemoveAccount={handleRemoveAccount} />
        </div>
        <div>
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}