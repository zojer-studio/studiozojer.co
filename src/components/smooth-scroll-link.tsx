"use client";

import React from "react";

interface SmoothScrollLinkProps {
  targetId: string;
  href: string;
  className?: string;
  children: React.ReactNode;
}

export function SmoothScrollLink({ targetId, href, className, children }: SmoothScrollLinkProps) {
  const handleClick = (e: React.MouseEvent) => {
    const target = document.getElementById(targetId);
    if (!target) return;
    e.preventDefault();
    target.scrollIntoView({ behavior: "smooth", block: "center" });
    target.focus({ preventScroll: true });
  };

  return (
    <a href={href} onClick={handleClick} className={className}>
      {children}
    </a>
  );
}
