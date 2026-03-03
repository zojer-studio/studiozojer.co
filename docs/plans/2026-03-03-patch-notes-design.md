# Patch Notes Page Design

## Overview

Add a `/changelog` page to zojer.studio that displays Kairos iOS app release notes in a single scrollable timeline, sourced from MDX files.

## Content Source

Existing release notes from the Kairos Swift repo (`kairos.swift/kairos-swift/resources/releasenotes/Beta/`) will be copied into `content/changelog/` in zojer.studio.

The files already have usable YAML frontmatter:

```yaml
---
title: "Release title"
author: "@pageofswrds"
date: "2026-03-02"
version: "v2.0.1"
tags: [patch, beta]
---
```

These are `.md` files (not `.mdx`), which `gray-matter` handles fine.

## Route

`/changelog` — a new App Router page at `app/changelog/page.tsx`.

## Page Layout

Follows the existing pattern from `/support`:

- `max-w-2xl` centered column
- "Back to home" link at top
- Page heading: "Changelog"
- Subtitle: "Release notes for Kairos"
- Footer with Terms/Privacy links

## Timeline Structure

All releases on a single scrollable page, sorted by semver descending (newest first). Each entry displays:

- **Version number** as the heading (e.g. "v2.0.1")
- **Title** below the version
- **Date** formatted readably (e.g. "March 2, 2026")
- **Rendered markdown body**

Entries separated by spacing/dividers.

## Data Loading

A utility function in `src/lib/changelog.ts`:

1. Reads all `.md` files from `content/changelog/`
2. Parses frontmatter with `gray-matter`
3. Sorts by semver descending
4. Returns the sorted list with parsed metadata and raw markdown content

This runs at build time (static rendering via React Server Component).

## Markdown Rendering

Since the changelog files are plain `.md` (not `.mdx` with JSX), we'll render them using a lightweight markdown-to-HTML approach rather than the full MDX pipeline. The content will be rendered as HTML and styled to match the site's typography and color tokens.

## Home Page Integration

Add "Changelog" link to the home page footer, alongside Terms, Privacy, and Support.

## Metadata

```tsx
export const metadata: Metadata = {
  title: "Changelog | Zojer Studio",
  description: "Release notes for Kairos, the iOS astrology app by Zojer Studio",
};
```
