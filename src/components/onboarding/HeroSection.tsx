import { ConnectButton } from "@rainbow-me/rainbowkit";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "../ui/Button";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-transparent py-20 sm:py-32">
      <div className="container px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full mb-8">
          <Sparkles className="w-4 h-4" />
          <span className="text-sm font-medium">
            AI-Powered Portfolio Management
          </span>
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-blue-600">
          Maximize Your Crypto Portfolio with AI
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-3xl mx-auto">
          Experience the future of portfolio management with maxAI. Our
          AI-powered platform helps you make smarter investment decisions and
          optimize your crypto holdings.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
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
                        <Button
                          onClick={openConnectModal}
                          type="button"
                          size="lg"
                          className="text-lg px-8"
                        >
                          Get Started
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      );
                    }

                    if (chain.unsupported) {
                      return (
                        <Button
                          onClick={openChainModal}
                          type="button"
                          variant="secondary"
                          size="lg"
                        >
                          Wrong network
                        </Button>
                      );
                    }

                    return (
                      <div className="flex items-center gap-4">
                        <Button
                          onClick={openChainModal}
                          variant="outline"
                          size="lg"
                          className="hidden sm:flex"
                          type="button"
                        >
                          {chain.hasIcon && (
                            <img
                              alt={chain.name ?? "Chain icon"}
                              src={chain.iconUrl}
                              className="w-5 h-5 mr-2"
                            />
                          )}
                          {chain.name}
                        </Button>

                        <Button
                          onClick={openAccountModal}
                          type="button"
                          size="lg"
                        >
                          {account.displayName}
                          <ArrowRight className="ml-2 h-5 w-5" />
                        </Button>
                      </div>
                    );
                  })()}
                </div>
              );
            }}
          </ConnectButton.Custom>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: "Active Users", value: "50K+" },
            { label: "Total Volume", value: "$2B+" },
            { label: "Countries", value: "150+" },
            { label: "Success Rate", value: "94%" },
          ].map((stat) => (
            <div key={stat.label} className="p-4 bg-card rounded-lg shadow-sm">
              <p className="text-2xl sm:text-3xl font-bold text-primary mb-2">
                {stat.value}
              </p>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
