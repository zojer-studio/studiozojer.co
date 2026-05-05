import { SocialGraphCanvas } from "@/src/components/social-graph-canvas";

// TODO: replace with your actual TestFlight invite URL before launch
const TESTFLIGHT_URL = "https://testflight.apple.com";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-bg-base px-8">
      <SocialGraphCanvas />
      <div className="relative z-10 flex flex-col items-center">
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-tx-tertiary mb-3">
          Zojer Studio
        </p>
        <h1 className="text-8xl font-display text-tx-primary tracking-tight leading-none mb-4">
          Kairōs
        </h1>
        <p className="text-sm text-tx-secondary mb-8 max-w-xs leading-relaxed">
          Find the people who share your sky
        </p>
        <a
          href={TESTFLIGHT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-bg-button text-tx-button text-sm px-5 py-2.5 rounded-lg hover:bg-bg-button-hover transition-colors"
        >
          Join the beta →
        </a>
      </div>
    </section>
  );
}
