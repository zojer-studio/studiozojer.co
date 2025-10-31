import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <main className="max-w-2xl text-center space-y-8">
        <h1 className="text-6xl font-display text-tx-primary">
          Zojer Studio
        </h1>
        <p className="text-xl text-tx-secondary">
          Design studio portfolio — Coming soon
        </p>
        <Link
          href="/design-system"
          className="inline-block px-6 py-3 bg-bg-button text-tx-button rounded-lg hover:bg-dark transition-colors"
        >
          View Design System
        </Link>
      </main>
    </div>
  );
}
