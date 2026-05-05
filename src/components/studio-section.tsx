export function StudioSection() {
  return (
    <section
      id="studio"
      className="bg-bg-dark border-t border-bd-secondary px-8 py-20"
    >
      <div className="max-w-3xl mx-auto grid grid-cols-1 md:grid-cols-[1fr_200px] gap-12 items-center">
        <div>
          <p className="font-mono text-xs tracking-[0.14em] uppercase text-tx-tertiary mb-2">
            Zojer Studio
          </p>
          <h2 className="text-3xl font-display text-tx-primary tracking-tight mb-5">
            Built on graph architecture
          </h2>
          {/* TODO: replace placeholder copy with final studio mission statement */}
          <p className="text-sm text-tx-secondary leading-relaxed mb-4">
            We&apos;re building graph-native software for astrology — tools that
            treat relationships between charts, people, and placements as
            first-class citizens. Nodes and edges, all the way down.
          </p>
          <p className="text-sm text-tx-tertiary leading-relaxed">
            Kairōs is our first product: an iOS astrology app that makes it
            easy to connect with the people who share your sky.
          </p>
        </div>

        {/* Decorative graph SVG */}
        <div className="flex items-center justify-center opacity-[0.15]">
          <svg
            width="160"
            height="160"
            viewBox="0 0 160 160"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="text-tx-primary"
          >
            <circle cx="80" cy="80" r="78" stroke="currentColor" strokeWidth="1" />
            <circle cx="80" cy="80" r="56" stroke="currentColor" strokeWidth="0.5" />
            <circle cx="80"  cy="4"   r="5" fill="currentColor" />
            <circle cx="148" cy="40"  r="4" fill="currentColor" />
            <circle cx="148" cy="120" r="5" fill="currentColor" />
            <circle cx="80"  cy="156" r="4" fill="currentColor" />
            <circle cx="12"  cy="120" r="5" fill="currentColor" />
            <circle cx="12"  cy="40"  r="4" fill="currentColor" />
            <line x1="80"  y1="4"   x2="148" y2="120" stroke="currentColor" strokeWidth="0.5" />
            <line x1="148" y1="120" x2="12"  y2="120" stroke="currentColor" strokeWidth="0.5" />
            <line x1="12"  y1="120" x2="80"  y2="4"   stroke="currentColor" strokeWidth="0.5" />
            <line x1="148" y1="40"  x2="12"  y2="40"  stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <line x1="80"  y1="156" x2="148" y2="40"  stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
            <line x1="80"  y1="156" x2="12"  y2="40"  stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
          </svg>
        </div>
      </div>
    </section>
  );
}
