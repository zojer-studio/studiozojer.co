import type { NextConfig } from "next";
import createMDX from "@next/mdx";

// Note: Turbopack (default in Next.js 16) doesn't support non-serializable
// remark/rehype plugins. For full MDX plugin support in dev, use `next dev --webpack`.
// Production builds with `next build --webpack` will use all plugins.

// kairos.admin embeds a form page in an iframe so the builder's preview IS the real
// renderer rather than a second one that drifts. Browsers refuse cross-origin framing by
// default, so the admin origin has to be named — and only for /forms/*, never site-wide.
const ADMIN_ORIGIN =
  process.env.NEXT_PUBLIC_ADMIN_ORIGIN ?? "https://admin.zojer.studio";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "md", "mdx", "ts", "tsx"],
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
      {
        source: "/forms/:slug*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: `frame-ancestors 'self' ${ADMIN_ORIGIN}`,
          },
        ],
      },
    ];
  },
};

// Check if we're using Webpack (not Turbopack)
// Plugins only work with Webpack, so we conditionally add them
const isWebpack = process.env.TURBOPACK !== "1";

const getMDXOptions = async () => {
  if (isWebpack) {
    // Dynamic imports for Webpack builds
    const remarkGfm = (await import("remark-gfm")).default;
    const rehypeSlug = (await import("rehype-slug")).default;
    const rehypeAutolinkHeadings = (await import("rehype-autolink-headings"))
      .default;
    const rehypePrettyCode = (await import("rehype-pretty-code")).default;

    return {
      remarkPlugins: [remarkGfm],
      rehypePlugins: [
        rehypeSlug,
        [rehypeAutolinkHeadings, { behavior: "wrap" }],
        [
          rehypePrettyCode,
          {
            theme: {
              dark: "github-dark",
              light: "github-light",
            },
            keepBackground: false,
          },
        ],
      ],
    };
  }
  // Return empty plugins for Turbopack (basic MDX still works)
  return {
    remarkPlugins: [],
    rehypePlugins: [],
  };
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

export default withMDX(nextConfig);
