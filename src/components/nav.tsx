import { SmoothScrollLink } from "@/src/components/smooth-scroll-link";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-bd-secondary bg-bg-base/90 backdrop-blur-sm">
      <nav className="max-w-3xl mx-auto px-8 h-14 grid grid-cols-3 items-center">
        <a
          href="/"
          className="font-display text-lg text-tx-primary tracking-tight hover:opacity-80 transition-opacity"
        >
          Kairōs
        </a>
        <div className="flex items-center justify-center gap-6 text-sm text-tx-secondary">
          <SmoothScrollLink href="/#studio" targetId="studio" className="hover:text-tx-primary transition-colors">
            Studio
          </SmoothScrollLink>
          <SmoothScrollLink href="/#hub" targetId="hub" className="hover:text-tx-primary transition-colors">
            Hub
          </SmoothScrollLink>
        </div>
        <div className="flex justify-end">
          <SmoothScrollLink
            href="/#beta-email"
            targetId="beta-email"
            className="bg-bg-button text-tx-button text-sm px-4 py-1.5 rounded-lg hover:bg-bg-button-hover transition-colors"
          >
            <span className="sm:hidden">Join beta</span>
            <span className="hidden sm:inline">Join the beta →</span>
          </SmoothScrollLink>
        </div>
      </nav>
    </header>
  );
}
