import React from 'react';
import { Plus } from 'lucide-react';
import { ConnectButton } from '@rainbow-me/rainbowkit';

export function ConnectWallet() {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <Plus className="w-5 h-5 text-[rgb(5,0,255)]" />
        <h2 className="text-lg font-semibold">Connect Wallet</h2>
      </div>

      <div className="space-y-4">
        <ConnectButton.Custom>
          {({
            openConnectModal,
            mounted,
          }) => {
            if (!mounted) return null;

            return (
              <button
                onClick={openConnectModal}
                className="w-full flex items-center justify-center gap-3 p-3 bg-[rgb(5,0,255)] text-white rounded-xl hover:bg-[rgb(5,0,255)]/90 transition-colors font-medium"
              >
                Connect Wallet
              </button>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
}