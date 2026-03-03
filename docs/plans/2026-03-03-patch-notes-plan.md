# Patch Notes Page Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Add a `/changelog` page to zojer.studio that displays Kairos iOS app release notes in a scrollable timeline.

**Architecture:** Server-rendered Next.js page that reads `.md` files from `content/changelog/` at build time using `gray-matter` for frontmatter parsing and `react-markdown` for rendering. Follows existing page patterns (layout, styling, footer).

**Tech Stack:** Next.js 16 App Router, React 19, gray-matter, react-markdown, remark-gfm, Tailwind CSS 4

---

### Task 1: Copy release notes into content/changelog/

**Files:**
- Create: `content/changelog/*.md` (all 34 files)

**Step 1: Copy release notes from Kairos Swift repo**

```bash
mkdir -p content/changelog
cp /Users/david/documents/github/zojer/kairos.swift/kairos-swift/resources/releasenotes/Beta/*.md content/changelog/
```

**Step 2: Verify files copied**

```bash
ls content/changelog/
```

Expected: 34 `.md` files (v0.1.1.md through v2.0.1.md)

**Step 3: Commit**

```bash
git add content/changelog/
git commit -m "content: add Kairos release notes to changelog"
```

---

### Task 2: Install react-markdown

**Step 1: Install dependency**

```bash
npm install react-markdown
```

`react-markdown` renders markdown as React elements in server components. `remark-gfm` (already installed) will be used as a plugin for GitHub Flavored Markdown support.

**Step 2: Commit**

```bash
git add package.json package-lock.json
git commit -m "deps: add react-markdown for changelog rendering"
```

---

### Task 3: Create changelog utility

**Files:**
- Create: `src/lib/changelog.ts`

**Step 1: Create the changelog data loader**

```typescript
import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface ChangelogEntry {
  version: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  content: string;
}

const changelogDir = path.join(process.cwd(), "content", "changelog");

function compareSemver(a: string, b: string): number {
  const parse = (v: string) => v.replace(/^v/, "").split(".").map(Number);
  const [aMajor, aMinor, aPatch] = parse(a);
  const [bMajor, bMinor, bPatch] = parse(b);
  if (aMajor !== bMajor) return bMajor - aMajor;
  if (aMinor !== bMinor) return bMinor - aMinor;
  return bPatch - aPatch;
}

export function getChangelogEntries(): ChangelogEntry[] {
  const files = fs.readdirSync(changelogDir).filter((f) => f.endsWith(".md"));

  const entries = files.map((filename) => {
    const filePath = path.join(changelogDir, filename);
    const fileContent = fs.readFileSync(filePath, "utf-8");
    const { data, content } = matter(fileContent);

    return {
      version: data.version ?? filename.replace(".md", ""),
      title: data.title ?? "",
      date: data.date ?? "",
      author: data.author ?? "",
      tags: data.tags ?? [],
      content: content.trim(),
    };
  });

  return entries.sort((a, b) => compareSemver(a.version, b.version));
}
```

**Step 2: Commit**

```bash
git add src/lib/changelog.ts
git commit -m "feat: add changelog data loader utility"
```

---

### Task 4: Create the changelog page

**Files:**
- Create: `app/changelog/page.tsx`

**Step 1: Create the page component**

Reference `app/support/page.tsx` for layout patterns. The page:

- Uses the same `min-h-screen py-16 px-8` + `max-w-2xl mx-auto` layout
- Has "Back to home" link, heading, subtitle
- Calls `getChangelogEntries()` to get sorted entries
- Renders each entry with version heading, title, formatted date, and markdown body via `react-markdown` with `remark-gfm`
- Footer matches existing pattern (Terms, Privacy links)

