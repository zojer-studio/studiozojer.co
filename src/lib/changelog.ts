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
