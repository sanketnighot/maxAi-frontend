import { CheckCircle } from "lucide-react";

const benefits = [
  "Make data-driven investment decisions",
  "Reduce emotional trading mistakes",
  "Save time with automated portfolio tracking",
  "Identify market opportunities early",
  "Minimize risks with AI-powered alerts",
  "Access comprehensive market insights",
];

export function BenefitsSection() {
  return (
    <div className="py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-6">Why Choose maxAI?</h2>
            <div className="space-y-4">
              {benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3">
                  <CheckCircle className="w-6 h-6 text-primary flex-shrink-0 mt-1" />
                  <p className="text-lg text-gray-600 dark:text-gray-300">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary to-blue-600 p-1">
              <div className="w-full h-full rounded-xl bg-white dark:bg-gray-800 p-8">
                <img
                  src="https://images.unsplash.com/photo-1642790551116-18e150f248e3?auto=format&fit=crop&q=80"
                  alt="Analytics Dashboard"
                  className="w-full h-full object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
