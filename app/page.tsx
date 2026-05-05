import { HeroSection } from "@/src/components/hero-section";
import { FeatureCarousel } from "@/src/components/feature-carousel";
import { StudioSection } from "@/src/components/studio-section";
import { HubSection } from "@/src/components/hub-section";

export default function Home() {
  return (
    <main>
      {/* 1. Hero */}
      <HeroSection />

      {/* 2. Feature carousel */}
      <section className="border-t border-bd-secondary px-8 py-20 bg-bg-base">
        <div className="max-w-3xl mx-auto">
          <p className="font-mono text-xs tracking-[0.14em] uppercase text-tx-tertiary mb-2 text-center">
            The app
          </p>
          <h2 className="text-3xl font-display text-tx-primary tracking-tight mb-8 text-center">
            Astrology built for depth
          </h2>
          <FeatureCarousel />
          <div className="flex flex-wrap justify-center gap-2 mt-6">
            {[
              "Shared placements",
              "Current transits",
              "Aspect stepping",
              "Display profiles",
              "Chart reordering",
            ].map((label) => (
              <span
                key={label}
                className="bg-bg-primary border border-bd-secondary rounded-full px-3 py-1 text-xs text-tx-secondary"
              >
                {label}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Studio */}
      <StudioSection />

      {/* 4. Hub */}
      <HubSection />

      {/* Footer */}
      <footer className="border-t border-bd-secondary px-8 py-6 bg-bg-dark">
        <div className="max-w-3xl mx-auto flex items-center justify-between">
          <span className="text-xs text-tx-tertiary font-mono">
            Zojer Studio
          </span>
          <div className="flex gap-4 text-xs text-tx-tertiary">
            <a href="/terms" className="hover:text-tx-primary transition-colors">
              Terms
            </a>
            <a href="/privacy" className="hover:text-tx-primary transition-colors">
              Privacy
            </a>
            <a href="/support" className="hover:text-tx-primary transition-colors">
              Support
            </a>
            <a href="/changelog" className="hover:text-tx-primary transition-colors">
              Changelog
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
