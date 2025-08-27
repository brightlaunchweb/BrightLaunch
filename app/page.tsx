export default function Page() {
  return (
    <main>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container-page pt-20 sm:pt-24 md:pt-28 pb-16 sm:pb-20">
          <div className="grid hero-grid gap-10 items-center">
            <div>
              <span className="badge">AI-accelerated web design</span>
              <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05]">
                Launch a site that <span className="gradient-text">wins customers</span>
              </h1>
              <p className="section-sub">
                BrightLaunch builds sleek, fast, mobile-first websites for small businesses and nonprofits. We use AI to move quickly — you keep the quality, lose the wait.
              </p>
              <div className="mt-8 flex flex-wrap items-center gap-4">
                <a href="#contact" className="btn-primary">Get a free homepage mockup</a>
                <a href="#pricing" className="btn-secondary">See pricing</a>
              </div>
              <p className="mt-4 text-sm text-white/60">No pushy sales. Real deliverables in days, not weeks.</p>
            </div>

            {/* Right: mockup */}
            <div className="relative">
              <div className="card glow-line">
                <div className="card-inner">
                  <div className="aspect-[16/10] rounded-xl bg-gradient-to-br from-slate-800 to-slate-900 mockup flex items-center justify-center">
                    <svg width="100%" height="100%" viewBox="0 0 600 375" className="rounded-xl">
                      <defs>
                        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
                          <stop offset="0%" stopColor="#fb923c"/>
                          <stop offset="100%" stopColor="#3b82f6"/>
                        </linearGradient>
                      </defs>
                      <rect x="20" y="20" width="560" height="80" rx="12" fill="url(#g)" opacity="0.8"/>
                      <rect x="20" y="120" width="360" height="30" rx="8" fill="#1f2937"/>
                      <rect x="20" y="160" width="280" height="30" rx="8" fill="#1f2937" opacity="0.8"/>
                      <rect x="20" y="220" width="170" height="110" rx="12" fill="#0f172a"/>
                      <rect x="205" y="220" width="170" height="110" rx="12" fill="#0f172a"/>
                      <rect x="390" y="220" width="170" height="110" rx="12" fill="#0f172a"/>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust row */}
      <section className="container-page pb-8">
        <div className="text-white/60 text-sm">Perfect for: boutiques, home services, coffee shops, churches, charities, clubs, and more.</div>
      </section>

      {/* Services */}
      <section id="services" className="container-page py-16 sm:py-20">
        <h2 className="section-title">What we build</h2>
        <p className="section-sub">Everything you need to look polished online and convert visitors into customers.</p>
        <div className="mt-10 grid grid-auto-fit gap-6">
          {[{
            title: 'Modern landing pages',
            desc: 'High-converting, mobile-first pages with crisp visuals and clear calls to action.'
          },{
            title: 'Multi-page sites',
            desc: 'About, Services, Gallery, Blog — we craft a cohesive, speedy experience.'
          },{
            title: 'Local SEO setup',
            desc: 'Google Business Profile, schema, page titles, and metadata tuned for your niche.'
          },{
            title: 'Hosting & care',
            desc: 'Fast hosting, SSL, updates, backups, and small fixes included on care plans.'
          }].map((item) => (
            <div className="card" key={item.title}>
              <div className="card-inner">
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="mt-2 text-white/70">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Work */}
      <section id="work" className="container-page py-16 sm:py-20">
        <h2 className="section-title">Recent work & mockups</h2>
        <p className="section-sub">A quick look at our style — clean layouts, bold type, and smooth interactions.</p>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1,2,3,4,5,6].map((i) => (
            <figure className="card" key={i}>
              <div className="card-inner">
                <div className="aspect-[4/3] rounded-xl bg-gradient-to-tr from-slate-800 to-slate-900 mockup" />
                <figcaption className="mt-4 text-white/70">Concept #{i}</figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="container-page py-16 sm:py-20">
        <h2 className="section-title">Simple pricing</h2>
        <p className="section-sub">Transparent packages designed for small teams and nonprofits.</p>
        <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { name: 'Starter', price: '$799', bullets: ['One-page site', 'Copy & images included', '1 round of edits', 'Launch in ~7 days'] },
            { name: 'Business', price: '$1,999', bullets: ['Up to 6 pages', 'Brand polish & icons', 'Blog setup', 'Launch in ~2–3 weeks'] },
            { name: 'Care Plan', price: '$79/mo', bullets: ['Hosting & SSL', 'Edits & updates', 'Backups & monitoring', 'Priority support'] }
          ].map((tier) => (
            <div key={tier.name} className="card">
              <div className="card-inner">
                <h3 className="text-xl font-bold">{tier.name}</h3>
                <div className="mt-2 text-3xl font-black">{tier.price}</div>
                <ul className="mt-4 space-y-2 text-white/80">
                  {tier.bullets.map((b) => <li key={b}>• {b}</li>)}
                </ul>
                <a href="#contact" className="mt-6 inline-block btn-primary">Get started</a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Process */}
      <section id="process" className="container-page py-16 sm:py-20">
        <h2 className="section-title">How it works</h2>
        <p className="section-sub">A streamlined, AI-assisted process keeps quality high and timelines short.</p>
        <ol className="mt-10 grid grid-auto-fit gap-6">
          {[
            ['Discovery call', 'We learn your goals, audience, and style preferences.'],
            ['Content sprint', 'We draft copy and gather visuals with AI assistance.'],
            ['Design & build', 'You review an interactive mockup; we iterate fast.'],
            ['Launch & care', 'Deploy, connect domain, and set up analytics & SEO.']
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

      {/* Testimonials */}
      <section id="testimonials" className="container-page py-16 sm:py-20">
        <h2 className="section-title">Kind words</h2>
        <p className="section-sub">What small teams say after launch.</p>
        <div className="mt-10 grid grid-auto-fit gap-6">
          {[
            ['Coffee Roasters', '“BrightLaunch delivered a gorgeous site and clear messaging. Online orders jumped within days.”'],
            ['Local Charity', '“They made it simple for our volunteers to find info and donate on mobile.”'],
            ['Handyman Co.', '“Fast, clean, professional — and the Google calls started picking up.”']
          ].map(([who, quote]) => (
            <blockquote className="card" key={who}>
              <div className="card-inner">
                <p className="text-white/80">{quote}</p>
                <footer className="mt-4 text-white/50">— {who}</footer>
              </div>
            </blockquote>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section id="faq" className="container-page py-16 sm:py-20">
        <h2 className="section-title">FAQ</h2>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            ['What platforms do you use?', 'Next.js, Tailwind, and modern hosting for speed and SEO. We also support low-code stacks when appropriate.'],
            ['Do you help with content?', 'Yes — we draft copy, suggest images, and set tone based on your brand.'],
            ['Can you redesign my existing site?', 'Absolutely. We’ll audit what works, then rebuild or refresh for performance and clarity.'],
            ['What about timelines?', 'Most launches are within 1–3 weeks depending on scope.']
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
      <section id="contact" className="container-page py-16 sm:py-24">
        <div className="card">
          <div className="card-inner">
            <div className="grid gap-8 md:grid-cols-2 items-start">
              <div>
                <h2 className="section-title">Tell us about your project</h2>
                <p className="section-sub">We’ll reply with a free mini‑brief and a suggested package.</p>
                <ul className="mt-6 space-y-2 text-white/80">
                  <li>• 15‑minute intro call available</li>
                  <li>• Nonprofits: ask about discounted rates</li>
                </ul>
              </div>
              <form className="space-y-4" action="mailto:hello@yourdomain.com" method="post">
                <input className="input" name="name" placeholder="Your name" required />
                <input className="input" name="email" type="email" placeholder="Email" required />
                <input className="input" name="company" placeholder="Business / nonprofit" />
                <textarea className="textarea" name="message" placeholder="What do you need? (e.g., 3-page site, online booking, donate page)" />
                <button className="btn-primary" type="submit">Send</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/10">
        <div className="container-page py-10 flex flex-col sm:flex-row items-center justify-between gap-3 text-white/60 text-sm">
          <div>© {new Date().getFullYear()} BrightLaunch</div>
          <nav className="flex items-center gap-6">
            <a href="#services" className="footer-link">Services</a>
            <a href="#pricing" className="footer-link">Pricing</a>
            <a href="#contact" className="footer-link">Contact</a>
          </nav>
        </div>
      </footer>
    </main>
  )
}
