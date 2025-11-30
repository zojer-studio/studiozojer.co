/**
 * Blog post frontmatter schema
 * All metadata extracted from MDX files
 */
export interface PostFrontmatter {
  title: string;
  description: string;
  date: string; // ISO date string (YYYY-MM-DD)
  updatedAt?: string;
  tags: string[];
  published: boolean; // Draft control
  image?: string;
  imageAlt?: string;
}

/**
 * Computed metadata added during processing
 */
export interface PostMeta {
  slug: string;
  readingTime: string; // e.g., "5 min read"
  wordCount: number;
}

/**
 * Complete blog post data structure
 */
export interface BlogPost extends PostFrontmatter, PostMeta {}

/**
 * Blog post with full MDX content for rendering
 */
export interface BlogPostWithContent extends BlogPost {
  content: string;
}

/**
 * Sort options for post listings
 */
export type PostSortField = "date" | "title" | "readingTime";
export type PostSortOrder = "asc" | "desc";

/**
 * Filter options for post queries
 */
export interface PostFilters {
  tag?: string;
  published?: boolean;
  limit?: number;
}
