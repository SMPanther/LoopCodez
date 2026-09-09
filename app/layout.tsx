import type { Metadata } from "next";
import Script from "next/script";
import { DM_Sans, Instrument_Serif, JetBrains_Mono, Syne } from "next/font/google";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { LenisProvider } from "@/components/motion/LenisProvider";
import { SiteLoader } from "@/components/motion/SiteLoader";
import { LoaderDebugPanel } from "@/components/motion/LoaderDebugPanel";
import { SiteFooter } from "@/components/layout/SiteFooter";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { LOADER_BLOCK_SCRIPT, LOADER_CRITICAL_CSS } from "@/lib/loader/loader-gate";
import { siteConfig } from "@/lib/seo/metadata";
import "@/styles/globals.css";

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-instrument-serif",
  display: "swap",
});

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: siteConfig.title,
    template: "%s · loopcodez",
  },
  description: siteConfig.description,
  icons: {
    icon: [{ url: "/loopcodez-logo.jpeg", type: "image/jpeg" }],
    apple: [{ url: "/loopcodez-logo.jpeg" }],
  },
  openGraph: {
    title: siteConfig.title,
    description: siteConfig.description,
    url: siteConfig.url,
    siteName: siteConfig.name,
    locale: siteConfig.locale,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.title,
    description: siteConfig.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${instrumentSerif.variable} ${syne.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}
    >
      <head>
        <style id="studio105-loader-critical" dangerouslySetInnerHTML={{ __html: LOADER_CRITICAL_CSS }} />
        <Script id="studio105-loader-block" strategy="beforeInteractive">
          {LOADER_BLOCK_SCRIPT}
        </Script>
      </head>
      <body className="min-h-dvh antialiased" suppressHydrationWarning>
        <div id="site-loader-static" className="site-loader-static" aria-hidden="true">
          <div className="site-loader-static__inner">
            <p className="site-loader-static__brand">loopcodez</p>
            <span className="site-loader-static__mark">
              <img src="/loopcodez-logo.jpeg" alt="" />
            </span>
            <div className="site-loader-static__track" aria-hidden>
              <div className="site-loader-static__bar" />
            </div>
            <span className="site-loader-static__status">Initializing</span>
          </div>
        </div>

        <SiteLoader />
        <LoaderDebugPanel />

        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <LenisProvider>
          <div id="site-app">
            <CustomCursor />
            <SiteHeader />
            <main id="main-content">{children}</main>
            <SiteFooter />
          </div>
        </LenisProvider>
      </body>
    </html>
  );
}
