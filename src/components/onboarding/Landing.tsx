import { BenefitsSection } from "./BenefitsSection";
import { CTASection } from "./CTASetion";
import { FeatureGrid } from "./FeatureGrid";
import { HeroSection } from "./HeroSection";
import { TestimonialSection } from "./Testimonials";

export default function Landing() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <FeatureGrid />
      <BenefitsSection />
      <TestimonialSection />
      <CTASection />
    </div>
  );
}
