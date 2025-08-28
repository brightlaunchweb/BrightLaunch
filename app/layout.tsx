import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.brightlaunchweb.com"),
  title: "BrightLaunch: Affordable, Fast Websites for Small Businesses & Nonprofits",
  description: "Launch a sleek, mobile-first website in days. Perfect for boutiques, cafes, charities. Starting at $799 with quick turnaround.",
  keywords: "small business web design, nonprofit websites, affordable website design, mobile-first sites, local SEO",
  openGraph: {
    type: "website",
    url: "https://www.brightlaunchweb.com",
    title: "BrightLaunch: Affordable, Fast Websites for Small Businesses & Nonprofits",
    description: "Launch a sleek, mobile-first website in days. Perfect for boutiques, cafes, charities. Starting at $799 with quick turnaround.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrightLaunch: Affordable, Fast Websites for Small Businesses & Nonprofits",
    description: "Launch a sleek, mobile-first website in days. Perfect for boutiques, cafes, charities. Starting at $799 with quick turnaround.",
    images: ["/og.jpg"],
  },
  icons: { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <a href="#main" className="skip-link">Skip to content</a>
        {children}

        {/* Organization schema */}
        <Script
          id="ld-org"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "BrightLaunch",
              url: "https://www.brightlaunchweb.com",
              logo: "https://www.brightlaunchweb.com/logo.png",
            }),
          }}
        />
        {/* FAQ schema (updated with more questions) */}
        <Script
          id="ld-faq"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FAQPage",
              mainEntity: [
                {
                  "@type": "Question",
                  name: "What platforms do you use?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Next.js, Tailwind, and modern hosting for speed and SEO. We also support low-code stacks when appropriate.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you help with content?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Yes — we draft copy, suggest images, and set tone based on your brand.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can you redesign my existing site?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Absolutely. We’ll audit what works, then rebuild or refresh for performance and clarity.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What about timelines?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "Most launches are within 1–3 weeks depending on scope.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What if I need e-commerce features?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We integrate simple shops with Stripe or Shopify for easy sales and donations.",
                  },
                },
                {
                  "@type": "Question",
                  name: "How do you handle SEO?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text: "We optimize for local search, add meta tags, and set up Google Analytics/Search Console.",
                  },
                },
              ],
            }),
          }}
        />
        {/* New: Service schema for better rich snippets */}
        <Script
          id="ld-service"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Service",
              serviceType: "Website Design",
              provider: {
                "@type": "Organization",
                name: "BrightLaunch",
              },
              areaServed: "Worldwide",
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Web Design Packages",
                itemListElement: [
                  {
                    "@type": "Offer",
                    itemOffered: {
                      "@type": "Service",
                      name: "Starter Website",
                    },
                    price: 799,
                    priceCurrency: "USD",
                  },
                ],
              },
            }),
          }}
        />

        {/* Optional GA4: set NEXT_PUBLIC_GA_ID in your env to enable */}
        {process.env.NEXT_PUBLIC_GA_ID ? (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="ga-init" strategy="afterInteractive">{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}', { anonymize_ip: true });
            `}</Script>
          </>
        ) : null}
      </body>
    </html>
  );
}