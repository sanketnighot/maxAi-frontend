import React from 'react';
import { useAccount } from 'wagmi';
import { WalletList } from '../components/wallets/WalletList';
import { ConnectWallet } from '../components/wallets/ConnectWallet';
import { ConnectWalletMessage } from '../components/shared/ConnectWalletMessage';

export default function Wallets() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return <ConnectWalletMessage />;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Connected Wallets</h1>
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Add Wallet
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <WalletList />
        </div>
        <div className="space-y-6">
          <ConnectWallet />
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Wallet Security</h2>
            <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-yellow-500 rounded-full" />
                2FA Enabled
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Backup Recovery Phrase
              </li>
              <li className="flex items-center gap-2">
                <span className="w-2 h-2 bg-red-500 rounded-full" />
                Hardware Wallet Connected
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}