"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

export function FaviconSwitcher() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Use resolvedTheme which gives us the actual applied theme ("light" or "dark")
    const isDark = resolvedTheme === "dark";
    const faviconFolder = isDark ? "favicon-dark" : "favicon-light";

    // Update all favicon link elements
    const updateFavicons = () => {
      // Update .ico favicon
      let link: HTMLLinkElement | null = document.querySelector(
        "link[rel='icon']"
      );
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = `/${faviconFolder}/favicon.ico`;

      // Update 16x16 favicon
      let link16: HTMLLinkElement | null = document.querySelector(
        "link[rel='icon'][sizes='16x16']"
      );
      if (!link16) {
        link16 = document.createElement("link");
        link16.rel = "icon";
        link16.type = "image/png";
        link16.sizes = "16x16";
        document.head.appendChild(link16);
      }
      link16.href = `/${faviconFolder}/favicon-16x16.png`;

      // Update 32x32 favicon
      let link32: HTMLLinkElement | null = document.querySelector(
        "link[rel='icon'][sizes='32x32']"
      );
      if (!link32) {
        link32 = document.createElement("link");
        link32.rel = "icon";
        link32.type = "image/png";
        link32.sizes = "32x32";
        document.head.appendChild(link32);
      }
      link32.href = `/${faviconFolder}/favicon-32x32.png`;

      // Update apple-touch-icon
      let appleLink: HTMLLinkElement | null = document.querySelector(
        "link[rel='apple-touch-icon']"
      );
      if (!appleLink) {
        appleLink = document.createElement("link");
        appleLink.rel = "apple-touch-icon";
        document.head.appendChild(appleLink);
      }
      appleLink.href = `/${faviconFolder}/apple-touch-icon.png`;
    };

    updateFavicons();
  }, [resolvedTheme, mounted]);

  return null;
}
