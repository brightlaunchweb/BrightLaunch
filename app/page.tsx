"use client";

import { useEffect, useState } from "react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";  // Added imports for social icons

/** --- GA4 helper --- */
declare global {
  interface Window {
    gtag?: (...args: any[]) => void;
  }
}
function gaEvent(action: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params || {});
  }
}

export default function Page() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [error, setError] = useState<string>("");
  const [scrolled, setScrolled] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 64);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function jumpToContact(plan?: string) {
    if (plan) setSelectedPlan(plan);
    const el = document.getElementById("contact");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const formData = new FormData(form);
    const payload = Object.fromEntries(formData.entries());

    try {
      setStatus("sending");
      setError("");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error((await res.json()).error || "Failed to send");

      setStatus("sent");
      gaEvent("generate_lead", {
        method: "contact_form",
        plan: (payload as any).plan || "(none)",
      });
      form.reset();
      setSelectedPlan(null);
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong");
    }
  }

  // New: Portfolio data with images and descriptions
  const portfolioItems = [
    { title: "Coffee Shop Site", desc: "Clean, mobile-first design boosting online orders by 30%.", img: "/mockup1.jpg" },
    { title: "Local Charity Page", desc: "Donation-focused layout increasing contributions.", img: "/mockup2.jpg" },
    { title: "Handyman Services", desc: "Simple booking system for local leads.", img: "/mockup3.jpg" },
    { title: "Boutique Store", desc: "Elegant e-commerce integration.", img: "/mockup4.jpg" },
    { title: "Nonprofit Event Site", desc: "Event registration and volunteer signup.", img: "/mockup5.jpg" },
    { title: "Cafe Menu Online", desc: "Interactive menu with location map.", img: "/mockup6.jpg" },
  ];

  // New: Enhanced testimonials with avatars and metrics
  const testimonials = [
    { name: "Jane Doe", company: "Coffee Roasters", quote: "“BrightLaunch delivered a gorgeous site. Online orders jumped 30% within days.”", avatar: "/avatar1.jpg" },
    { name: "John Smith", company: "Local Charity", quote: "“Simple for volunteers to donate on mobile. Donations up 25%.”", avatar: "/avatar2.jpg" },
    { name: "Alex Lee", company: "Handyman Co.", quote: "“Fast, professional — Google calls increased immediately.”", avatar: "/avatar3.jpg" },
  ];

  return (
    <main id="main">
      {/* Sticky header (appears after scroll) - Added "Book a Call Now" for urgency */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all",
          scrolled ? "bg-slate-950/70 backdrop-blur border-b border-white/10" : "bg-transparent translate-y-[-120%]",
        ].join(" ")}
        aria-label="Main navigation"
      >
        <div className="container-page h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold">BrightLaunch</a>
          <nav className="hidden sm:flex items-center gap-6">
            <a href="#services" className="nav-link">Services</a>
            <a href="#work" className="nav-link">Work</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>
          <button
            onClick={() => {
              gaEvent("cta_click", { label: "book_call_header" });
              jumpToContact();
            }}
            className="btn-primary hidden sm:inline-flex"
          >
            Book a Call Now
          </button>
        </div>
      </header>

      {/* Hero - Added image instead of placeholder, updated copy for benefits */}
      <section id="top" className="relative overflow-hidden">
        <div className="container-page pt-24 sm:pt-28 md:pt-32 pb-16 sm:pb-20">
          <div className="grid hero-grid gap-10 items-center">  {/* Assume hero-grid is defined elsewhere or in CSS */}
            <div>
              <span className="badge">Modern web design</span>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05]">
                Launch a site that <span className="gradient-text">wins customers & donors</span>
              </h1>
              <p className="section-sub">
                Sleek, fast, mobile-first websites for small businesses and nonprofits. Quick launches, proven results — boost traffic and conversions without the hassle.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button
                  onClick={() => {
                    gaEvent("cta_click", { label: "hero_free_mockup" });
                    jumpToContact();
                  }}
                  className="btn-primary"
                >
                  Get a Free Mockup Today
                </button>
                <a
                  href="#pricing"
                  onClick={() => gaEvent("nav_click", { label: "see_pricing_hero" })}
                  className="btn-secondary"
                >
                  View Pricing
                </a>
                <a
                  href="#contact"
                  onClick={() => gaEvent("cta_click", { label: "book_call_hero" })}
                  className="text-white/70 hover:text-white underline underline-offset-4"
                >
                  Book a 15-min Call
                </a>
              </div>

              {/* Who we’re perfect for */}
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 text-white/70">
                <li>• Home & local services</li>
                <li>• Boutiques & cafes</li>
                <li>• Nonprofits & clubs</li>
              </ul>
            </div>

            {/* Right: Real mockup image */}
            <div className="relative">
              <div className="card glow-line mockup">
                <div className="card-inner">
                  <img 
                    src="/hero-mockup.jpg" 
                    alt="Sample modern website mockup for small business" 
                    className="w-full h-auto rounded-xl"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* New Section: Why Choose Us - Benefits with icons/bullet points for skimmability */}
      <section id="why-us" className="container-page">
        <h2 className="section-title">Why Choose BrightLaunch?</h2>
        <p className="section-sub">Tailored for small teams who need results fast.</p>
        <div className="mt-10 grid grid-auto-fit gap-6">
          {[
            { title: "Fast Launches", desc: "Sites ready in 1-3 weeks, not months." },
            { title: "Affordable Pricing", desc: "Starting at $799 — no hidden fees." },
            { title: "Mobile-First", desc: "Optimized for phones to drive local traffic." },
            { title: "Nonprofit Discounts", desc: "Special rates for charities and clubs." },
            { title: "Proven Results", desc: "Boost conversions by 20-30% on average." },
            { title: "Ongoing Support", desc: "Monthly care plans for peace of mind." },
          ].map(({ title, desc }) => (
            <div className="card" key={title}>
              <div className="card-inner">
                <h3 className="text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-white/70">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Services/Process - Minor copy tweaks for benefits */}
      <section id="services" className="container-page">
        <h2 className="section-title">Our simple process</h2>
        <p className="section-sub">From brief to launch in days — we handle the heavy lifting.</p>
        <ol className="mt-10 grid grid-auto-fit gap-6">
          {[
            ["Brief & plan", "Share your goals; we map pages, features, and tone."],
            ["Design & build", "Custom mockups, then code with Next.js for speed."],
            ["Review & tweak", "Your feedback, one round of edits included."],
            ["Launch & care", "Deploy, domain setup, analytics, SEO, and ongoing support."],
          ].map(([title, desc], idx) => (
            <li className="card" key={title}>
              <div className="card-inner">
                <div className="text-sm text-white/50">Step {idx + 1}</div>
                <h3 className="mt-1 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-white/70">{desc}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* Portfolio/Work - Updated with real items, images, descriptions */}
      <section id="work" className="container-page">
        <h2 className="section-title">Recent Work & Mockups</h2>
        <p className="section-sub">Clean layouts, bold type, smooth interactions — see what we can do for you.</p>
        <div className="mt-10 grid grid-auto-fit gap-6">
          {portfolioItems.map(({ title, desc, img }) => (
            <div className="card mockup" key={title}>
              <div className="card-inner">
                <img src={img} alt={`${title} mockup`} className="w-full h-auto rounded-xl" />
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-white/70">{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing - Changed to table for scannability, added CTA per row */}
      <section id="pricing" className="container-page">
        <h2 className="section-title">Simple Pricing</h2>
        <p className="section-sub">Packages for every need — nonprofits get 20% off.</p>
        <div className="mt-10 overflow-x-auto">
          <table className="pricing-table">
            <thead>
              <tr>
                <th>Plan</th>
                <th>Price</th>
                <th>Features</th>
                <th>Timeline</th>
                <th></th>  {/* CTA column */}
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Starter</td>
                <td>$799</td>
                <td>One-page site, copy & images included, 1 round of edits</td>
                <td>~7 days</td>
                <td>
                  <button 
                    onClick={() => jumpToContact("Starter")} 
                    className="btn-primary text-sm"
                  >
                    Get Started
                  </button>
                </td>
              </tr>
              <tr>
                <td>Business</td>
                <td>$1,999</td>
                <td>Up to 6 pages, brand polish & icons, blog setup</td>
                <td>~2–3 weeks</td>
                <td>
                  <button 
                    onClick={() => jumpToContact("Business")} 
                    className="btn-primary text-sm"
                  >
                    Get Started
                  </button>
                </td>
              </tr>
              <tr>
                <td>Care Plan</td>
                <td>$79/mo</td>
                <td>Hosting & SSL, edits & updates, backups & monitoring, priority support</td>
                <td>Ongoing</td>
                <td>
                  <button 
                    onClick={() => jumpToContact("Care Plan")} 
                    className="btn-primary text-sm"
                  >
                    Get Started
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      {/* Testimonials - Enhanced with avatars, names, metrics */}
      <section id="testimonials" className="container-page">
        <h2 className="section-title">Kind Words from Clients</h2>
        <p className="section-sub">Real results for small teams like yours.</p>
        <div className="mt-10 grid grid-auto-fit gap-6">
          {testimonials.map(({ name, company, quote, avatar }) => (
            <blockquote className="card" key={company}>
              <div className="card-inner">
                <p className="text-white/80">{quote}</p>
                <footer className="mt-4 flex items-center gap-3">
                  <img src={avatar} alt={`${name} avatar`} className="w-10 h-10 rounded-full" />
                  <div>
                    <div className="font-semibold">{name}</div>
                    <div className="text-white/50">{company}</div>
                  </div>
                </footer>
              </div>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ - Expanded with more questions */}
      <section id="faq" className="container-page">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["What platforms do you use?", "Next.js, Tailwind, and modern hosting for speed and SEO. We also support low-code stacks when appropriate."],
            ["Do you help with content?", "Yes — we draft copy, suggest images, and set tone based on your brand."],
            ["Can you redesign my existing site?", "Absolutely. We’ll audit what works, then rebuild or refresh for performance and clarity."],
            ["What about timelines?", "Most launches are within 1–3 weeks depending on scope."],
            ["What if I need e-commerce features?", "We integrate simple shops with Stripe or Shopify for easy sales and donations."],
            ["How do you handle SEO?", "We optimize for local search, add meta tags, and set up Google Analytics/Search Console."],
          ].map(([q, a]) => (
            <div className="card" key={q}>
              <div className="card-inner">
                <h3 className="font-semibold">{q}</h3>
                <p className="mt-2 text-white/70">{a}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact - Added privacy note for transparency */}
      <section id="contact" className="container-page">
        <div className="card">
          <div className="card-inner">
            <div className="grid gap-8 md:grid-cols-2 items-start">
              <div>
                <h2 className="section-title">Tell Us About Your Project</h2>
                <p className="section-sub">We’ll reply within 1 business day with a mini-brief and suggested package.</p>
                <ul className="mt-6 space-y-2 text-white/80">
                  <li>• 15-minute intro call available</li>
                  <li>• Nonprofits: ask about discounted rates</li>
                </ul>
              </div>
              <form className="space-y-4" onSubmit={onSubmit}>
                <input className="input" name="name" placeholder="Your name" required />
                <input className="input" name="email" type="email" placeholder="Email" required />
                <input className="input" name="company" placeholder="Business / nonprofit" />
                <textarea
                  className="textarea"
                  name="message"
                  placeholder="What do you need? (e.g., 3-page site, online booking, donate page)"
                  required
                />

                {/* Selected plan (prefilled when clicking Get started) */}
                <input type="hidden" name="plan" value={selectedPlan ?? ""} />

                {/* Honeypot anti-spam field */}
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                <button
                  className="btn-primary"
                  type="submit"
                  disabled={status === "sending"}
                  onClick={() => gaEvent("cta_click", { label: "contact_send" })}
                >
                  {status === "sending" ? "Sending…" : "Send Message Now"}
                </button>
                {status === "sent" && <p className="text-green-400 text-sm">Thanks! Your message is on the way.</p>}
                {status === "error" && <p className="text-red-400 text-sm">{error || "We could not send your message."}</p>}
                <p className="text-xs text-white/50">We respect your privacy. Your data is used only for responding to inquiries.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer - Added social links */}
      <footer className="border-t border-white/10">
        <div className="container-page py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/60 text-sm">
          <div>© {new Date().getFullYear()} BrightLaunch</div>
          <nav className="flex items-center gap-6">
            <a href="#services" className="footer-link">Services</a>
            <a href="#pricing" className="footer-link">Pricing</a>
            <a href="#contact" className="footer-link">Contact</a>
          </nav>
          <div className="flex items-center gap-4">
            <a href="https://linkedin.com/company/brightlaunch" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
              <FaLinkedin size={20} />
            </a>
            <a href="https://twitter.com/bright_launch" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
              <FaTwitter size={20} />
            </a>
            <a href="https://instagram.com/brightlaunch" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white">
              <FaInstagram size={20} />
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}