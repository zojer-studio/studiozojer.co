import { SocialGraphCanvas } from "@/src/components/social-graph-canvas";
import { NewsletterForm } from "@/src/components/newsletter-form";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-bg-base px-8">
      <SocialGraphCanvas />
      <div className="relative z-10 flex flex-col items-center">
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-tx-tertiary mb-3">
          studiozojer
        </p>
        <h1 className="text-8xl font-display text-tx-primary tracking-tight leading-none mb-4">
          Kairōs
        </h1>
        <p className="text-sm text-tx-secondary mb-8 max-w-xs leading-relaxed">
          Find the people who share your sky
        </p>
        <NewsletterForm className="w-full max-w-sm text-left" />
      </div>
    </section>
  );
}
