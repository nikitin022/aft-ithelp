/**
 * Фирменный знак АФТ: три вытянутых параллелограмма.
 * Mark — для узких форматов, Logo — полный логотип для широкой шапки.
 * В одном макете используется либо знак, либо логотип.
 */

export function AftMark({
  className = "h-8 w-8",
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "brand";
}) {
  const bars = tone === "light" ? ["#FFFFFF", "#FFFFFF", "#FFFFFF"] : ["#00519A", "#00519A", "#00519A"];
  const opacities = [1, 0.75, 0.45];

  return (
    <svg viewBox="0 0 48 48" className={className} aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <polygon
          key={i}
          points={`${8 + i * 12},40 ${18 + i * 12},8 ${25 + i * 12},8 ${15 + i * 12},40`}
          fill={bars[i]}
          opacity={opacities[i]}
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
  const text = tone === "light" ? "text-white" : "text-primary";
  const sub = tone === "light" ? "text-white/60" : "text-steel";

  return (
    <span className={`inline-flex items-center gap-3 ${className}`}>
      <AftMark className="h-7 w-7" tone={tone} />
      <span className="flex flex-col leading-none">
        <span className={`text-lg font-bold tracking-tight ${text}`}>ITHelp</span>
        <span className={`mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] ${sub}`}>
          АФТ · Service Desk
        </span>
      </span>
    </span>
  );
}
