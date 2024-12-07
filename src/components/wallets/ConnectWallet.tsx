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

      <div className="space-y-3">
        <ConnectButton.Custom>
          {({
            account,
            chain,
            openAccountModal,
            openChainModal,
            openConnectModal,
            mounted,
          }) => {
            const ready = mounted;
            const connected = ready && account && chain;

            return (
              <div
                {...(!ready && {
                  'aria-hidden': true,
                  style: {
                    opacity: 0,
                    pointerEvents: 'none',
                    userSelect: 'none',
                  },
                })}
              >
                {(() => {
                  if (!connected) {
                    return (
                      <button
                        onClick={openConnectModal}
                        className="w-full flex items-center justify-center gap-3 p-3 bg-[rgb(5,0,255)] text-white rounded-xl hover:bg-[rgb(5,0,255)]/90 transition-colors font-medium"
                      >
                        Connect Wallet
                      </button>
                    );
                  }

                  return (
                    <div className="space-y-3">
                      <button
                        onClick={openChainModal}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        {chain.hasIcon && (
                          <div className="w-6 h-6">
                            {chain.iconUrl && (
                              <img
                                alt={chain.name ?? 'Chain icon'}
                                src={chain.iconUrl}
                                className="w-6 h-6"
                              />
                            )}
                          </div>
                        )}
                        <span className="font-medium">{chain.name}</span>
                      </button>

                      <button
                        onClick={openAccountModal}
                        className="w-full flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors"
                      >
                        <span className="font-medium">{account.displayName}</span>
                        <span className="text-gray-600 dark:text-gray-400">
                          {account.displayBalance ? `${account.displayBalance}` : ''}
                        </span>
                      </button>
                    </div>
                  );
                })()}
              </div>
            );
          }}
        </ConnectButton.Custom>
      </div>
    </div>
  );
}