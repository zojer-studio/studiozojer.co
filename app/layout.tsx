import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";

const whyte = localFont({
  src: [
    {
      path: "./fonts/ABCWhyte-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ABCWhyte-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-whyte",
  display: "swap",
});

const whyteInktrap = localFont({
  src: [
    {
      path: "./fonts/ABCWhyteInktrap-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/ABCWhyteInktrap-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
  ],
  variable: "--font-whyte-inktrap",
  display: "swap",
});

const fraktion = localFont({
  src: [
    {
      path: "./fonts/PPFraktionMono-Light.otf",
      weight: "300",
      style: "normal",
    },
    {
      path: "./fonts/PPFraktionMono-LightItalic.otf",
      weight: "300",
      style: "italic",
    },
    {
      path: "./fonts/PPFraktionMono-Regular.otf",
      weight: "400",
      style: "normal",
    },
    {
      path: "./fonts/PPFraktionMono-RegularItalic.otf",
      weight: "400",
      style: "italic",
    },
    {
      path: "./fonts/PPFraktionMono-Bold.otf",
      weight: "700",
      style: "normal",
    },
    {
      path: "./fonts/PPFraktionMono-BoldItalic.otf",
      weight: "700",
      style: "italic",
    },
  ],
  variable: "--font-fraktion",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Zojer Studio",
  description: "Design studio portfolio",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${whyte.variable} ${whyteInktrap.variable} ${fraktion.variable} antialiased`}
      >
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="forest"
          themes={["forest", "opalite"]}
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
