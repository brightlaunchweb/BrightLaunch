// app/samples/stylekits.tsx
import { Inter, Playfair_Display, Poppins, DM_Mono, Space_Grotesk } from "next/font/google";

export type StyleKey = "modern" | "serif" | "pastel" | "mono" | "neon";
export type FontKey = "sans" | "serif" | "mono" | "grotesk";

const inter = Inter({ subsets: ["latin"], display: "swap" });
const playfair = Playfair_Display({ subsets: ["latin"], display: "swap" });
const poppins = Poppins({ subsets: ["latin"], weight: ["400","500","600","700"], display: "swap" });
const dmMono = DM_Mono({ subsets: ["latin"], weight: ["300","400","500"], display: "swap" });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], weight: ["400","500","600","700"], display: "swap" });

function fontClass(style: StyleKey, font?: FontKey) {
  const f = font || (
    style === "serif" ? "serif" :
    style === "mono" ? "mono" :
    style === "neon" ? "grotesk" :
    "sans"
  );
  switch (f) {
    case "serif": return playfair.className;
    case "mono": return dmMono.className;
    case "grotesk": return spaceGrotesk.className;
    default: return poppins.className || inter.className;
  }
}

export type StyleKit = {
  key: StyleKey;
  fontClass: string;
  // full-bleed hero background
  wrapperBg: string;     // includes text color
  previewBg: string;     // used in gallery thumbnail
  card: string;          // appended after "card" to override
  btnPrimary: string;    // full button class (use without btn-primary)
  btnSecondary: string;  // full button class (use without btn-secondary)
  badge: string;         // badge style (use instead of .badge)
};

export function getStyleKit(style: StyleKey = "modern", font?: FontKey): StyleKit {
  switch (style) {
    case "serif":
      return {
        key: style,
        fontClass: fontClass(style, font),
        wrapperBg: "bg-gradient-to-b from-neutral-50 to-neutral-100 text-slate-900",
        previewBg: "bg-gradient-to-b from-neutral-50 to-neutral-100",
        card: "bg-white border-slate-200 shadow-sm",
        btnPrimary: "btn bg-slate-900 text-white hover:bg-slate-800",
        btnSecondary: "btn bg-white border-slate-300 hover:bg-neutral-50",
        badge: "inline-flex items-center rounded-full border border-slate-200 bg-white px-3 py-1 text-xs font-medium text-slate-700",
      };
    case "pastel":
      return {
        key: style,
        fontClass: fontClass(style, font),
        wrapperBg: "bg-gradient-to-b from-fuchsia-50 to-sky-50 text-slate-900",
        previewBg: "bg-gradient-to-b from-fuchsia-50 to-sky-50",
        card: "bg-white border-pink-100/80 shadow-[0_10px_25px_-15px_rgba(236,72,153,0.35)]",
        btnPrimary: "btn bg-gradient-to-r from-pink-500 to-sky-500 text-white hover:from-pink-400 hover:to-sky-400",
        btnSecondary: "btn bg-white border-pink-200 hover:bg-pink-50",
        badge: "inline-flex items-center rounded-full border border-pink-200 bg-pink-50 px-3 py-1 text-xs font-medium text-pink-700",
      };
    case "mono":
      return {
        key: style,
        fontClass: fontClass(style, font),
        wrapperBg: "bg-gradient-to-b from-zinc-950 to-zinc-900 text-zinc-100",
        previewBg: "bg-gradient-to-b from-zinc-950 to-zinc-900",
        card: "bg-zinc-900 border-zinc-800",
        btnPrimary: "btn bg-zinc-100 text-zinc-900 hover:bg-white",
        btnSecondary: "btn bg-zinc-900 border-zinc-700 hover:bg-zinc-800",
        badge: "inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-medium text-zinc-200",
      };
    case "neon":
      return {
        key: style,
        fontClass: fontClass(style, font),
        wrapperBg: "bg-gradient-to-b from-black to-slate-950 text-white",
        previewBg: "bg-gradient-to-b from-black to-slate-950",
        card: "bg-black/40 border-cyan-500/20 shadow-[0_0_40px_-20px_rgba(34,211,238,0.45)]",
        btnPrimary: "btn bg-gradient-to-r from-cyan-500 to-fuchsia-500 text-white hover:from-cyan-400 hover:to-fuchsia-400",
        btnSecondary: "btn bg-white/10 border border-white/15 hover:bg-white/15",
        badge: "inline-flex items-center rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-medium text-cyan-200",
      };
    case "modern":
    default:
      return {
        key: "modern",
        fontClass: fontClass("modern", font),
        wrapperBg: "bg-gradient-to-b from-slate-950 to-slate-900 text-white",
        previewBg: "bg-gradient-to-b from-slate-950 to-slate-900",
        card: "bg-white/5 border-white/10 backdrop-blur",
        btnPrimary: "btn bg-gradient-to-r from-orange-500 to-blue-600 hover:from-orange-400 hover:to-blue-500 shadow-lg shadow-blue-950/40",
        btnSecondary: "btn bg-white/10 border border-white/10 hover:bg-white/20",
        badge: "inline-flex items-center rounded-full border border-white/15 bg-white/5 px-3 py-1 text-xs font-medium text-white/80",
      };
  }
}
