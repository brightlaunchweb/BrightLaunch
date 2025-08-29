// app/samples/page.tsx
import Link from "next/link";
import { samples } from "./data";
import { getStyleKit } from "./stylekits";

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
          Explore example sites with different styles — elegant serif, playful pastel, monochrome, neon, and more.
        </p>

        <div className="mt-10 grid grid-auto-fit gap-6">
          {samples.map((s) => {
            const kit = getStyleKit(s.style || "modern", s.font);
            const isExternal = Boolean(s.externalUrl);
            const href = s.externalUrl || `/samples/${s.slug}`;

            return (
              <article key={s.slug} className="card">
                <div className="card-inner">
                  <div className={`relative overflow-hidden rounded-xl border h-44 ${kit.previewBg} ${s.style === "serif" || s.style === "pastel" ? "border-slate-200" : "border-white/10"}`}>
                    <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3">
                    <div>
                      <h2 className="text-xl font-semibold">{s.name}</h2>
                      <p className="mt-1 opacity-70">{s.tagline}</p>
                    </div>
                    <span className={kit.badge}>{s.style || "modern"}</span>
                  </div>

                  <div className="mt-4 flex flex-wrap gap-2 text-sm opacity-80">
                    {s.features.map((f) => <span key={f} className={kit.badge}>{f}</span>)}
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <Link
                      href={href}
                      className={kit.btnPrimary}
                      prefetch={false}
                      target={isExternal ? "_blank" : undefined}
                      rel={isExternal ? "noopener noreferrer" : undefined}
                    >
                      View Demo{isExternal ? " →" : ""}
                    </Link>
                    <Link href="/#contact" className={kit.btnSecondary}>Start a Project</Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
    </main>
  );
}
