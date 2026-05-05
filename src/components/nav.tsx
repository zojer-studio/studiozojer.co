// TODO: replace with your actual TestFlight invite URL before launch
const TESTFLIGHT_URL = "https://testflight.apple.com";

export function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-bd-secondary bg-bg-base/90 backdrop-blur-sm">
      <nav className="max-w-3xl mx-auto px-8 h-14 flex items-center justify-between">
        <a
          href="/"
          className="font-display text-lg text-tx-primary tracking-tight hover:opacity-80 transition-opacity"
        >
          Kairōs
        </a>
        <div className="flex items-center gap-6 text-sm text-tx-secondary">
          <a href="/#hub" className="hover:text-tx-primary transition-colors">
            Hub
          </a>
          <a href="/#studio" className="hover:text-tx-primary transition-colors">
            Studio
          </a>
        </div>
        <a
          href={TESTFLIGHT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-bg-button text-tx-button text-sm px-4 py-1.5 rounded-lg hover:bg-bg-button-hover transition-colors"
        >
          TestFlight →
        </a>
      </nav>
    </header>
  );
}
