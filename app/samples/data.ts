// app/samples/data.ts
import type { StyleKey, FontKey } from "./stylekits";

export type Sample = {
  slug: string;
  name: string;
  tagline: string;
  style?: StyleKey;     // pick a style preset (modern | serif | pastel | mono | neon)
  font?: FontKey;       // optional font override (sans | serif | mono | grotesk)
  // Optional color accents (HSL without hsl())
  brandStart?: string;  // e.g., "26 95% 55%"
  brandEnd?: string;    // e.g., "221 83% 53%"
  features: string[];
  sections: { title: string; body: string }[];

  // NEW: if present, gallery buttons will open this URL in a new tab
  externalUrl?: string;
};

export const samples: Sample[] = [
  {
    slug: "coffee-shop",
    name: "Bean & Bloom",
    tagline: "Small-batch roasts • Baked fresh daily.",
    style: "serif",
    font: "serif",
    brandStart: "32 95% 55%",
    brandEnd: "2 85% 55%",
    features: ["Mobile menu", "Hours & map", "Order online"],
    sections: [
      { title: "Our Story", body: "Neighborhood coffee crafted by friends who love good beans and good people." },
      { title: "The Menu", body: "Espresso, pour-overs, seasonal lattes, plus pastries baked every morning." },
      { title: "Visit Us", body: "Open daily 7–6 • 123 Main St • Plenty of parking • Dog-friendly patio." },
    ],
  },
  {
    slug: "nonprofit",
    name: "HopeWorks",
    tagline: "Helping neighbors thrive through food, housing, and work.",
    style: "pastel",
    font: "grotesk",
    brandStart: "221 83% 53%",
    brandEnd: "158 64% 45%",
    features: ["Donate now", "Volunteer signup", "Impact stories"],
    sections: [
      { title: "Our Mission", body: "We support families with essential resources and programs that build stability." },
      { title: "Get Involved", body: "Volunteer opportunities every week. No experience needed — just heart." },
      { title: "Your Impact", body: "Every $10 funds two meals. Every hour volunteered touches a real life." },
    ],
  },
  {
    slug: "handyman",
    name: "FixRight",
    tagline: "Fast, friendly home repairs — done right the first time.",
    style: "mono",
    font: "mono",
    brandStart: "26 95% 55%",
    brandEnd: "221 83% 53%",
    features: ["Same-week scheduling", "Upfront pricing", "Licensed & insured"],
    sections: [
      { title: "What We Do", body: "Small fixes, painting, fixtures, drywall, TV mounts, and more." },
      { title: "How It Works", body: "Get a quick estimate, pick a time, and we’ll be there." },
      { title: "Coverage", body: "Serving the greater metro area, 7 days a week." },
    ],
  },

  /* NEW: External demo (Option A) */
  {
    slug: "alweather",
    name: "AlWeather.org",
    tagline: "Severe weather alerts, forecasts, and resources.",
    style: "modern",
    font: "sans",
    brandStart: "221 83% 53%", // blue
    brandEnd: "199 89% 48%",   // cyan
    features: ["Live radar", "Forecasts", "Alerts"],
    sections: [
      { title: "About", body: "A sample link-out demo showcasing a weather-focused site." },
      { title: "Features", body: "Clear navigation, live radar embeds, alert banners, and regional pages." },
      { title: "Call to Action", body: "Encourage signups for alerts or donations to support operations." },
    ],
    externalUrl: "https://www.alweather.org",
  },
];

export function getSample(slug: string) {
  return samples.find((s) => s.slug === slug) || null;
}

export const sampleSlugs = samples.map((s) => s.slug);
