import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export function ConnectWalletMessage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
      <h1 className="text-2xl font-bold text-center">
        Connect your wallet to view your portfolio
      </h1>
      <ConnectButton />
    </div>
  );
}