```tsx
import Link from "next/link";
import type { Metadata } from "next";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { getChangelogEntries } from "@/src/lib/changelog";

export const metadata: Metadata = {
  title: "Changelog | Zojer Studio",
  description:
    "Release notes for Kairos, the iOS astrology app by Zojer Studio",
};

function formatDate(dateStr: string): string {
  const date = new Date(dateStr + "T00:00:00");
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function Changelog() {
  const entries = getChangelogEntries();

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
          Changelog
        </h1>
        <p className="text-tx-secondary mb-12">Release notes for Kairos</p>

        <div className="space-y-12">
          {entries.map((entry) => (
            <article key={entry.version}>
              <header className="mb-4">
                <h2 className="text-2xl font-display text-tx-primary">
                  {entry.version}
                </h2>
                <p className="text-tx-primary font-semibold">{entry.title}</p>
                <time className="text-sm text-tx-tertiary">
                  {formatDate(entry.date)}
                </time>
              </header>
              <div className="prose-changelog text-tx-secondary">
                <Markdown remarkPlugins={[remarkGfm]}>
                  {entry.content}
                </Markdown>
              </div>
            </article>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-bd-secondary text-tx-tertiary text-sm flex gap-4">
          <Link
            href="/terms"
            className="hover:text-tx-primary transition-colors"
          >
            Terms of Service
          </Link>
          <Link
            href="/privacy"
            className="hover:text-tx-primary transition-colors"
          >
            Privacy Policy
          </Link>
        </div>
      </main>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add app/changelog/page.tsx
git commit -m "feat: add changelog page"
```

---

### Task 5: Add prose styles for changelog markdown

**Files:**
- Modify: `app/globals.css` (append after existing MDX/prose styles, ~line 349)

**Step 1: Add changelog prose styles**

Add CSS rules scoped to `.prose-changelog` that style the rendered markdown (headings, paragraphs, lists, links, bold, code) to match the site's design tokens and typography.

```css
/* Changelog prose styles */
.prose-changelog h1,
.prose-changelog h2 {
  font-family: var(--font-whyte-inktrap), var(--font-whyte), system-ui, sans-serif;
  color: hsl(var(--dark-800));
  margin-top: 1.5rem;
  margin-bottom: 0.5rem;
  font-size: 1.25rem;
  line-height: 2rem;
}

.prose-changelog h3 {
  font-weight: 600;
  color: hsl(var(--dark-800));
  margin-top: 1.25rem;
  margin-bottom: 0.25rem;
}

.prose-changelog p {
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.prose-changelog ul,
.prose-changelog ol {
  list-style-position: inside;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.prose-changelog ul {
  list-style-type: disc;
}

.prose-changelog ol {
  list-style-type: decimal;
}

.prose-changelog li {
  margin-top: 0.25rem;
  margin-bottom: 0.25rem;
}

.prose-changelog a {
  color: hsl(var(--accent));
  text-decoration: underline;
}

.prose-changelog a:hover {
  opacity: 0.8;
}

.prose-changelog strong {
  color: hsl(var(--dark-800));
  font-weight: 600;
}

.prose-changelog hr {
  border-color: hsl(var(--dark-800) / 0.08);
  margin: 1.5rem 0;
}
```

**Step 2: Commit**

```bash
git add app/globals.css
git commit -m "style: add prose styles for changelog markdown"
```

---

### Task 6: Add Changelog link to home page footer

**Files:**
- Modify: `app/page.tsx:25-37` (footer section)

**Step 1: Add Changelog link**

Add a "Changelog" link to the footer, after Support and before the closing `</footer>`:

```tsx
<span>&middot;</span>
<a href="/changelog" className="hover:text-tx-primary transition-colors">
  Changelog
</a>
```

**Step 2: Commit**

```bash
git add app/page.tsx
git commit -m "feat: add changelog link to home page footer"
```

---

### Task 7: Visual verification

**Step 1: Start dev server**

```bash
npm run dev
```

**Step 2: Verify the changelog page**

Open `http://localhost:3000/changelog` and check:
- Page loads without errors
- Entries are sorted newest first (v2.0.1 at top)
- Version, title, date, and markdown body all render correctly
- Headings, lists, bold, and links in markdown are styled
- Light and dark themes both look correct
- "Back to home" link works
- Footer links work

**Step 3: Verify home page footer**

Open `http://localhost:3000` and check:
- "Changelog" link appears in footer
- Clicking it navigates to `/changelog`

**Step 4: Build check**

```bash
npm run build
```

Expected: Build succeeds with no errors. The changelog page is statically rendered.
