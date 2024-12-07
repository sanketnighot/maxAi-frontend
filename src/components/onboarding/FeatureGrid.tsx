import { BarChart3, Bell, Brain, Clock, Shield, Wallet } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description:
      "Advanced algorithms analyze market trends and provide personalized recommendations.",
  },
  {
    icon: Shield,
    title: "Enhanced Security",
    description:
      "Multi-layer security protocols protect your assets and sensitive information.",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics",
    description:
      "Track your portfolio performance with detailed real-time insights and metrics.",
  },
  {
    icon: Wallet,
    title: "Multi-wallet Support",
    description:
      "Connect and manage multiple wallets across different blockchain networks.",
  },
  {
    icon: Bell,
    title: "Smart Alerts",
    description:
      "Receive intelligent notifications about market opportunities and risks.",
  },
  {
    icon: Clock,
    title: "24/7 Monitoring",
    description:
      "Continuous portfolio monitoring and automated risk assessment.",
  },
];

export function FeatureGrid() {
  return (
    <div className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Powerful Features</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to manage your crypto portfolio effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <feature.icon className="w-12 h-12 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
