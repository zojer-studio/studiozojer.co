import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Zojer Studio",
  description: "Privacy Policy for Kairos, the iOS astrology app by Zojer Studio",
};

export default function PrivacyPolicy() {
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
          Privacy Policy
        </h1>
        <p className="text-tx-secondary mb-12">
          Last updated: January 25, 2026
        </p>

        <div className="space-y-10 text-tx-body">
          {/* Intro */}
          <section>
            <p>
              Kairos is built by Zojer Studio LLC. We believe in minimal data collection
              and transparency about what we do collect. This policy explains how we
              handle your information.
            </p>
          </section>

          {/* What We Collect */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              What We Collect
            </h2>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-tx-primary">Account Information</h3>
                <p className="text-tx-secondary">
                  Your email address or Apple ID (if you sign in with Apple). Used for
                  authentication only. Stored in Supabase.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-tx-primary">Chart Data</h3>
                <p className="text-tx-secondary">
                  Chart names, dates, times, chart locations, and related metadata.
                  Stored in Apple CloudKit.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-tx-primary">Display Preferences</h3>
                <p className="text-tx-secondary">
                  How you customize chart appearance. Stored in Apple CloudKit.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-tx-primary">Backup Files</h3>
                <p className="text-tx-secondary">
                  Only created when you choose to export. Stored in your personal iCloud Drive,
                  which you control.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-tx-primary">Feedback</h3>
                <p className="text-tx-secondary">
                  When you submit feedback through the app, we collect your feedback message
                  and selected category. Optionally, you may provide contact information
                  (email, phone, or social handle) and a vibe rating. We also automatically
                  capture device information: app version, iOS version, device model, and
                  submission time. Feedback data is stored in Airtable (US-based). We use
                  this to improve the app and may contact you if you provided contact details.
                </p>
              </div>
            </div>
          </section>

          {/* Photo Library Access */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Photo Library Access
            </h2>
            <p className="mb-4">
              You can save chart screenshots to your photo library by tapping &ldquo;Save to Photos.&rdquo;
              This is optional and only happens when you initiate it.
            </p>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary">
              <li>We only <strong>add</strong> screenshots to your library &ndash; we never read or access your existing photos</li>
              <li>Screenshots are saved to a &ldquo;Kairōs&rdquo; album</li>
              <li>No photos are uploaded or transmitted anywhere &ndash; they stay on your device</li>
            </ul>
          </section>

          {/* What We Don't Collect */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              What We Don&apos;t Collect
            </h2>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary">
              <li>No analytics or usage tracking</li>
              <li>No advertising identifiers</li>
              <li>No location tracking (chart locations are what you enter, not GPS)</li>
              <li>We don&apos;t sell or share your data with third parties</li>
            </ul>
          </section>

          {/* Where Your Data Lives */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Where Your Data Lives
            </h2>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-tx-secondary">
                <thead>
                  <tr className="border-b border-bd-secondary">
                    <th className="py-2 pr-4 text-tx-primary font-semibold">Data</th>
                    <th className="py-2 text-tx-primary font-semibold">Location</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-bd-secondary">
                    <td className="py-2 pr-4">Account (email/Apple ID)</td>
                    <td className="py-2">Supabase (US-based)</td>
                  </tr>
                  <tr className="border-b border-bd-secondary">
                    <td className="py-2 pr-4">Charts & preferences</td>
                    <td className="py-2">Apple CloudKit</td>
                  </tr>
                  <tr className="border-b border-bd-secondary">
                    <td className="py-2 pr-4">Backup files</td>
                    <td className="py-2">Your iCloud Drive</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Feedback</td>
                    <td className="py-2">Airtable (US-based)</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Third-Party Services */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Third-Party Services
            </h2>
            <p className="mb-4">
              We use the following services to operate Kairos:
            </p>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary">
              <li>
                <strong>Supabase</strong> &ndash; Authentication infrastructure.{" "}
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-tx-primary transition-colors"
                >
                  Their privacy policy
                </a>
              </li>
              <li>
                <strong>Apple</strong> &ndash; CloudKit, StoreKit, Sign in with Apple.{" "}
                <a
                  href="https://www.apple.com/legal/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-tx-primary transition-colors"
                >
                  Their privacy policy
                </a>
              </li>
              <li>
                <strong>Airtable</strong> &ndash; Feedback storage.{" "}
                <a
                  href="https://www.airtable.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-tx-primary transition-colors"
                >
                  Their privacy policy
                </a>
              </li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Data Security
            </h2>
            <p className="text-tx-secondary">
              Your data is protected by Supabase&apos;s, Apple&apos;s, and Airtable&apos;s security infrastructure.
              All data is transmitted over encrypted connections (HTTPS).
            </p>
          </section>

          {/* Data Retention & Deletion */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Data Retention & Deletion
            </h2>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary">
              <li>
                <strong>Delete your account:</strong> Removes your authentication data from Supabase
              </li>
              <li>
                <strong>Delete chart data:</strong> Use the app or your iCloud settings
              </li>
              <li>
                We don&apos;t retain your data after deletion (processing may take up to 30 days)
              </li>
            </ul>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Your Rights
            </h2>
            <p className="mb-4">You can:</p>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary mb-6">
              <li><strong>Access</strong> your data in the app</li>
              <li><strong>Export</strong> your data using the backup feature</li>
              <li><strong>Delete</strong> your account and data</li>
            </ul>

            <h3 className="font-semibold text-tx-primary mt-6 mb-2">For EU Users (GDPR)</h3>
            <p className="text-tx-secondary">
              Your data is processed in the United States. You have the right to access,
              correct, and delete your personal data. Contact us to exercise these rights.
            </p>

            <h3 className="font-semibold text-tx-primary mt-6 mb-2">For California Users (CCPA)</h3>
            <p className="text-tx-secondary">
              We don&apos;t sell personal information.
            </p>
          </section>

          {/* Children's Privacy */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Children&apos;s Privacy
            </h2>
            <p className="text-tx-secondary">
              Kairos is intended for users 13 and older. We don&apos;t knowingly collect
              personal information from children under 13. If you believe we have
              collected such information, please contact us.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Changes to This Policy
            </h2>
            <p className="text-tx-secondary">
              We may update this policy from time to time. Material changes will be
              communicated via app update notes or email. Continued use of Kairos
              after changes constitutes acceptance of the updated policy.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Contact
            </h2>
            <p className="text-tx-secondary">
              Questions about this policy? Contact us at{" "}
              <a
                href="mailto:pageofswrds@zojer.studio"
                className="underline hover:text-tx-primary transition-colors"
              >
                pageofswrds@zojer.studio
              </a>
            </p>
            <p className="text-tx-tertiary mt-4">
              Zojer Studio LLC
            </p>
          </section>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-bd-secondary text-tx-tertiary text-sm flex gap-4">
          <Link href="/terms" className="hover:text-tx-primary transition-colors">
            Terms of Service
          </Link>
          <Link href="/support" className="hover:text-tx-primary transition-colors">
            Support
          </Link>
        </div>
      </main>
    </div>
  );
}
