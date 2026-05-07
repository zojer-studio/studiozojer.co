import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Support | studiozojer",
  description: "Get help with Kairos, the iOS astrology app by studiozojer",
};

export default function Support() {
  return (
    <div className="min-h-screen pt-28 pb-16 px-8">
      <main className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-display text-tx-primary mb-2">
          Support
        </h1>
        <p className="text-tx-secondary mb-12">
          Help and answers for Kairos
        </p>

        <div className="space-y-10 text-tx-body">
          {/* Getting Started */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Getting Started
            </h2>
            <div className="space-y-4 text-tx-secondary">
              <div>
                <h3 className="font-semibold text-tx-primary">Creating a Chart</h3>
                <p>
                  Tap the + button to create a new chart. Enter the name, date,
                  time, and location. Kairos will calculate the chart automatically.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-tx-primary">Chart Limit</h3>
                <p>
                  Free users can save up to 3 charts. Subscribe or purchase a lifetime
                  license for unlimited charts.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-tx-primary">Transit Charts</h3>
                <p>
                  Tap-and-hold on the + button to access special actions. Drag to the
                  &ldquo;Current&rdquo;/&ldquo;Transits&rdquo; slot, then release.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-tx-primary">Configure Marking Menus</h3>
                <p>
                  Some buttons have hidden menus that can be accessed with tap-hold-drag-release.
                  Go to settings to configure each slot individually.
                </p>
              </div>
            </div>
          </section>

          {/* Account & Sign In */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Account & Sign In
            </h2>
            <div className="space-y-4 text-tx-secondary">
              <div>
                <h3 className="font-semibold text-tx-primary">Creating an Account</h3>
                <p>
                  You can sign in with Apple or create an account with your email.
                  An account is required to sync your charts across devices.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-tx-primary">Deleting Your Account</h3>
                <p>
                  Go to Settings &rarr; Account &rarr; Delete Account. This removes your
                  authentication data. Your chart data in iCloud can be managed separately
                  through your device&apos;s iCloud settings.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-tx-primary">Sign In Issues</h3>
                <p>
                  If you&apos;re having trouble signing in, make sure you&apos;re using the same
                  method (Apple or email) you originally used. Try signing out and back in,
                  or restart the app.
                </p>
              </div>
            </div>
          </section>

          {/* Subscriptions & Purchases — commented out during beta, no purchases active
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Subscriptions & Purchases
            </h2>
            <div className="space-y-4 text-tx-secondary">
              <div>
                <h3 className="font-semibold text-tx-primary">Restore Purchases</h3>
                <p>
                  Go to Settings &rarr; Restore Purchases. Make sure you&apos;re signed into
                  the same Apple ID you used for the original purchase.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-tx-primary">Cancel Subscription</h3>
                <p>
                  Subscriptions are managed through the App Store. Go to Settings &rarr;
                  [Your Name] &rarr; Subscriptions on your iPhone, or manage at{" "}
                  <a
                    href="https://apps.apple.com/account/subscriptions"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-tx-primary transition-colors"
                  >
                    apps.apple.com/account/subscriptions
                  </a>
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-tx-primary">Request a Refund</h3>
                <p>
                  Refunds are handled by Apple. Visit{" "}
                  <a
                    href="https://reportaproblem.apple.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="underline hover:text-tx-primary transition-colors"
                  >
                    reportaproblem.apple.com
                  </a>
                  {" "}to request a refund for any App Store purchase.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-tx-primary">Lifetime License</h3>
                <p>
                  The Core Lifetime License is linked to both your Apple ID and Kairos account.
                  If you delete your Kairos account, you can still restore via Apple, but it
                  cannot be re-linked to a new account.
                </p>
              </div>
            </div>
          </section>
          */}

          {/* Charts & Data */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Charts & Data
            </h2>
            <div className="space-y-4 text-tx-secondary">
              <div>
                <h3 className="font-semibold text-tx-primary">Syncing Charts</h3>
                <p>
                  Charts sync automatically via Apple CloudKit when you&apos;re signed in.
                  Make sure iCloud is enabled for Kairos in your device settings.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-tx-primary">Backup & Export</h3>
                <p>
                  Go to Settings &rarr; Backup to export your charts. Backups are saved
                  to your personal iCloud Drive and can be restored at any time.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-tx-primary">Delete Chart Data</h3>
                <p>
                  Swipe left on any chart to delete it. To delete all chart data,
                  you can also manage Kairos data in your iCloud settings.
                </p>
              </div>
            </div>
          </section>

          {/* Troubleshooting */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Troubleshooting
            </h2>
            <div className="space-y-4 text-tx-secondary">
              <div>
                <h3 className="font-semibold text-tx-primary">Charts Not Syncing</h3>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Check that iCloud is enabled for Kairos in Settings &rarr; [Your Name] &rarr; iCloud</li>
                  <li>Make sure you have an internet connection</li>
                  <li>Try signing out and back into your Kairos account</li>
                  <li>Restart the app</li>
                  <li>After reinstalling, it may take up to 10 minutes for charts to sync and load</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-tx-primary">App Crashing</h3>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Make sure you&apos;re running the latest version of Kairos</li>
                  <li>Restart your device</li>
                  <li>If the issue persists, try deleting and reinstalling the app (your data will sync back from iCloud, which may take up to 10 minutes)</li>
                </ul>
              </div>
              {/* Purchase Not Recognized — commented out during beta, no purchases active
              <div>
                <h3 className="font-semibold text-tx-primary">Purchase Not Recognized</h3>
                <ul className="list-disc list-inside space-y-1 mt-2">
                  <li>Tap Settings &rarr; Restore Purchases</li>
                  <li>Make sure you&apos;re signed into the correct Apple ID</li>
                  <li>Wait a few minutes and try again &ndash; App Store can be slow</li>
                </ul>
              </div>
              */}
            </div>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-display text-tx-primary mb-4">
              Contact Us
            </h2>
            <p className="text-tx-secondary mb-4">
              Can&apos;t find what you&apos;re looking for? We&apos;re here to help.
            </p>
            <p className="text-tx-secondary">
              Email us at{" "}
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
          <Link href="/privacy" className="hover:text-tx-primary transition-colors">
            Privacy Policy
          </Link>
        </div>
      </main>
    </div>
  );
}
