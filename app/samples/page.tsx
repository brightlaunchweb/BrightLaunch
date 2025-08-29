// app/samples/page.tsx
import Link from "next/link";
import { samples } from "./data";

export const metadata = {
  title: "Sample Websites | BrightLaunch",
  description: "Explore sample website designs for small businesses and nonprofits.",
};

export default function SamplesGallery() {
  return (
    <main>
      <section className="container-page">
        <h1 className="section-title">Sample Websites</h1>
        <p className="section-sub">
          Explore a few example sites. Each demo is built with clean layouts, bold type, and smooth interactions.
        </p>

        <div className="mt-10 grid grid-auto-fit gap-6">
          {samples.map((s) => (
            <article
              key={s.slug}
              className="card mockup"
              style={
                s.brandStart && s.brandEnd
                  ? ({ ["--brand-start" as any]: s.brandStart, ["--brand-end" as any]: s.brandEnd } as React.CSSProperties)
                  : undefined
              }
            >
              <div className="card-inner">
                {/* faux preview block */}
                <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 h-44">
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                </div>

                <h2 className="mt-4 text-xl font-semibold">{s.name}</h2>
                <p className="mt-1 text-white/70">{s.tagline}</p>
                <div className="mt-4 flex flex-wrap gap-2 text-sm text-white/70">
                  {s.features.map((f) => (
                    <span key={f} className="badge">{f}</span>
                  ))}
                </div>

                <div className="mt-6 flex items-center gap-3">
                  <Link href={`/samples/${s.slug}`} className="btn-primary">View Demo</Link>
                  <Link href="/#contact" className="btn-secondary">Start a Project</Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
    </main>
  );
}
