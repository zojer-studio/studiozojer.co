import Link from "next/link";

// Our own form, on our own servers. Was a Google Form — the last place on this site that
// handed a visitor's answers to a third party.
const SURVEY_URL = "/forms/kairos-2026-survey";

export function HubSection() {
  return (
    <section
      id="hub"
      className="border-t border-bd-secondary px-8 py-20 bg-bg-base"
    >
      <div className="max-w-3xl mx-auto">
        <Link
          href={SURVEY_URL}
          className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-6 bg-bg-card border border-bd-secondary rounded-xl p-6 hover:bg-bg-card-hover transition-colors group"
        >
          <div>
            {/* h2, not h3 — with the section's own heading gone, this is the only
                heading in the section and shouldn't skip a level. */}
            <h2 className="text-sm font-semibold text-tx-primary mb-1">
              Shape what we build next
            </h2>
            <p className="text-sm text-tx-secondary leading-relaxed">
              Take a 3-minute survey and help us understand what matters to you
              most about astrology apps.
            </p>
          </div>
          <span className="self-end sm:self-auto bg-bg-button text-tx-button text-sm px-4 py-2 rounded-lg whitespace-nowrap flex-shrink-0 group-hover:bg-bg-button-hover transition-colors">
            Take the survey →
          </span>
        </Link>
      </div>
    </section>
  );
}
