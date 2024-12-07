import { Quote } from "lucide-react";

const testimonials = [
  {
    quote:
      "maxAI has completely transformed how I manage my crypto portfolio. The AI insights are incredibly valuable.",
    author: "Sarah Chen",
    role: "Crypto Investor",
  },
  {
    quote:
      "The real-time analytics and smart alerts have helped me make better trading decisions consistently.",
    author: "Michael Rodriguez",
    role: "Day Trader",
  },
  {
    quote:
      "Finally, a platform that combines powerful features with an intuitive interface. Highly recommended!",
    author: "David Kim",
    role: "Portfolio Manager",
  },
];

export function TestimonialSection() {
  return (
    <div className="py-24 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">What Our Users Say</h2>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Join thousands of satisfied users who trust maxAI
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg"
            >
              <Quote className="w-8 h-8 text-primary mb-4" />
              <p className="text-lg mb-6">{testimonial.quote}</p>
              <div>
                <p className="font-semibold">{testimonial.author}</p>
                <p className="text-gray-600 dark:text-gray-400">
                  {testimonial.role}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
