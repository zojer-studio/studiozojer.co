import Image from "next/image";
import { SocialGraphCanvas } from "@/src/components/social-graph-canvas";
import { NewsletterForm } from "@/src/components/newsletter-form";

export function HeroSection() {
  return (
    // pt-28 matches the site's other content pages (support, changelog, forms) and
    // clears the fixed Nav (h-14 = 56px) with room for the eyebrow to breathe; pb-16
    // keeps the email field off the bottom edge. The canvas is absolute inset-0, so it
    // tracks this section's height automatically — padding costs the device, not the canvas.
    <section className="relative min-h-screen flex flex-col items-center justify-center text-center overflow-hidden bg-bg-base px-8 pt-28 pb-16">
      <SocialGraphCanvas />
      <div className="relative z-10 flex flex-col items-center">
        <p className="font-mono text-xs tracking-[0.18em] uppercase text-tx-tertiary mb-3">
          studiozojer
        </p>
        <h1 className="text-8xl font-display text-tx-primary tracking-tight leading-none mb-4">
          Kairōs
        </h1>
        <p className="text-sm text-tx-secondary mb-6 max-w-xs leading-relaxed">
          Find the people who share your sky
        </p>
        {/* The product, shown rather than argued for. `priority` because this is the
            LCP element — without it the largest thing on the page lazy-loads. */}
        <Image
          src="/images/hero-device-dark.png"
          alt="The Kairōs chart page on iPhone — a transit chart for Seattle, planets ringed by the twelve signs with aspect lines webbing the interior of the wheel"
          width={1742}
          height={3609}
          priority
          /* max-h is the real constraint — it keeps the email form inside the fold on
             short viewports. max-w only binds on unusually tall ones. */
          className="mb-8 h-auto max-h-[60vh] w-auto max-w-[320px] object-contain"
        />
        <NewsletterForm className="w-full max-w-sm text-left" />
      </div>
    </section>
  );
}
