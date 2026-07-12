import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | studiozojer",
  description: "Privacy Policy for Kairos, the iOS astrology app by studiozojer",
};

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-8">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-display text-tx-primary mb-2">
          Privacy Policy
        </h1>
        <p className="text-tx-secondary mb-12">
          Last updated: March 8, 2026
        </p>

        <div className="space-y-10 text-tx-body">
          {/* Intro */}
          <section>
            <p className="mb-4">
              Kairos is built by Studio Zojer, LLC. We believe in minimal data collection
              and transparency about what we do collect. This policy explains how we
              handle your information.
            </p>
            <p>
              It covers two different things, and the difference matters:{" "}
              <strong className="text-tx-primary">the Kairos app</strong>, which you
              install on your device, and{" "}
              <strong className="text-tx-primary">this website</strong>{" "}
              (studiozojer.co), where you might read a changelog, join our mailing list,
              or answer a survey. Where a section applies to only one of them, it says so.
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
                  authentication only. Stored securely on our own servers.
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
                <h3 className="font-semibold text-tx-primary">Analytics</h3>
                <p className="text-tx-secondary">
                  If you opt in during onboarding, we collect anonymous usage data to help
                  improve the app. This includes which features you use (such as creating
                  charts, viewing transits, or navigating aspects), app session duration,
                  screen views, onboarding progress, and error reports. Each device is
                  identified by a random anonymous ID. If you choose to link analytics with your account, events
                  will be associated with your user identity. Analytics data is stored securely on our
                  own servers &ndash; it is never sent to a third-party analytics service.
                  We do not track your IP address, location, browser fingerprint, or
                  advertising identifiers.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-tx-primary">Feedback</h3>
                <p className="text-tx-secondary">
                  When you submit feedback through the app, we collect your feedback message
                  and selected category. Optionally, you may provide contact information
                  (email, phone, or social handle) and a vibe rating. We also automatically
                  capture device information: app version, iOS version, device model, and
                  submission time. Feedback data is stored securely on our own servers. We use
                  this to improve the app and may contact you if you provided contact details.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-tx-primary">
                  Mailing List <span className="font-normal text-tx-tertiary">(website)</span>
                </h3>
                <p className="text-tx-secondary">
                  If you enter your email address to join our mailing list, we store that
                  address on our own servers so we can send you occasional updates. Every
                  email we send includes a one-click unsubscribe link, and unsubscribing
                  removes you from the list.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-tx-primary">
                  Surveys &amp; Forms <span className="font-normal text-tx-tertiary">(website)</span>
                </h3>
                <p className="text-tx-secondary">
                  If you fill in a form or survey on this website, we store your answers on
                  our own servers. Forms are hosted by us &ndash; your answers are not sent
                  to Google Forms, Typeform, or any other third-party form service. If a
                  form asks for your email address, we only add you to our mailing list when
                  you explicitly tick the box asking us to; leaving your address without
                  ticking it subscribes you to nothing.
                </p>
                <p className="text-tx-secondary mt-2">
                  When you submit a form we use your IP address{" "}
                  <strong className="text-tx-primary">transiently</strong>, to stop
                  automated abuse. It is cryptographically hashed before it is written
                  anywhere, it is never stored alongside your answers, and the record is
                  deleted within minutes. We do not log or retain your IP address.
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
              <li>No advertising identifiers</li>
              <li>
                <strong className="text-tx-primary">In the app:</strong> no IP address or
                browser fingerprint tracking, and no third-party analytics &ndash; all app
                analytics stay on our own servers
              </li>
              <li>
                <strong className="text-tx-primary">On this website:</strong> we use Vercel
                Analytics for aggregate page-view counts (see Third-Party Services below).
                We do not log your IP address, and we do not fingerprint, profile, or track
                you across other sites
              </li>
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
                    <td className="py-2">Our own servers (self-hosted, US-based)</td>
                  </tr>
                  <tr className="border-b border-bd-secondary">
                    <td className="py-2 pr-4">Charts & preferences</td>
                    <td className="py-2">Apple CloudKit</td>
                  </tr>
                  <tr className="border-b border-bd-secondary">
                    <td className="py-2 pr-4">Backup files</td>
                    <td className="py-2">Your iCloud Drive</td>
                  </tr>
                  <tr className="border-b border-bd-secondary">
                    <td className="py-2 pr-4">Feedback</td>
                    <td className="py-2">Our own servers (self-hosted, US-based)</td>
                  </tr>
                  <tr className="border-b border-bd-secondary">
                    <td className="py-2 pr-4">App analytics (if opted in)</td>
                    <td className="py-2">Our own servers (self-hosted, US-based)</td>
                  </tr>
                  <tr className="border-b border-bd-secondary">
                    <td className="py-2 pr-4">Mailing list (email address)</td>
                    <td className="py-2">Our own servers (self-hosted, US-based)</td>
                  </tr>
                  <tr className="border-b border-bd-secondary">
                    <td className="py-2 pr-4">Survey &amp; form responses</td>
                    <td className="py-2">Our own servers (self-hosted, US-based)</td>
                  </tr>
                  <tr>
                    <td className="py-2 pr-4">Website page views</td>
                    <td className="py-2">Vercel Analytics (aggregate, no IP logging)</td>
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
              We use the following services to operate Kairos and this website:
            </p>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary">
              <li>
                <strong>Apple</strong> <span className="text-tx-tertiary">(app)</span>{" "}
                &ndash; CloudKit, StoreKit, Sign in with Apple.{" "}
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
                <strong>Vercel</strong> <span className="text-tx-tertiary">(website)</span>{" "}
                &ndash; hosting for studiozojer.co, and Vercel Analytics for aggregate
                page-view counts.{" "}
                <a
                  href="https://vercel.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-tx-primary transition-colors"
                >
                  Their privacy policy
                </a>
              </li>
              <li>
                <strong>Resend</strong> <span className="text-tx-tertiary">(email)</span>{" "}
                &ndash; delivers the emails we send you. They see your email address in
                order to deliver mail to it.{" "}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-tx-primary transition-colors"
                >
                  Their privacy policy
                </a>
              </li>
            </ul>
            <p className="mt-4 text-tx-secondary">
              Everything else &ndash; account data, app analytics, feedback, mailing list
              addresses, and survey responses &ndash; is stored on our own self-hosted
              servers, and no third-party service has access to it.
            </p>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Data Security
            </h2>
            <p className="text-tx-secondary">
              Your data is protected by Apple&apos;s security infrastructure for CloudKit
              data, and by our own self-hosted servers for account, analytics, feedback,
              mailing list, and survey data. Our servers are secured with encrypted
              connections and access controls, and all data is transmitted over encrypted
              connections (HTTPS). Apart from the services named above &ndash; and only for
              the purposes named there &ndash; no third party has access to this data.
            </p>
          </section>

          {/* Data Retention & Deletion */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Data Retention & Deletion
            </h2>
            <ul className="list-disc list-inside space-y-2 text-tx-secondary">
              <li>
                <strong>Delete your account:</strong> Removes your authentication and any linked analytics data from our servers
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
              Studio Zojer, LLC
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
