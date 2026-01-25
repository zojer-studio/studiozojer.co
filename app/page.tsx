import { NewsletterForm } from "@/src/components/newsletter-form";
import { FeatureCarousel } from "@/src/components/feature-carousel";

export default function Home() {
  return (
    <div className="min-h-screen grid grid-cols-[1fr_min(28rem,calc(100%-4rem))_1fr] gap-y-8 py-24 content-center">
      {/* Title section */}
      <div className="col-start-2 flex flex-col gap-2 text-center">
        <h1 className="text-6xl font-display text-tx-primary">
          Kairōs
        </h1>
        <h3>
          by <a href="https://www.threads.com/@zojer.studio" target="_blank" rel="noopener noreferrer" className="underline hover:text-tx-primary transition-colors">Zojer Studio</a>
        </h3>
        <p className="text-tx-secondary">Beta available now on iOS Testflight.</p>
      </div>

      {/* Carousel - full bleed */}
      <FeatureCarousel className="col-span-full max-w-3xl mx-auto w-full px-8" />

      {/* Newsletter */}
      <NewsletterForm className="col-start-2" />

      {/* Footer */}
      <footer className="col-start-2 mt-8 pt-8 border-t border-bd-secondary text-tx-tertiary text-sm flex gap-4 justify-center">
          <a href="/terms" className="hover:text-tx-primary transition-colors">
            Terms
          </a>
          <span>&middot;</span>
          <a href="/privacy" className="hover:text-tx-primary transition-colors">
            Privacy
          </a>
          <span>&middot;</span>
          <a href="/support" className="hover:text-tx-primary transition-colors">
            Support
          </a>
        </footer>
    </div>
  );
}
