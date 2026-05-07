import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | studiozojer",
  description: "Terms of Service for Kairos, the iOS astrology app by studiozojer",
};

export default function TermsOfService() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-8">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-display text-tx-primary mb-2">
          Terms of Service
        </h1>
        <p className="text-tx-secondary mb-12">
          Last updated: January 18, 2026
        </p>

        <div className="space-y-10 text-tx-body">
          {/* Acceptance */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Acceptance of Terms
            </h2>
            <p className="mb-4">
              By downloading, installing, or using Kairos, you agree to these Terms of Service.
              If you don&apos;t agree, please don&apos;t use the app.
            </p>
            <p>
              You must be at least 13 years old to use Kairos.
            </p>
          </section>

          {/* Account */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Your Account
            </h2>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary">
              <li>You&apos;re responsible for keeping your login credentials secure</li>
              <li>One account per person</li>
              <li>Provide accurate information when creating your account</li>
            </ul>
          </section>

          {/* Your Data */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Your Data
            </h2>
            <p className="mb-4">
              Your chart data belongs to you. We store it using Apple CloudKit
              to provide the service. You can export or delete your data at any time using
              the app&apos;s backup and account features.
            </p>
            <p>
              See our <Link href="/privacy" className="underline hover:text-tx-primary transition-colors">Privacy Policy</Link> for
              details on how we handle your data.
            </p>
          </section>

          {/* Subscriptions & Purchases — commented out during beta, no purchases active
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Subscriptions & Purchases
            </h2>

            <h3 className="font-semibold text-tx-primary mt-6 mb-2">Free Tier</h3>
            <p className="text-tx-secondary">
              Create and save up to 3 charts with full app functionality.
            </p>

            <h3 className="font-semibold text-tx-primary mt-6 mb-2">Monthly Subscription ($6.99/month)</h3>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary">
              <li>Unlimited chart creation and saving</li>
              <li>Auto-renews until you cancel</li>
              <li>Cancel anytime via App Store settings</li>
              <li>No refunds for partial billing periods</li>
            </ul>

            <h3 className="font-semibold text-tx-primary mt-6 mb-2">Lifetime License ($30 one-time)</h3>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary">
              <li>Unlimited chart creation and saving for the lifetime of the app</li>
              <li>&ldquo;Lifetime&rdquo; refers to the product&apos;s lifespan, not the purchaser&apos;s</li>
              <li>Future features or major new functionality may require a separate purchase</li>
            </ul>

            <h3 className="font-semibold text-tx-primary mt-6 mb-2">Core Lifetime License (Account-Linked)</h3>
            <p className="text-tx-secondary mb-2">
              The Core Lifetime License requires a Kairos account and is linked to both your
              Apple ID (via the App Store) and your Kairos account.
            </p>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary">
              <li>Can be restored on any device by signing into the same Kairos account</li>
              <li>If you delete your Kairos account, the account link is permanently removed</li>
              <li>You can still restore the purchase via Apple using the same Apple ID, but it
                  cannot be re-linked to a new Kairos account</li>
            </ul>

            <h3 className="font-semibold text-tx-primary mt-6 mb-2">All Purchases</h3>
            <p className="text-tx-secondary">
              All purchases are processed through Apple&apos;s App Store. Refund requests
              are handled by Apple. Prices may vary by region.
            </p>
          </section>
          */}

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Intellectual Property
            </h2>
            <p className="text-tx-secondary">
              Kairos and its content, features, and functionality are owned by Studio Zojer, LLC
              and are protected by copyright and other intellectual property laws. You receive
              a limited, non-exclusive license to use the app for personal, non-commercial purposes.
            </p>
          </section>

          {/* Acceptable Use */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Acceptable Use
            </h2>
            <p className="mb-4">You agree not to:</p>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary">
              <li>Reverse-engineer or decompile the app</li>
              <li>Use the app for illegal purposes</li>
              <li>Attempt to access other users&apos; data</li>
              <li>Abuse or overload our services</li>
            </ul>
          </section>

          {/* Disclaimer */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Disclaimer
            </h2>
            <p className="mb-4">
              Kairos is for entertainment and personal insight purposes only.
            </p>
            <p className="text-tx-secondary mb-4">
              Astrological interpretations are not professional, medical, psychological,
              or financial advice. We make no guarantees about the accuracy of calculations
              or interpretations.
            </p>
            <p className="text-tx-secondary">
              The app is provided &ldquo;as is&rdquo; without warranty of any kind, express or implied,
              including but not limited to warranties of merchantability or fitness for a
              particular purpose.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Limitation of Liability
            </h2>
            <p className="text-tx-secondary">
              To the maximum extent permitted by law, Studio Zojer, LLC is not liable for
              indirect, incidental, or consequential damages arising from your use of Kairos.
              Our total liability is limited to the amount you paid us in the past 12 months.
            </p>
          </section>

          {/* Termination */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Termination
            </h2>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary">
              <li>You may delete your account at any time</li>
              <li>We may terminate accounts that violate these terms</li>
              <li>Upon termination, you retain the right to use the app and Apple&apos;s cloud services, but your access to studiozojer&apos;s online and social features ends</li>
            </ul>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Changes to These Terms
            </h2>
            <p className="text-tx-secondary">
              We may update these terms from time to time. Material changes will be
              communicated via app update notes or email. Continued use of Kairos
              after changes constitutes acceptance of the new terms.
            </p>
          </section>

          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Governing Law
            </h2>
            <p className="text-tx-secondary">
              These terms are governed by the laws of the State of Washington, United States.
              Any disputes will be resolved in the courts of Washington State.
            </p>
          </section>

          {/* Severability */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Severability
            </h2>
            <p className="text-tx-secondary">
              If any provision of these terms is found to be unenforceable, the remaining
              provisions will continue in full force and effect.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Contact
            </h2>
            <p className="text-tx-secondary">
              Questions about these terms? Contact us at{" "}
              <a
                href="mailto:pageofswrds@zojer.studio"
                className="underline hover:text-tx-primary transition-colors"
              >
                pageofswrds@zojer.studio
              </a>
            </p>
            <p className="text-tx-tertiary mt-4">
              Studio Zojer, LLC
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-bd-secondary text-tx-tertiary text-sm flex gap-4">
          <Link href="/privacy" className="hover:text-tx-primary transition-colors">
            Privacy Policy
          </Link>
          <Link href="/support" className="hover:text-tx-primary transition-colors">
            Support
          </Link>
        </div>
      </main>
    </div>
  );
}
