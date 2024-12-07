import { ConnectButton } from "@rainbow-me/rainbowkit";
import { LineChartIcon as ChartLineUp, Rocket, Users } from "lucide-react";

export function CTASection() {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-br from-primary/5 to-primary/20">
      <div className="container px-4 sm:px-6 lg:px-8">
        <div className="bg-primary rounded-3xl p-8 sm:p-12 text-center shadow-xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark opacity-90"></div>
          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl font-bold text-primary-foreground mb-4 sm:mb-6">
              Ready to Optimize Your Portfolio?
            </h2>
            <p className="text-lg sm:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
              Join thousands of investors who are already using maxAI to make
              smarter investment decisions.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-8">
              <FeatureItem icon={ChartLineUp} text="AI-Powered Insights" />
              <FeatureItem icon={Users} text="Community-Driven" />
              <FeatureItem icon={Rocket} text="Accelerate Growth" />
            </div>
            <div className="inline-block">
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
                        "aria-hidden": true,
                        style: {
                          opacity: 0,
                          pointerEvents: "none",
                          userSelect: "none",
                        },
                      })}
                    >
                      {(() => {
                        if (!connected) {
                          return (
                            <button
                              onClick={openConnectModal}
                              type="button"
                              className="bg-white text-primary hover:bg-primary-foreground hover:text-primary font-bold py-3 px-6 rounded-full transition-colors duration-200 shadow-md"
                            >
                              Connect Wallet
                            </button>
                          );
                        }

                        if (chain.unsupported) {
                          return (
                            <button
                              onClick={openChainModal}
                              type="button"
                              className="bg-red-500 text-white hover:bg-red-600 font-bold py-3 px-6 rounded-full transition-colors duration-200 shadow-md"
                            >
                              Wrong network
                            </button>
                          );
                        }

                        return (
                          <div className="flex items-center gap-3">
                            <button
                              onClick={openChainModal}
                              className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 font-medium py-2 px-4 rounded-full transition-colors duration-200"
                              type="button"
                            >
                              {chain.hasIcon && (
                                <img
                                  alt={chain.name ?? "Chain icon"}
                                  src={chain.iconUrl}
                                  className="w-4 h-4 mr-2 inline"
                                />
                              )}
                              {chain.name}
                            </button>

                            <button
                              onClick={openAccountModal}
                              type="button"
                              className="bg-primary-foreground/10 text-primary-foreground hover:bg-primary-foreground/20 font-medium py-2 px-4 rounded-full transition-colors duration-200"
                            >
                              {account.displayName}
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
        </div>
      </div>
    </section>
  );
}

function FeatureItem({
  icon: Icon,
  text,
}: {
  icon: React.ElementType;
  text: string;
}) {
  return (
    <div className="flex items-center gap-2 text-primary-foreground/90">
      <Icon className="w-5 h-5" />
      <span>{text}</span>
    </div>
  );
}
