"use client";

import { useEffect, useState } from "react";
import { FaLinkedin, FaTwitter, FaInstagram } from "react-icons/fa";

/** Optional GA4 helper */
declare global { interface Window { gtag?: (...args: any[]) => void; } }
function gaEvent(action: string, params?: Record<string, any>) {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", action, params || {});
  }
}

/** Animated shimmer block used in mockups */
function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div
      className={[
        "relative overflow-hidden rounded-md bg-white/5 border border-white/10",
        className,
      ].join(" ")}
    >
      <div
        className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent"
        aria-hidden
      />
      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
    </div>
  );
}

/** Right-side hero visual: faux browser + phone */
function HeroShowcase() {
  return (
    <div className="relative">
      <div className="card mockup">
        <div className="card-inner">
          {/* Browser chrome */}
          <div className="flex items-center gap-2 pb-3">
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
            <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-400/80" />
            <div className="ml-3 text-xs text-white/50">brightlaunch preview</div>
          </div>

          {/* Browser content */}
          <div className="grid gap-3">
            <Shimmer className="h-8" />
            <div className="grid grid-cols-3 gap-3">
              <Shimmer className="h-20 col-span-2" />
              <Shimmer className="h-20" />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <Shimmer className="h-24" />
              <Shimmer className="h-24" />
              <Shimmer className="h-24" />
            </div>
          </div>
        </div>
      </div>

      {/* Phone overlay */}
      <div className="absolute -bottom-6 -right-4 w-40 sm:w-48 md:w-56 lg:w-64">
        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-b from-slate-900 to-slate-800 p-3 shadow-2xl">
          <div className="rounded-2xl bg-black/20 p-2">
            <Shimmer className="h-6" />
            <div className="mt-2 grid gap-2">
              <Shimmer className="h-24" />
              <div className="grid grid-cols-2 gap-2">
                <Shimmer className="h-10" />
                <Shimmer className="h-10" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
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
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
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
      gaEvent("generate_lead", { method: "contact_form", plan: (payload as any).plan || "(none)" });
      form.reset();
      setSelectedPlan(null);
    } catch (err: any) {
      setStatus("error");
      setError(err?.message || "Something went wrong");
    }
  }

  const portfolio = [
    { title: "Coffee Shop Site", desc: "Clean, mobile-first design boosting online orders." },
    { title: "Local Charity Page", desc: "Donation-focused layout that converts." },
    { title: "Handyman Services", desc: "Simple booking system for local leads." },
  ];

  const testimonials = [
    { name: "Jane Doe", company: "Coffee Roasters", quote: "“BrightLaunch delivered a gorgeous site. Orders up 30%.”" },
    { name: "John Smith", company: "Local Charity", quote: "“Easy to donate on mobile. Contributions increased.”" },
  ];

  return (
    <main id="main" aria-live="polite">
      {/* Sticky header */}
      <header
        className={[
          "fixed inset-x-0 top-0 z-50 transition-all",
          scrolled ? "bg-slate-950/70 backdrop-blur border-b border-white/10" : "bg-transparent translate-y-[-120%]",
        ].join(" ")}
        aria-label="Main"
      >
        <div className="container-page h-14 flex items-center justify-between">
          <a href="#top" className="font-semibold" aria-label="BrightLaunch home">BrightLaunch</a>
          <nav className="hidden sm:flex items-center gap-6" aria-label="Primary">
            <a href="#services" className="nav-link">Services</a>
            <a href="#work" className="nav-link">Work</a>
            <a href="#pricing" className="nav-link">Pricing</a>
            <a href="#faq" className="nav-link">FAQ</a>
          </nav>
          <button
            onClick={() => { gaEvent("cta_click", { label: "book_call_header" }); jumpToContact(); }}
            className="btn-primary hidden sm:inline-flex"
          >
            Book a Call
          </button>
        </div>
      </header>

      {/* HERO — tighter top space + new headline + real visual */}
      <section id="top" className="relative overflow-hidden">
        {/* tightened hero padding */}
        <div className="container-page pt-14 sm:pt-16 md:pt-20 pb-14 sm:pb-16">
          <div className="grid hero-grid gap-10 items-center">
            <div>
              <span className="badge">Modern web design</span>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05]">
                <span className="gradient-text">Modern websites</span> that grow customers & supporters
              </h1>
              <p className="section-sub">
                Sleek, fast, mobile-first sites built for small businesses and nonprofits.
                Clear messaging, clean design, and performance that helps people convert.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <button onClick={() => { gaEvent("cta_click", { label: "hero_free_mockup" }); jumpToContact(); }} className="btn-primary">
                  Get a Free Mockup
                </button>
                <a href="#pricing" onClick={() => gaEvent("nav_click", { label: "see_pricing_hero" })} className="btn-secondary">
                  View Pricing
                </a>
                <a href="#contact" onClick={() => gaEvent("cta_click", { label: "book_call_hero" })} className="text-white/70 hover:text-white underline underline-offset-4">
                  Book a 15-min Call
                </a>
              </div>
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-2 text-white/70" aria-label="Perfect for">
                <li>• Home & local services</li>
                <li>• Boutiques & cafes</li>
                <li>• Nonprofits & clubs</li>
              </ul>
            </div>

            {/* Right visual */}
            <HeroShowcase />
          </div>
        </div>
      </section>

      {/* Why us */}
      <section id="why-us" className="container-page">
        <h2 className="section-title">Why Choose BrightLaunch?</h2>
        <p className="section-sub">Tailored for small teams who need results fast.</p>
        <div className="mt-10 grid grid-auto-fit gap-6">
          {[
            { title: "Fast Launches", desc: "Sites ready in 1–3 weeks, not months." },
            { title: "Affordable", desc: "Starting at $799 — no hidden fees." },
            { title: "Mobile-First", desc: "Optimized for phones to drive local traffic." },
            { title: "Nonprofit Discounts", desc: "Special rates for charities and clubs." },
            { title: "Built to Convert", desc: "Clear CTAs, speed, and SEO best practices." },
            { title: "Ongoing Care", desc: "Edits, updates, and monitoring available." },
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

      {/* Work */}
      <section id="work" className="container-page">
        <h2 className="section-title">Recent Work & Mockups</h2>
        <p className="section-sub">Clean layouts, bold type, smooth interactions.</p>
        <div className="mt-10 grid grid-auto-fit gap-6">
          {portfolio.map(({ title, desc }) => (
            <article className="card mockup" key={title} aria-label={title}>
              <div className="card-inner">
                <Shimmer className="h-44 rounded-xl" />
                <h3 className="mt-4 text-xl font-semibold">{title}</h3>
                <p className="mt-2 text-white/70">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container-page">
        <h2 className="section-title">Simple Pricing</h2>
        <p className="section-sub">Packages for every need — nonprofits get 20% off.</p>
        <div className="mt-10 overflow-x-auto">
          <table className="pricing-table">
            <thead>
              <tr>
                <th scope="col">Plan</th>
                <th scope="col">Price</th>
                <th scope="col">Features</th>
                <th scope="col">Timeline</th>
                <th scope="col" aria-label="Actions"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Starter</td>
                <td>$799</td>
                <td>One-page site, copy & images, 1 round of edits</td>
                <td>~7 days</td>
                <td><button onClick={() => jumpToContact("Starter")} className="btn-primary text-sm">Get Started</button></td>
              </tr>
              <tr>
                <td>Business</td>
                <td>$1,999</td>
                <td>Up to 6 pages, brand polish & icons, blog setup</td>
                <td>~2–3 weeks</td>
                <td><button onClick={() => jumpToContact("Business")} className="btn-primary text-sm">Get Started</button></td>
              </tr>
              <tr>
                <td>Care Plan</td>
                <td>$79/mo</td>
                <td>Hosting & SSL, edits & updates, backups & monitoring</td>
                <td>Ongoing</td>
                <td><button onClick={() => jumpToContact("Care Plan")} className="btn-primary text-sm">Get Started</button></td>
              </tr>
            </tbody>
          </table>
          {selectedPlan && <p className="mt-3 text-sm text-white/70">You selected: <span className="font-semibold">{selectedPlan}</span></p>}
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="container-page">
        <h2 className="section-title">Kind Words from Clients</h2>
        <p className="section-sub">Real results for small teams like yours.</p>
        <div className="mt-10 grid grid-auto-fit gap-6">
          {testimonials.map(({ name, company, quote }) => (
            <blockquote className="card" key={company}>
              <div className="card-inner">
                <p className="text-white/80">{quote}</p>
                <footer className="mt-4 text-white/50">{name} — {company}</footer>
              </div>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-page">
        <h2 className="section-title">Frequently Asked Questions</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ["What platforms do you use?", "Next.js, Tailwind, and modern hosting for speed and SEO. We also support low-code stacks when appropriate."],
            ["Do you help with content?", "Yes — we draft copy, suggest images, and set tone based on your brand."],
            ["Can you redesign my existing site?", "Absolutely. We’ll audit what works, then rebuild or refresh for performance and clarity."],
            ["What about timelines?", "Most launches are within 1–3 weeks depending on scope."],
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

      {/* Contact */}
      <section id="contact" className="container-page">
        <div className="card">
          <div className="card-inner">
            <div className="grid gap-8 md:grid-cols-2 items-start">
              <div>
                <h2 className="section-title">Tell Us About Your Project</h2>
                <p className="section-sub">We’ll reply within 1 business day with a mini-brief and suggested package.</p>
                {selectedPlan && <p className="mt-4 text-sm text-white/70">Selected plan: <span className="font-semibold">{selectedPlan}</span></p>}
              </div>

              <form className="space-y-4" onSubmit={onSubmit} aria-label="Contact form">
                <label className="sr-only" htmlFor="name">Your name</label>
                <input className="input" id="name" name="name" placeholder="Your name" required />
                <label className="sr-only" htmlFor="email">Email</label>
                <input className="input" id="email" name="email" type="email" placeholder="Email" required />
                <label className="sr-only" htmlFor="company">Business / nonprofit</label>
                <input className="input" id="company" name="company" placeholder="Business / nonprofit" />
                <label className="sr-only" htmlFor="message">Message</label>
                <textarea className="textarea" id="message" name="message" placeholder="What do you need? (e.g., 3-page site, booking, donate page)" required />

                <input type="hidden" name="plan" value={selectedPlan ?? ""} />
                <input type="text" name="website" className="hidden" tabIndex={-1} autoComplete="off" />

                <button
                  className="btn-primary"
                  type="submit"
                  disabled={status === "sending"}
                  onClick={() => gaEvent("cta_click", { label: "contact_send" })}
                >
                  {status === "sending" ? "Sending…" : "Send Message"}
                </button>
                {status === "sent" && <p className="text-green-400 text-sm">Thanks! Your message is on the way.</p>}
                {status === "error" && <p className="text-red-400 text-sm">{error || "We couldn’t send your message."}</p>}
                <p className="text-xs text-white/50">We respect your privacy. Your data is used only to respond to your inquiry.</p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container-page py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/60 text-sm">
          <div>© {new Date().getFullYear()} BrightLaunch</div>
          <nav className="flex items-center gap-6" aria-label="Footer">
            <a href="#services" className="footer-link">Services</a>
            <a href="#pricing" className="footer-link">Pricing</a>
            <a href="#contact" className="footer-link">Contact</a>
          </nav>
          <div className="flex items-center gap-4" aria-label="Social">
            <a href="https://linkedin.com/company/brightlaunch" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white" aria-label="LinkedIn"><FaLinkedin size={20} /></a>
            <a href="https://twitter.com/bright_launch" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white" aria-label="Twitter / X"><FaTwitter size={20} /></a>
            <a href="https://instagram.com/brightlaunch" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white" aria-label="Instagram"><FaInstagram size={20} /></a>
          </div>
        </div>
      </footer>
    </main>
  );
}
