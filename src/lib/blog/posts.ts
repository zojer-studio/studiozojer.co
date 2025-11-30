import fs from "fs";
import path from "path";
import matter from "gray-matter";
import readingTime from "reading-time";
import type {
  BlogPost,
  BlogPostWithContent,
  PostFilters,
  PostFrontmatter,
  PostSortField,
  PostSortOrder,
} from "./types";

const BLOG_CONTENT_PATH = path.join(process.cwd(), "content/blog");

/**
 * Get all MDX file slugs from the content directory
 */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(BLOG_CONTENT_PATH)) {
    return [];
  }

  return fs
    .readdirSync(BLOG_CONTENT_PATH)
    .filter((file) => /\.mdx?$/.test(file))
    .map((file) => file.replace(/\.mdx?$/, ""));
}

/**
 * Parse a single MDX file and extract frontmatter + metadata
 */
export function getPostBySlug(slug: string): BlogPostWithContent | null {
  const mdxPath = path.join(BLOG_CONTENT_PATH, `${slug}.mdx`);
  const mdPath = path.join(BLOG_CONTENT_PATH, `${slug}.md`);

  const filePath = fs.existsSync(mdxPath) ? mdxPath : mdPath;

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContents = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(fileContents);
  const stats = readingTime(content);

  const frontmatter = data as PostFrontmatter;

  if (!frontmatter.title || !frontmatter.date) {
    console.warn(`Post "${slug}" is missing required frontmatter fields`);
    return null;
  }

  return {
    title: frontmatter.title,
    description: frontmatter.description || "",
    date: frontmatter.date,
    updatedAt: frontmatter.updatedAt,
    tags: frontmatter.tags || [],
    published: frontmatter.published ?? true,
    image: frontmatter.image,
    imageAlt: frontmatter.imageAlt,
    slug,
    readingTime: stats.text,
    wordCount: stats.words,
    content,
  };
}

/**
 * Get all blog posts with optional filtering and sorting
 */
export function getAllPosts(
  filters: PostFilters = {},
  sortField: PostSortField = "date",
  sortOrder: PostSortOrder = "desc"
): BlogPost[] {
  const slugs = getPostSlugs();

  let posts = slugs
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is BlogPostWithContent => post !== null)
    .filter((post) => {
      // Filter by published status
      if (filters.published !== undefined) {
        return post.published === filters.published;
      }
      // In production, only show published posts
      return process.env.NODE_ENV === "development" || post.published;
    })
    .filter((post) => {
      // Filter by tag
      if (filters.tag) {
        return post.tags.includes(filters.tag);
      }
      return true;
    })
    // Remove content from list results
    .map(({ content: _, ...post }) => post);

  // Sort posts
  posts.sort((a, b) => {
    let comparison = 0;
    switch (sortField) {
      case "date":
        comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
        break;
      case "title":
        comparison = a.title.localeCompare(b.title);
        break;
      case "readingTime":
        comparison = a.wordCount - b.wordCount;
        break;
    }
    return sortOrder === "desc" ? -comparison : comparison;
  });

  // Apply limit
  if (filters.limit) {
    posts = posts.slice(0, filters.limit);
  }

  return posts;
}

/**
 * Get all unique tags from all posts
 */
export function getAllTags(): string[] {
  const posts = getAllPosts({ published: true });
  const tagSet = new Set<string>();
  posts.forEach((post) => post.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}

/**
 * Get adjacent posts for navigation
 */
export function getAdjacentPosts(currentSlug: string): {
  previous: BlogPost | null;
  next: BlogPost | null;
} {
  const posts = getAllPosts({ published: true });
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) {
    return { previous: null, next: null };
  }

  return {
    previous: currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null,
    next: currentIndex > 0 ? posts[currentIndex - 1] : null,
  };
}
