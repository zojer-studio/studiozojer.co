export function StudioSection() {
  return (
    <section
      id="studio"
      /* bg-base, not bg-dark: in the dark theme --light-150 (bg-card) and --light-300
         (bg-dark) are both `32 14% 15%`, so cards on bg-dark are invisible. Cards on
         bg-base read correctly in both themes — the pattern hub-section already uses. */
      className="bg-bg-base border-t border-bd-secondary px-8 py-20"
    >
      <div className="max-w-5xl mx-auto">
        {/* Studio mark, scheme-varied: cream can't carry the brand gold #F7B667, so
            light mode uses the accent (#173DFF) and dark keeps the gold. The accent
            side reads from the token; the gold is hardcoded because the site has no
            gold token yet — it should read from daoUI's primitive/gold-900 once the
            web token layer lands. */}
        <div className="flex justify-center mb-6 text-accent dark:text-[#F7B667]">
          {/* Inlined, not <Image>: currentColor does not cascade into an SVG
              loaded via <img src>, so a referenced file would render black in
              both themes. */}
          <svg
            width="64"
            height="67"
            viewBox="0 0 775 811"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
            className="h-16 w-auto"
          >
            <path
              d="M105 285.949C105.926 285.949 109.182 285.486 134.231 284.784C198.154 282.994 243.897 284.083 258.758 283.381C317.729 280.597 332.726 285.472 346.317 287.577C359.731 289.654 376.2 295.744 391.222 299.968C406.454 304.251 424.866 312.583 442.659 320.765C458.561 328.076 472.128 338.292 490.119 352.535C517.422 374.152 525.93 389.259 536.708 403.306C545.334 414.549 553.996 429.926 561.742 444.001C571.897 462.453 582.539 482.774 594.937 507.346C604.992 530.023 615.32 552.546 617.418 558.145C618.59 560.965 619.979 563.744 621.41 566.607"
              stroke="currentColor"
              strokeWidth="59.5483"
              strokeLinecap="round"
            />
            <path
              d="M293.953 583.31C295.158 582.707 311.45 569.739 342.879 543.328C375.045 516.299 393.458 495.987 399.842 488.238C408.658 477.537 426.828 452.919 440.042 433.736C449.067 420.636 459.211 405.887 468.499 391.737C477.657 377.783 487.229 357.194 491.197 344.094C495.166 330.991 494.553 319.131 494.411 308.327C494.113 285.536 482.717 267.697 476.626 255.51C465.106 232.462 443.138 216.831 437.353 210.885C430.063 203.394 414.28 191.899 403.12 184.557C397.513 180.32 391.997 176.329 387.44 173.744C385.294 172.667 383.486 172.064 379.796 170.53"
              stroke="currentColor"
              strokeWidth="59.5483"
              strokeLinecap="round"
            />
            <path
              d="M271.887 110.131C271.67 110.131 270.8 110.131 269.326 110.293C267.885 110.452 266.64 111.765 265.547 113.075C264.607 114.201 264.772 115.705 265.207 117.069C265.727 118.698 267.176 119.865 268.375 120.848C269.621 121.869 271.657 121.841 274.219 121.135C277.807 120.147 279.979 117.688 280.908 116.378C281.512 115.068 281.844 113.748 281.846 112.438C281.739 111.779 281.414 111.129 280.094 109.802"
              stroke="currentColor"
              strokeWidth="59.5483"
              strokeLinecap="round"
            />
            <path
              d="M654.318 675.964C654.013 675.659 652.788 675.654 650.79 676.191C648.893 676.699 647.395 679.033 645.703 681.949C643.659 685.474 643.841 689.506 644.301 692.427C644.724 695.119 646.3 697.215 647.913 698.83C649.404 700.324 652.604 700.764 656.523 701.15C660.272 701.519 664.158 699.701 667.391 697.166C669.897 695.202 669.723 691.997 669.954 689.617C670.228 686.791 669.27 683.987 667.428 681.681C666.349 680.595 664.976 679.68 663.811 679.056C662.647 678.432 661.732 678.127 660.789 678.275"
              stroke="currentColor"
              strokeWidth="59.5483"
              strokeLinecap="round"
            />
          </svg>
        </div>

        <p className="font-mono text-xs tracking-[0.14em] uppercase text-tx-tertiary text-center mb-3">
          The studio
        </p>
        <h2 className="text-3xl font-display text-tx-primary tracking-tight text-center mb-12">
          A small studio building divination software
        </h2>

        {/* Who → what → how, as three peers. The graph comes last because it is the
            mechanism, not the pitch — it explains how the first two hold together. */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-bg-card border border-bd-secondary rounded-xl p-6">
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-tx-tertiary mb-3">
              What we do
            </p>
            <h3 className="text-lg font-display text-tx-primary tracking-tight mb-3">
              Built for practitioners
            </h3>
            <p className="text-sm text-tx-secondary leading-relaxed">
              Professional-grade tools across astrology, tarot, and the I Ching —
              real ephemeris, traditional casting, and room for your own reading.
            </p>
          </div>

          <div className="bg-bg-card border border-bd-secondary rounded-xl p-6">
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-tx-tertiary mb-3">
              AT Protocol
            </p>
            <h3 className="text-lg font-display text-tx-primary tracking-tight mb-3">
              On the open social web
            </h3>
            {/* Identity portability is true today. Full data sovereignty is the
                direction, not the arrival — see private-protocols.md. Don't widen
                this claim without the architecture behind it. */}
            <p className="text-sm text-tx-secondary leading-relaxed">
              Sign in with your{" "}
              <a
                href="https://augment.ink/the-everything-account"
                target="_blank"
                rel="noopener noreferrer"
                className="underline hover:text-tx-primary transition-colors"
              >
                everything account
              </a>
              . Your handle and identity are yours — portable across the network,
              not lent to you by us.
            </p>
          </div>

          <div className="bg-bg-card border border-bd-secondary rounded-xl p-6">
            <p className="font-mono text-xs tracking-[0.14em] uppercase text-tx-tertiary mb-3">
              Graph-based architecture
            </p>
            <h3 className="text-lg font-display text-tx-primary tracking-tight mb-3">
              Journal to the rhythms of the sky
            </h3>
            <p className="text-sm text-tx-secondary leading-relaxed">
              Charts, hexagrams, cards, and everything you write about them are
              nodes in one graph — so a tarot pull and a transit can sit in the
              same record. Reflect on your life in planetary time instead of a
              corporate calendar.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
