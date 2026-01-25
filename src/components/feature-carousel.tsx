"use client";

import * as React from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { cn } from "@/src/lib/utils";

interface Slide {
  lightImage: string;
  darkImage: string;
  alt: string;
}

const slides: Slide[] = [
  {
    lightImage: "/images/valueprops/carousel-hero.png",
    darkImage: "/images/valueprops/carousel-hero.png",
    alt: "Kairōs app preview",
  },
  {
    lightImage: "/images/valueprops/valueprop-transits-light.png",
    darkImage: "/images/valueprops/valueprop-transits-dark.png",
    alt: "Add current transits",
  },
  {
    lightImage: "/images/valueprops/valueprop-aspects-light.png",
    darkImage: "/images/valueprops/valueprop-aspects-dark.png",
    alt: "Step through aspects",
  },
  {
    lightImage: "/images/valueprops/valueprop-display-light.png",
    darkImage: "/images/valueprops/valueprop-display-dark.png",
    alt: "Switch display profiles",
  },
  {
    lightImage: "/images/valueprops/valueprop-order-light.png",
    darkImage: "/images/valueprops/valueprop-order-dark.png",
    alt: "Reorder charts",
  },
];

export function FeatureCarousel({ className }: { className?: string }) {
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const current = slides[currentIndex];
  const isDark = resolvedTheme === "dark";
  const imageSrc = mounted ? (isDark ? current.darkImage : current.lightImage) : current.lightImage;

  return (
    <div className={cn("w-full", className)}>
      <div className="relative">
        {/* Navigation buttons */}
        <button
          onClick={goToPrev}
          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-10 w-8 h-8 rounded-full bg-bg-card border border-bd-primary flex items-center justify-center text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated transition-colors"
          aria-label="Previous feature"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M15 18l-6-6 6-6" />
          </svg>
        </button>

        <button
          onClick={goToNext}
          className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-10 w-8 h-8 rounded-full bg-bg-card border border-bd-primary flex items-center justify-center text-tx-secondary hover:text-tx-primary hover:bg-bg-elevated transition-colors"
          aria-label="Next feature"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M9 18l6-6-6-6" />
          </svg>
        </button>

        {/* Content - render all images, show only current */}
        <div className="relative aspect-video overflow-hidden rounded-lg border border-bd-secondary w-full">
          {slides.map((slide, index) => {
            const src = mounted ? (isDark ? slide.darkImage : slide.lightImage) : slide.lightImage;
            return (
              <Image
                key={slide.alt}
                src={src}
                alt={slide.alt}
                fill
                sizes="(max-width: 768px) 100vw, 768px"
                quality={95}
                className={cn(
                  "object-cover transition-opacity duration-300",
                  index === currentIndex ? "opacity-100" : "opacity-0"
                )}
                priority
              />
            );
          })}
        </div>
      </div>

      {/* Dots indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              index === currentIndex ? "bg-tx-primary" : "bg-tx-disabled"
            )}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
