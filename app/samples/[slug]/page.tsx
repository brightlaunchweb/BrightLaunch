// app/samples/[slug]/page.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { getSample, sampleSlugs } from "../data";

/* Generate static pages for each sample slug */
export async function generateStaticParams() {
  return sampleSlugs.map((slug) => ({ slug }));
}

/* Per-page SEO */
export async function generateMetadata(
  { params }: { params: { slug: string } }
): Promise<Metadata> {
  const s = getSample(params.slug);
  if (!s) return { title: "Sample Not Found" };
  return {
    title: `${s.name} — Sample Website | BrightLaunch`,
    description: s.tagline,
    alternates: { canonical: `https://www.brightlaunchweb.com/samples/${s.slug}` },
  };
}

/* Local shimmer block (no external images needed) */
function Shimmer({ className = "" }: { className?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-md bg-white/5 border border-white/10 ${className}`}>
      <div className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}

export default function SamplePage({ params }: { params: { slug: string } }) {
  const s = getSample(params.slug);
  if (!s) {
    return (
      <main className="container-page">
        <h1 className="section-title">Sample not found</h1>
        <p className="section-sub">This demo may have been renamed.</p>
        <div className="mt-6">
          <Link href="/samples" className="btn-secondary">Back to Samples</Link>
        </div>
      </main>
    );
  }

  const styleVars =
    s.brandStart && s.brandEnd
      ? ({ ["--brand-start" as any]: s.brandStart, ["--brand-end" as any]: s.brandEnd } as React.CSSProperties)
      : undefined;

  return (
    <main>
      {/* HERO */}
      <section className="container-page" style={styleVars}>
        <div className="grid hero-grid gap-10 items-center">
          <div>
            <span className="badge">Sample website</span>
            <h1 className="mt-4 text-4xl sm:text-5xl md:text-6xl font-black leading-[1.05]">
              <span className="gradient-text">{s.name}</span>
            </h1>
            <p className="section-sub">{s.tagline}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {s.features.map((f) => (
                <span className="badge" key={f}>{f}</span>
              ))}
            </div>
            <div className="mt-8 flex flex-wrap gap-4">
              <Link href="/#contact" className="btn-primary">Start a Project</Link>
              <Link href="/samples" className="btn-secondary">More Samples</Link>
            </div>
          </div>

          {/* Right visual: faux browser + phone */}
          <div className="relative">
            <div className="card mockup">
              <div className="card-inner">
                <div className="flex items-center gap-2 pb-3">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-red-400/80" />
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-yellow-300/80" />
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-green-400/80" />
                  <div className="ml-3 text-xs text-white/50">{s.slug} preview</div>
                </div>
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
        </div>

        {/* Page sections */}
        <div className="mt-14 grid grid-auto-fit gap-6">
          {s.sections.map((sec) => (
            <article className="card" key={sec.title}>
              <div className="card-inner">
                <h2 className="text-xl font-semibold">{sec.title}</h2>
                <p className="mt-2 text-white/70">{sec.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-10 text-white/60 text-sm">
          This is a sample created by BrightLaunch. Content is placeholder only.
        </div>
      </section>

      <style>{`@keyframes shimmer { 100% { transform: translateX(100%); } }`}</style>
    </main>
  );
}
