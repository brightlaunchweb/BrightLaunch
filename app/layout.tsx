import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  metadataBase: new URL("https://www.brightlaunchweb.com"),
  title: "BrightLaunch — modern websites for small businesses",
  description:
    "We design and build sleek, fast, mobile-first sites for small businesses and nonprofits — quickly and affordably.",
  openGraph: {
    type: "website",
    url: "https://www.brightlaunchweb.com",
    title: "BrightLaunch — modern websites for small businesses",
    description:
      "We design and build sleek, fast, mobile-first sites for small businesses and nonprofits — quickly and affordably.",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "BrightLaunch — modern websites for small businesses",
    description:
      "We design and build sleek, fast, mobile-first sites for small businesses and nonprofits — quickly and affordably.",
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
        {/* FAQ schema */}
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
                    text:
                      "Next.js, Tailwind, and modern hosting for speed and SEO. We also support low-code stacks when appropriate.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Do you help with content?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Yes — we draft copy, suggest images, and set tone based on your brand.",
                  },
                },
                {
                  "@type": "Question",
                  name: "Can you redesign my existing site?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Absolutely. We’ll audit what works, then rebuild or refresh for performance and clarity.",
                  },
                },
                {
                  "@type": "Question",
                  name: "What about timelines?",
                  acceptedAnswer: {
                    "@type": "Answer",
                    text:
                      "Most launches are within 1–3 weeks depending on scope.",
                  },
                },
              ],
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
