import type { Metadata } from "next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { DM_Sans } from "next/font/google";
import "./globals.css";
import ClientHeader from "@/components/ClientHeader";
import Footer from "@/components/Footer";
import NewsletterSection from "@/components/NewsletterSection";
import InstagramSection from "@/components/InstagramSection";
import ErrorBoundaryWrapper from "@/components/ErrorBoundary";
import CookieConsent from "@/components/CookieConsent";
import Script from "next/script";
import { Suspense } from "react";
import VisitNotifier from "@/components/VisitNotifier";
import FacebookPixel from "@/components/FacebookPixel";
import { AdminRouteCheck, PublicRouteOnly, AdminRouteOnly, CheckoutRouteOnly } from "@/components/AdminRouteCheck";
import GlobalErrorReporter from "@/components/GlobalErrorReporter";
import LiveChatWidget from "@/components/LiveChatWidget";
import FixedSocialRail from "@/components/FixedSocialRail";

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
  variable: "--font-dm-sans",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Ballard Kelly | Trading Cards, Booster Boxes & Collectibles",
  description: "Explore trading cards, Topps finds, Pokemon cards, booster boxes, collectibles, comics, and figures at Ballard Kelly, a shop founded by collector Ballard Kelly Scott.",
  keywords: "Ballard Kelly, BallardKelly, trading cards, Topps cards, Pokemon cards, booster boxes, collectibles, comics, figures, card collecting, hobby shop, collector gifts",
  authors: [{ name: "Ballard Kelly" }],
  creator: "Ballard Kelly",
  publisher: "Ballard Kelly",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://BallardKelly.shop"),
  openGraph: {
    title: "Ballard Kelly | Trading Cards, Booster Boxes & Collectibles",
    description: "Shop trading cards, Topps finds, Pokemon cards, booster boxes, collectibles, comics, and figures at Ballard Kelly.",
    url: "https://BallardKelly.shop",
    siteName: "Ballard Kelly",
    images: [
      {
        url: "/g7x.jpeg",
        width: 1200,
        height: 630,
        alt: "Ballard Kelly - Trading Cards, Booster Boxes, Collectibles, Comics and Figures",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ballard Kelly | Trading Cards, Booster Boxes & Collectibles",
    description: "Discover trading cards, Topps finds, Pokemon cards, booster boxes, collectibles, comics, and figures at Ballard Kelly.",
    images: ["/g7x.jpeg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.png" type="image/png" />
        <link rel="preload" href="/logosvg.svg" as="image" type="image/svg+xml" />
        {/* Facebook Domain Verification */}
        <meta name="facebook-domain-verification" content="k3ytyf6hqaa462mz10uzwnmugj0d0o" />
        <meta name="msvalidate.01" content="75494FC1101908256EEEA046C47C3264" />
        {/* Google Merchant Center Domain Claim Verification */}
        <meta name="google-site-verification" content="o8gC6haURQ1t7L9G8xfh_-5imCYNPmnhjnt2IrgEPco" />
        <meta name="google-site-verification" content="whWwvqC20XmxK8qOhFgMP6wWGrqw2QYp-W-OSxNmlW8" />
        {/* Meta Pixel base snippet + init.
            Loaded synchronously in <head> (NOT afterInteractive) so `window.fbq` exists
            before React hydrates. This removes the race that silently dropped PageView,
            AddToCart, ViewContent and InitiateCheckout events. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','869199797850063');fbq('track','PageView');`,
          }}
        />
        <noscript>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            height="1"
            width="1"
            style={{ display: "none" }}
            src="https://www.facebook.com/tr?id=869199797850063&ev=PageView&noscript=1"
            alt=""
          />
        </noscript>
      </head>
      <body suppressHydrationWarning className={`${dmSans.variable} font-sans antialiased text-[#262626]`}>
        <GlobalErrorReporter />
        <Suspense fallback={null}>
          <FacebookPixel />
        </Suspense>
        <PublicRouteOnly>
          <VisitNotifier />
        </PublicRouteOnly>
        {/* Organization Schema */}
        <AdminRouteCheck>
          <Script
            id="organization-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "Organization",
                "name": "Ballard Kelly",
                "alternateName": "BallardKelly",
                "url": "https://BallardKelly.shop",
                "logo": "https://BallardKelly.shop/logosvg.svg",
                "description": "Ballard Kelly is a collector-run shop founded by Ballard Kelly Scott for trading cards, Topps finds, Pokemon cards, booster boxes, collectibles, comics, and figures.",
                "sameAs": [
                  "https://www.instagram.com/ballardkelly_shop/"
                ],
                "contactPoint": {
                  "@type": "ContactPoint",
                  "contactType": "customer service",
                  "email": "contact@BallardKelly.shop",
                  "telephone": "+1 (308) 260-1935",
                  "areaServed": "US"
                },
                "address": {
                  "@type": "PostalAddress",
                  "streetAddress": "823 Center Ave N",
                  "addressLocality": "Curtis",
                  "addressRegion": "NE",
                  "postalCode": "69025",
                  "addressCountry": "US"
                }
              })
            }}
          />
        </AdminRouteCheck>

        {/* WebSite Schema */}
        <AdminRouteCheck>
          <Script
            id="website-schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "WebSite",
                "name": "Ballard Kelly",
                "alternateName": "BallardKelly",
                "url": "https://BallardKelly.shop",
                "description": "Ballard Kelly offers trading cards, Topps finds, Pokemon cards, booster boxes, collectibles, comics, and figures for collectors, fans, and hobby enthusiasts.",
                "potentialAction": {
                  "@type": "SearchAction",
                  "target": {
                    "@type": "EntryPoint",
                    "urlTemplate": "https://BallardKelly.shop/api/products/search?q={search_term_string}"
                  },
                  "query-input": "required name=search_term_string"
                }
              })
            }}
          />
        </AdminRouteCheck>

        <ErrorBoundaryWrapper>
          {/* Public website with header, footer, etc. */}
          <PublicRouteOnly>
            <div className="min-h-screen flex flex-col">
              <Suspense fallback={null}>
                <ClientHeader />
              </Suspense>
              <main className="flex-grow">
                {children}
              </main>
              <Suspense fallback={null}>
                <InstagramSection />
              </Suspense>
              <NewsletterSection />
              <div className="h-4 bg-white md:h-6" aria-hidden="true" />
              <Footer />
            </div>
            <CookieConsent />
          </PublicRouteOnly>

          {/* Checkout page - navbar only, no distractions */}
          <CheckoutRouteOnly>
            <div className="min-h-screen flex flex-col">
              <Suspense fallback={null}>
                <ClientHeader />
              </Suspense>
              <main className="flex-grow">
                {children}
              </main>
            </div>
          </CheckoutRouteOnly>

          {/* Admin dashboard - clean, no public UI */}
          <AdminRouteOnly>
            {children}
          </AdminRouteOnly>
        </ErrorBoundaryWrapper>

        <AdminRouteCheck>
          <Script
            src="https://analyticsapp-five.vercel.app/tracker.js"
            strategy="afterInteractive"
            async
          />
        </AdminRouteCheck>
        <FixedSocialRail />
        <LiveChatWidget />
        <SpeedInsights />
      </body>
    </html>
  );
}
