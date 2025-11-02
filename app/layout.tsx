import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { ThemeProvider } from "@/src/components/theme-provider";
import { FaviconSwitcher } from "@/src/components/favicon-switcher";
import { ThemeDebug } from "@/src/components/theme-debug";

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
  icons: {
    icon: [
      {
        url: "/favicon-light/favicon.ico",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark/favicon.ico",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: [
      {
        url: "/favicon-light/apple-touch-icon.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/favicon-dark/apple-touch-icon.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
  },
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
        <Script
          id="mailerlite-universal"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,e,u,f,l,n){w[f]=w[f]||function(){(w[f].q=w[f].q||[])
              .push(arguments);},l=d.createElement(e),l.async=1,l.src=u,
              n=d.getElementsByTagName(e)[0],n.parentNode.insertBefore(l,n);})
              (window,document,'script','https://assets.mailerlite.com/js/universal.js','ml');
              ml('account', '1887971');
            `,
          }}
        />
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          enableColorScheme
          disableTransitionOnChange
        >
          <FaviconSwitcher />
          {/* <ThemeDebug /> */}
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
