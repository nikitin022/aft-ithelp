import logoWhite from "@/assets/aft-logo-white.webp.asset.json";
import logoClassic from "@/assets/aft-logo-classic.png.asset.json";

/**
 * Фирменная символика АФТ.
 * AftMark — компактный знак (три параллелограмма) для узких форматов.
 * AftLogo — полный логотип (файлы из брендбука) для широкой шапки.
 * В одном макете используется либо знак, либо логотип.
 */

export function AftMark({ className = "h-8 w-8" }: { className?: string }) {
  const bars = ["var(--color-steel)", "var(--color-primary)", "var(--color-destructive)"];
  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {bars.map((fill, i) => (
        <polygon
          key={i}
          points={`${4 + i * 13},40 ${18 + i * 13},8 ${26 + i * 13},8 ${12 + i * 13},40`}
          fill={fill}
        />
      ))}
    </svg>
  );
}

export function AftLogo({
  className = "",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "brand";
}) {
  const src = tone === "light" ? logoWhite.url : logoClassic.url;
  const sub = tone === "light" ? "text-white/60" : "text-muted-foreground";

  return (
    <span className={`inline-flex flex-col gap-2 ${className}`}>
      <img src={src} alt="АФТ" className="h-5 w-auto self-start" />
      <span className={`text-[11px] font-bold uppercase tracking-[0.18em] ${sub}`}>ITHelp · Service Desk</span>
    </span>
  );
}
