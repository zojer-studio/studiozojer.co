"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState, Suspense } from "react";

function UnsubscribeContent() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState<"loading" | "success" | "already" | "error" | "missing">(
    token ? "loading" : "missing"
  );

  useEffect(() => {
    if (!token) return;

    fetch(`https://api.kairos.solar/mail/unsubscribe/${token}`, {
      method: "POST",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) {
          setStatus(data.already ? "already" : "success");
        } else {
          setStatus("error");
        }
      })
      .catch(() => setStatus("error"));
  }, [token]);

  return (
    <div className="min-h-screen py-16 px-8">
      <main className="max-w-2xl mx-auto">
        <Link
          href="/"
          className="text-tx-secondary hover:text-tx-primary transition-colors text-sm mb-8 inline-block"
        >
          &larr; Back to home
        </Link>

        <h1 className="text-4xl font-display text-tx-primary mb-2">
          Unsubscribe
        </h1>

        <div className="mt-8 text-tx-body">
          {status === "loading" && (
            <p className="text-tx-secondary">Unsubscribing...</p>
          )}

          {status === "success" && (
            <div className="space-y-4">
              <p>You&apos;ve been unsubscribed from our mailing list.</p>
              <p className="text-tx-secondary">
                You won&apos;t receive any more emails from us. If this was a mistake,
                you can re-subscribe from <Link href="/" className="text-accent hover:underline">our website</Link>.
              </p>
            </div>
          )}

          {status === "already" && (
            <div className="space-y-4">
              <p>You&apos;re already unsubscribed.</p>
              <p className="text-tx-secondary">
                You won&apos;t receive any emails from us. If you&apos;d like to re-subscribe,
                visit <Link href="/" className="text-accent hover:underline">our website</Link>.
              </p>
            </div>
          )}

          {status === "error" && (
            <div className="space-y-4">
              <p className="text-tx-error">Something went wrong.</p>
              <p className="text-tx-secondary">
                The unsubscribe link may be invalid or expired. Please try again,
                or contact us at <a href="mailto:pageofswrds@zojer.studio" className="text-accent hover:underline">pageofswrds@zojer.studio</a>.
              </p>
            </div>
          )}

          {status === "missing" && (
            <div className="space-y-4">
              <p className="text-tx-secondary">
                No unsubscribe token found. If you followed a link from an email,
                it may have been incomplete. Please try clicking the link again,
                or contact us at <a href="mailto:pageofswrds@zojer.studio" className="text-accent hover:underline">pageofswrds@zojer.studio</a>.
              </p>
            </div>
          )}
        </div>

        <div className="mt-16 pt-8 border-t border-bd-secondary text-tx-tertiary text-sm flex gap-4">
          <Link href="/terms" className="hover:text-tx-primary transition-colors">
            Terms
          </Link>
          <span>&middot;</span>
          <Link href="/privacy" className="hover:text-tx-primary transition-colors">
            Privacy
          </Link>
          <span>&middot;</span>
          <Link href="/support" className="hover:text-tx-primary transition-colors">
            Support
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function UnsubscribePage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen py-16 px-8">
        <main className="max-w-2xl mx-auto">
          <h1 className="text-4xl font-display text-tx-primary mb-2">Unsubscribe</h1>
          <p className="mt-8 text-tx-secondary">Loading...</p>
        </main>
      </div>
    }>
      <UnsubscribeContent />
    </Suspense>
  );
}
