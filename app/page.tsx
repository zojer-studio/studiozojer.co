import { NewsletterForm } from "@/src/components/newsletter-form";
import { FeatureCarousel } from "@/src/components/feature-carousel";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <main className="max-w-2xl text-center space-y-8 my-24">
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl font-display text-tx-primary">
            Kairōs
          </h1>
          <h3>
            by <a href="https://www.threads.com/@zojer.studio" target="_blank" rel="noopener noreferrer" className="underline hover:text-tx-primary transition-colors">Zojer Studio</a>
          </h3>
          <p className="text-tx-secondary">Beta available now on iOS Testflight.</p>

        </div>

        <FeatureCarousel className="max-w-md mx-auto" />

        <NewsletterForm className="max-w-md mx-auto" />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-bd-secondary text-tx-tertiary text-sm flex gap-4 justify-center">
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
      </main>
    </div>
  );
}
