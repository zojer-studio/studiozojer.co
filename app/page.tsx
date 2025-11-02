import Link from "next/link";
import Image from "next/image";

export default function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <main className="max-w-2xl text-center space-y-8 my-24">
        <div className="flex flex-col gap-2">
          <h1 className="text-6xl font-display text-tx-primary">
            Kairōs
          </h1>
          <h3>
            by Zojer Studio
          </h3>
          <p>(sorry this site is in progress lol)</p>

        </div>
        
        <div className="flex justify-center">
          <Image
            src="/images/promo1.png"
            alt="Zojer Studio promotional image"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
        
        {/* <p className="text-xl text-tx-secondary">
          Design studio portfolio — Coming soon
        </p> */}
        {/* <Link
          href="/design-system"
          className="inline-block px-6 py-3 bg-bg-button text-tx-button rounded-lg hover:bg-dark transition-colors"
        >
          View Design System
        </Link> */}

        <div className="ml-embedded" data-form="woEybi"></div>
      </main>
    </div>
  );
}
