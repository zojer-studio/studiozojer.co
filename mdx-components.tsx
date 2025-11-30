import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/src/lib/utils";
import { Button } from "@/src/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/src/components/ui/card";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Headings
    h1: ({ className, ...props }) => (
      <h1
        className={cn(
          "text-4xl font-display font-bold text-tx-primary mt-10 mb-4 scroll-mt-20",
          className
        )}
        {...props}
      />
    ),
    h2: ({ className, ...props }) => (
      <h2
        className={cn(
          "text-3xl font-display font-semibold text-tx-primary mt-8 mb-3 scroll-mt-20",
          className
        )}
        {...props}
      />
    ),
    h3: ({ className, ...props }) => (
      <h3
        className={cn(
          "text-2xl font-display font-semibold text-tx-primary mt-6 mb-2 scroll-mt-20",
          className
        )}
        {...props}
      />
    ),
    h4: ({ className, ...props }) => (
      <h4
        className={cn(
          "text-xl font-display font-semibold text-tx-primary mt-4 mb-2 scroll-mt-20",
          className
        )}
        {...props}
      />
    ),

    // Paragraphs and text
    p: ({ className, ...props }) => (
      <p
        className={cn("text-tx-secondary leading-relaxed mb-4", className)}
        {...props}
      />
    ),
    strong: ({ className, ...props }) => (
      <strong
        className={cn("font-semibold text-tx-primary", className)}
        {...props}
      />
    ),
    em: ({ className, ...props }) => (
      <em className={cn("italic", className)} {...props} />
    ),

    // Links
    a: ({ href, className, ...props }) => {
      const isExternal = href?.startsWith("http");
      if (isExternal) {
        return (
          <a
            href={href}
            className={cn(
              "text-tx-accent underline underline-offset-4 hover:opacity-80 transition-opacity",
              className
            )}
            target="_blank"
            rel="noopener noreferrer"
            {...props}
          />
        );
      }
      return (
        <Link
          href={href || "#"}
          className={cn(
            "text-tx-accent underline underline-offset-4 hover:opacity-80 transition-opacity",
            className
          )}
          {...props}
        />
      );
    },

    // Lists
    ul: ({ className, ...props }) => (
      <ul
        className={cn(
          "list-disc list-inside mb-4 space-y-1 text-tx-secondary",
          className
        )}
        {...props}
      />
    ),
    ol: ({ className, ...props }) => (
      <ol
        className={cn(
          "list-decimal list-inside mb-4 space-y-1 text-tx-secondary",
          className
        )}
        {...props}
      />
    ),
    li: ({ className, ...props }) => (
      <li className={cn("", className)} {...props} />
    ),

    // Blockquotes
    blockquote: ({ className, ...props }) => (
      <blockquote
        className={cn(
          "border-l-4 border-bd-accent pl-4 py-2 my-4 bg-bg-hover rounded-r-md italic text-tx-secondary",
          className
        )}
        {...props}
      />
    ),

    // Code
    code: ({ className, ...props }) => (
      <code
        className={cn(
          "font-mono text-sm bg-bg-primary px-1.5 py-0.5 rounded text-tx-accent",
          className
        )}
        {...props}
      />
    ),
    pre: ({ className, ...props }) => (
      <pre
        className={cn(
          "font-mono text-sm bg-bg-card border border-bd-primary rounded-lg p-4 overflow-x-auto my-4",
          className
        )}
        {...props}
      />
    ),

    // Horizontal rule
    hr: ({ className, ...props }) => (
      <hr className={cn("border-bd-primary my-8", className)} {...props} />
    ),

    // Images
    img: ({ src, alt, className, ...props }) => (
      <Image
        src={src || ""}
        alt={alt || ""}
        width={800}
        height={450}
        className={cn("rounded-lg my-4", className)}
        {...props}
      />
    ),

    // Tables
    table: ({ className, ...props }) => (
      <div className="overflow-x-auto my-4">
        <table
          className={cn(
            "w-full border-collapse border border-bd-primary",
            className
          )}
          {...props}
        />
      </div>
    ),
    th: ({ className, ...props }) => (
      <th
        className={cn(
          "border border-bd-primary bg-bg-hover px-4 py-2 text-left font-semibold text-tx-primary",
          className
        )}
        {...props}
      />
    ),
    td: ({ className, ...props }) => (
      <td
        className={cn(
          "border border-bd-primary px-4 py-2 text-tx-secondary",
          className
        )}
        {...props}
      />
    ),

    // Expose UI components for use in MDX
    Button,
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
    Image,
    Link,

    // Custom Callout component
    Callout: ({
      type = "info",
      children,
    }: {
      type?: "info" | "warning" | "error" | "success";
      children: React.ReactNode;
    }) => {
      const styles = {
        info: "bg-bg-accent border-bd-accent text-tx-accent",
        warning: "bg-bg-warning border-bd-warning text-tx-warning",
        error: "bg-bg-error border-bd-error text-tx-error",
        success: "bg-bg-success border-bd-success text-tx-success",
      };
      return (
        <div className={cn("border-l-4 p-4 my-4 rounded-r-md", styles[type])}>
          {children}
        </div>
      );
    },

    ...components,
  };
}
