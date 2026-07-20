#!/usr/bin/env node
/**
 * Vendor the glyphs this site needs out of the daoUI corpus.
 *
 *   node scripts/sync-glyphs.mjs
 *
 * Why a committed generated file rather than reading daoUI at build time: Vercel
 * builds this repo alone, so `../daoUI` does not exist in CI. Anything that resolves
 * the sibling path at build time works locally and fails on deploy.
 *
 * The output stamps the daoUI commit it was generated from. That is the whole point —
 * a vendored copy that cannot say where it came from is how `cancer.svg` sat stale for
 * nine months without anyone noticing.
 */

import { execSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";

const DAOUI = path.resolve(process.cwd(), "../daoUI");
const CORPUS = path.join(DAOUI, "Glyphs");
const OUT = path.resolve(process.cwd(), "src/lib/glyphs.generated.ts");

// Only what the hero canvas renders. Widen deliberately, not by reflex.
const SIGNS = [
  "aries", "taurus", "gemini", "cancer", "leo", "virgo",
  "libra", "scorpio", "sagittarius", "capricorn", "aquarius", "pisces",
];
const ASPECTS = ["conjunct", "sextile", "square", "trine", "opposite"];
const BODIES = ["sun", "moon", "mercury", "venus", "mars", "jupiter", "saturn"];
const WANTED = [...SIGNS, ...ASPECTS, ...BODIES];

if (!fs.existsSync(CORPUS)) {
  console.error(
    `daoUI corpus not found at ${CORPUS}\n` +
      `This script only runs where daoUI is composed alongside this repo.\n` +
      `The generated file is committed, so builds do not need it.`
  );
  process.exit(1);
}

const sha = execSync("git rev-parse --short HEAD", { cwd: DAOUI })
  .toString()
  .trim();

/** Strip the outer <svg> wrapper — we supply our own at render time. */
function innerMarkup(file) {
  const raw = fs.readFileSync(file, "utf-8");
  const m = raw.match(/<svg[^>]*>([\s\S]*)<\/svg>/);
  if (!m) throw new Error(`no <svg> wrapper in ${file}`);
  return m[1].replace(/\s+/g, " ").trim();
}

const entries = [];
const hardcoded = [];

for (const name of WANTED) {
  const file = path.join(CORPUS, `${name}.svg`);
  if (!fs.existsSync(file)) throw new Error(`missing glyph: ${name}`);
  const markup = innerMarkup(file);
  // The corpus is currentColor-based. A hex here means the source regressed, and a
  // baked colour would silently ignore the theme.
  if (/#[0-9A-Fa-f]{3,6}/.test(markup)) hardcoded.push(name);
  entries.push([name, markup]);
}

if (hardcoded.length) {
  console.error(`hardcoded colour in: ${hardcoded.join(", ")} — expected currentColor`);
  process.exit(1);
}

const body = entries
  .map(([name, markup]) => `  ${name}: '${markup.replace(/'/g, "\\'")}',`)
  .join("\n");

fs.writeFileSync(
  OUT,
  `// GENERATED — do not edit by hand. Run: node scripts/sync-glyphs.mjs
//
// Source: daoUI/Glyphs @ ${sha}
//
// Inner SVG markup only; the renderer supplies the <svg> wrapper and viewBox. All
// strokes are currentColor, so colour comes from the element's text colour. Do not
// serve these through <img src> — currentColor does not cascade into a referenced
// document and they will render black.

export const GLYPH_VIEWBOX = "0 0 20 20";

export const GLYPHS: Record<string, string> = {
${body}
};

export const SIGN_GLYPHS = [
${SIGNS.map((s) => `  "${s}",`).join("\n")}
] as const;
`
);

console.log(`wrote ${entries.length} glyphs from daoUI@${sha} → ${path.relative(process.cwd(), OUT)}`);
