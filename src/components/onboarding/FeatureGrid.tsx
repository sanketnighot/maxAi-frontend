import React from "react";
import { LineChart, PieChart, Shield, Sparkles } from "lucide-react";

const features = [
  {
    title: "Portfolio Analytics",
    description:
      "Deep insights into your portfolio performance and asset allocation.",
    icon: LineChart,
  },
  {
    title: "Risk Analysis",
    description: "Advanced risk assessment and management recommendations.",
    icon: Shield,
  },
  {
    title: "AI Recommendations",
    description:
      "Smart investment suggestions based on market trends and your goals.",
    icon: Sparkles,
  },
  {
    title: "Asset Distribution",
    description: "Optimal asset allocation strategies for your portfolio.",
    icon: PieChart,
  },
];

export function FeatureGrid() {
  return (
    <div className="bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Powerful Features
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300">
            Everything you need to manage your crypto portfolio effectively
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg"
            >
              <feature.icon className="w-10 h-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
