import { Button } from "@/src/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/src/components/ui/card";
import { ThemeToggle } from "@/src/components/theme-toggle";

export default function Home() {
  return (
    <div className="min-h-screen p-8 pb-20 sm:p-20">
      <header className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-tx-primary">Zojer Studio</h1>
        <ThemeToggle />
      </header>

      <main className="max-w-4xl mx-auto space-y-12">
        {/* Hero Section */}
        <section className="space-y-4">
          <h2 className="text-5xl font-bold text-tx-primary font-display">
            Design System Demo
          </h2>
          <p className="text-xl text-tx-secondary">
            Typography, color tokens, and multi-theme architecture
          </p>
        </section>

        {/* Typography Showcase */}
        <section className="space-y-6">
          <h3 className="text-2xl font-semibold text-tx-primary border-b border-bd-primary pb-2">
            Typography System
          </h3>

          {/* Font Families */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-tx-primary">Font Families</h4>
            <div className="space-y-3">
              <div className="p-4 bg-bg-card border border-bd-primary rounded-lg">
                <p className="text-xs text-tx-tertiary mb-1">Whyte (Sans-serif)</p>
                <p className="text-xl font-sans">The quick brown fox jumps over the lazy dog</p>
                <p className="text-sm text-tx-secondary mt-1">Default body text • Regular 400</p>
              </div>

              <div className="p-4 bg-bg-card border border-bd-primary rounded-lg">
                <p className="text-xs text-tx-tertiary mb-1">Whyte Inktrap (Display)</p>
                <p className="text-xl font-display">The quick brown fox jumps over the lazy dog</p>
                <p className="text-sm text-tx-secondary mt-1">Headings and emphasis • Regular 400</p>
              </div>

              <div className="p-4 bg-bg-card border border-bd-primary rounded-lg">
                <p className="text-xs text-tx-tertiary mb-1">Fraktion Mono (Monospace)</p>
                <p className="text-xl font-mono">The quick brown fox jumps over the lazy dog</p>
                <p className="text-sm text-tx-secondary mt-1">Code and technical content • Light 300, Regular 400, Bold 700</p>
              </div>
            </div>
          </div>

          {/* Type Scale */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-tx-primary">Type Scale (Portfolio-React)</h4>
            <div className="space-y-3">
              <div className="flex items-baseline gap-4 pb-2 border-b border-bd-secondary">
                <span className="font-mono text-xs text-tx-tertiary w-16">xs</span>
                <p className="text-xs-custom text-tx-primary">
                  0.813rem / 1rem — Extra small text for labels
                </p>
              </div>
              <div className="flex items-baseline gap-4 pb-2 border-b border-bd-secondary">
                <span className="font-mono text-xs text-tx-tertiary w-16">sm</span>
                <p className="text-sm-custom text-tx-primary">
                  1rem / 1.5rem — Body text and paragraphs
                </p>
              </div>
              <div className="flex items-baseline gap-4 pb-2 border-b border-bd-secondary">
                <span className="font-mono text-xs text-tx-tertiary w-16">md</span>
                <p className="text-md-custom text-tx-primary">
                  1.25rem / 2rem — Subheadings and emphasis
                </p>
              </div>
              <div className="flex items-baseline gap-4 pb-2 border-b border-bd-secondary">
                <span className="font-mono text-xs text-tx-tertiary w-16">lg</span>
                <p className="text-lg-custom text-tx-primary">
                  1.625rem / 2.625rem — Section headings
                </p>
              </div>
              <div className="flex items-baseline gap-4 pb-2 border-b border-bd-secondary">
                <span className="font-mono text-xs text-tx-tertiary w-16">xl</span>
                <p className="text-xl-custom text-tx-primary">
                  2.063rem / 3.25rem — Page headings
                </p>
              </div>
            </div>
            <p className="text-xs text-tx-tertiary italic">
              All sizes include 0.02rem letter-spacing
            </p>
          </div>

          {/* Text Color Hierarchy */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-tx-primary">Color Hierarchy</h4>
            <div className="space-y-2">
              <p className="text-tx-primary">Primary text (100% opacity) — Main content and headings</p>
              <p className="text-tx-body">Body text (95% opacity) — Paragraph content</p>
              <p className="text-tx-secondary">Secondary text (70% opacity) — Supporting information</p>
              <p className="text-tx-tertiary">Tertiary text (50% opacity) — Subtle hints and labels</p>
              <p className="text-tx-disabled">Disabled text (22% opacity) — Inactive elements</p>
            </div>
          </div>

          {/* Display Typography */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-tx-primary">Display Typography</h4>
            <div className="space-y-4 p-6 bg-bg-card border border-bd-primary rounded-lg">
              <h1 className="text-5xl font-display text-tx-primary">Large Display Heading</h1>
              <h2 className="text-4xl font-display text-tx-primary">Medium Display Heading</h2>
              <h3 className="text-3xl font-display text-tx-primary">Small Display Heading</h3>
              <p className="text-md-custom text-tx-secondary">
                Whyte Inktrap is designed for large sizes with optical adjustments that enhance readability at display scales.
              </p>
            </div>
          </div>
        </section>

        {/* Button Variants */}
        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-tx-primary border-b border-bd-primary pb-2">
            Buttons
          </h3>
          <div className="flex flex-wrap gap-4">
            <Button variant="default">Default</Button>
            <Button variant="accent">Accent</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="link">Link</Button>
            <Button variant="destructive">Destructive</Button>
          </div>
          <div className="flex flex-wrap gap-4">
            <Button size="sm">Small</Button>
            <Button size="default">Default</Button>
            <Button size="lg">Large</Button>
          </div>
        </section>

        {/* Card Components */}
        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-tx-primary border-b border-bd-primary pb-2">
            Cards
          </h3>
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Alpha</CardTitle>
                <CardDescription>Visual identity and web design</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-tx-secondary">
                  A comprehensive brand identity project featuring custom typography,
                  color systems, and responsive web design.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Project</Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Project Beta</CardTitle>
                <CardDescription>UI/UX design system</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-tx-secondary">
                  A scalable design system with reusable components and
                  comprehensive documentation.
                </p>
              </CardContent>
              <CardFooter>
                <Button variant="outline">View Project</Button>
              </CardFooter>
            </Card>
          </div>
        </section>

        {/* Color Tokens Demo */}
        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-tx-primary border-b border-bd-primary pb-2">
            Semantic Color Tokens
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-bg-base border border-bd-primary"></div>
              <p className="text-sm text-tx-secondary">bg-base</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-bg-card border border-bd-primary"></div>
              <p className="text-sm text-tx-secondary">bg-card</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-bg-hover border border-bd-primary"></div>
              <p className="text-sm text-tx-secondary">bg-hover</p>
            </div>
            <div className="space-y-2">
              <div className="h-20 rounded-lg bg-bg-pressed border border-bd-primary"></div>
              <p className="text-sm text-tx-secondary">bg-pressed</p>
            </div>
          </div>
        </section>

        {/* Semantic Colors */}
        <section className="space-y-4">
          <h3 className="text-2xl font-semibold text-tx-primary border-b border-bd-primary pb-2">
            Semantic Colors
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-success/10 border border-success">
              <p className="text-success font-semibold">Success</p>
            </div>
            <div className="p-4 rounded-lg bg-warning/10 border border-warning">
              <p className="text-warning font-semibold">Warning</p>
            </div>
            <div className="p-4 rounded-lg bg-error/10 border border-error">
              <p className="text-error font-semibold">Error</p>
            </div>
            <div className="p-4 rounded-lg bg-info/10 border border-info">
              <p className="text-info font-semibold">Info</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
