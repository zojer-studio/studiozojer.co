import Link from "next/link";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getChangelogEntries } from "@/src/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog | studiozojer",
  description:
    "Release notes for Kairos, the iOS astrology app by studiozojer",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Changelog() {
  const entries = getChangelogEntries();

  return (
    <div className="min-h-screen pt-28 pb-16 px-8">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-display text-tx-primary mb-2">
          Changelog
        </h1>
        <p className="text-tx-secondary mb-12">Release notes for Kairos</p>

        <div className="space-y-12">
          {entries.map((entry) => (
            <article key={entry.version}>
              <header className="mb-4">
                <h2 className="text-2xl font-display text-tx-primary">
                  {entry.version}
                </h2>
                <p className="text-tx-primary font-semibold">{entry.title}</p>
                <time className="text-sm text-tx-tertiary">
                  {formatDate(entry.date)}
                </time>
              </header>
              <div className="prose-changelog text-tx-secondary">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {entry.content}
                </Markdown>
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-bd-secondary text-tx-tertiary text-sm flex gap-4">
          <Link
            href="/terms"
            className="hover:text-tx-primary transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="hover:text-tx-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </main>
    </div>
  );
}
