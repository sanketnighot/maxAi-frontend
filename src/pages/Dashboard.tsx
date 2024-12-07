import React from "react";
import { PortfolioCard } from "../components/dashboard/PortfolioCard";
import { DistributionChart } from "../components/dashboard/DistributionChart";
import { Permomance } from "../components/dashboard/Permomance";
import { OpportunityCard } from "../components/dashboard/OpportunityCard";
import { useAccount } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Dashboard() {
  const { isConnected } = useAccount();

  if (!isConnected) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <h1 className="text-2xl font-bold text-center">
          Connect your wallet to view your portfolio
        </h1>
        <ConnectButton />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PortfolioCard />
          <DistributionChart />
          <Permomance />
        </div>
        <div className="space-y-6">
          <OpportunityCard />
        </div>
      </div>
    </div>
  );
}
