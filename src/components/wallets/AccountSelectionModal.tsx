import React, { useState, useEffect } from 'react';
import { useAccount } from 'wagmi';
import { Loader2 } from 'lucide-react';
import { Provider } from 'ethers';

interface Account {
  address: string;
  balance: string;
  selected: boolean;
}

interface AccountSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (selectedAccounts: string[]) => void;
  walletProvider: string;
}

export function AccountSelectionModal({ isOpen, onClose, onSubmit, walletProvider }: AccountSelectionModalProps) {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { connector } = useAccount();

  useEffect(() => {
    async function fetchAccounts() {
      if (!connector) {
        setError('No wallet connected');
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        setError(null);

        const addresses = await connector.getAccounts();
        const provider = (await connector.getProvider()) as Provider;
        
        const accountsWithBalances = await Promise.all(
          addresses.map(async (address) => {
            try {
              const balance = await provider.getBalance(address);
              return {
                address,
                balance: (Number(balance) / 1e18).toFixed(4),
                selected: false,
              };
            } catch (err) {
              console.error(`Error fetching balance for ${address}:`, err);
              return {
                address,
                balance: '0',
                selected: false,
              };
            }
          })
        );

        setAccounts(accountsWithBalances);
      } catch (err) {
        console.error('Error fetching accounts:', err);
        setError('Failed to fetch accounts. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }

    if (isOpen) {
      fetchAccounts();
    }
  }, [isOpen, connector]);

  const toggleAccount = (address: string) => {
    setAccounts(accounts =>
      accounts.map(account =>
        account.address === address
          ? { ...account, selected: !account.selected }
          : account
      )
    );
  };

  const handleSubmit = () => {
    const selectedAddresses = accounts
      .filter(account => account.selected)
      .map(account => account.address);
    onSubmit(selectedAddresses);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Select Accounts</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">{walletProvider}</p>
        </div>

        {isLoading ? (
          <div className="flex flex-col items-center justify-center py-8">
            <Loader2 className="w-8 h-8 text-[rgb(5,0,255)] animate-spin mb-2" />
            <p className="text-gray-600 dark:text-gray-400">Fetching accounts...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-500 mb-4">{error}</p>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-100 dark:bg-gray-700 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        ) : (
          <>
            <div className="space-y-3 max-h-[60vh] overflow-y-auto mb-6">
              {accounts.map(account => (
                <label
                  key={account.address}
                  className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-600 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={account.selected}
                    onChange={() => toggleAccount(account.address)}
                    className="rounded text-[rgb(5,0,255)]"
                  />
                  <div className="flex-1">
                    <p className="font-medium truncate">{account.address}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Balance: {account.balance} ETH
                    </p>
                  </div>
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={onClose}
                className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmit}
                disabled={!accounts.some(a => a.selected)}
                className="px-4 py-2 bg-[rgb(5,0,255)] text-white rounded-lg hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Connect Selected
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
} 