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
 * The reserved slug kairos.admin's builder iframes.
 *
 * A form being authored has no saved definition to fetch — and for one being created it
 * has no slug at all. So the builder points at this instead: a shell that renders nothing
 * until the admin postMessages the in-progress fields into it. The preview therefore
 * shows what you are EDITING rather than what is saved, which is what a live preview is
 * for.
 *
 * The leading underscore is what makes it safe: the backend's slug pattern is
 * /^[a-z0-9][a-z0-9-]*$/, so no real form can ever be named this.
 */
const PREVIEW_SLUG = "_preview";

const EMPTY_PREVIEW = {
  id: "preview",
  slug: PREVIEW_SLUG,
  title: "",
  description: null,
  status: "draft" as const,
  current_version: 0,
  fields: [],
};

/**
 * Resolve a form, honouring preview mode.
 *
 * A draft is only ever rendered behind a valid, unexpired preview token, signed by
 * kairos.admin with a key derived from the API key both apps share. Without one, a draft
 * is a 404 — exactly as if it did not exist.
 */
async function resolve(slug: string, previewToken: string | undefined) {
  const isPreview = verifyPreviewToken(slug, previewToken);

  if (slug === PREVIEW_SLUG) {
    // No token, no shell. Otherwise anyone could open an empty form page.
    return { form: isPreview ? EMPTY_PREVIEW : null, isPreview };
  }

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
            Preview — submissions disabled
          </p>
        )}

        {/* In preview mode the title and description are live too, so the renderer owns
            them — it is the thing holding the postMessage state. Rendering them here
            would freeze them at whatever the server sent. */}
        {!isPreview && (
          <>
            <h1 className="text-4xl font-display text-tx-primary mb-2">
              {form.title}
            </h1>
            {form.description && (
              <p className="text-tx-secondary mb-12">{form.description}</p>
            )}
          </>
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
