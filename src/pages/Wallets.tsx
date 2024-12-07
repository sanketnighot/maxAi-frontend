import React from 'react';
import { WalletList } from '../components/wallets/WalletList';
import { ConnectWallet } from '../components/wallets/ConnectWallet';

export default function Wallets() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold mb-8">Connected Wallets</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WalletList />
        </div>
        <div>
          <ConnectWallet />
        </div>
      </div>
    </div>
  );
}