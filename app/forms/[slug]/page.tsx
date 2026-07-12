import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

import { FormRenderer } from "@/src/components/form-renderer";
import { fetchForm, verifyPreviewToken } from "@/src/lib/forms-server";

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ preview?: string }>;
}

/**
 * Resolve a form, honouring preview mode.
 *
 * A draft is only ever rendered behind a valid, unexpired preview token — which
 * kairos.admin signs with a shared secret. Without one, a draft is a 404, exactly as if
 * it did not exist.
 */
async function resolve(slug: string, previewToken: string | undefined) {
  const isPreview = verifyPreviewToken(slug, previewToken);
  const form = await fetchForm(slug, { draft: isPreview });
  return { form, isPreview };
}

export async function generateMetadata({
  params,
  searchParams,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const { preview } = await searchParams;
  const { form } = await resolve(slug, preview);

  if (!form) return { title: "Not found | studiozojer" };

  return {
    title: `${form.title} | studiozojer`,
    description: form.description ?? undefined,
    // A form is a transaction, not a document. Nothing here belongs in an index.
    robots: { index: false, follow: false },
  };
}

export default async function FormPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { preview } = await searchParams;
  const { form, isPreview } = await resolve(slug, preview);

  if (!form) notFound();

  return (
    <div className="min-h-screen pt-28 pb-16 px-8">
      <main className="max-w-2xl mx-auto">
        {isPreview && (
          <p className="mb-6 rounded-md border border-bd-warning bg-bg-warning px-3 py-2 font-mono text-xs uppercase tracking-[0.14em] text-tx-warning">
            Preview · {form.status} · v{form.current_version}
          </p>
        )}

        <h1 className="text-4xl font-display text-tx-primary mb-2">
          {form.title}
        </h1>
        {form.description && (
          <p className="text-tx-secondary mb-12">{form.description}</p>
        )}

        <FormRenderer definition={form} previewMode={isPreview} />

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
