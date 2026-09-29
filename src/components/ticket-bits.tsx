import { STAGES, STATUS_LABEL, type SlaState, type Status } from "@/lib/demo-data";

export function StatusBadge({ status }: { status: Status }) {
  const tone: Record<Status, string> = {
    new: "bg-accent text-accent-foreground",
    classified: "bg-accent text-primary",
    diagnostics: "bg-warning text-warning-foreground",
    resolved: "bg-success text-success-foreground",
    closed: "bg-steel text-white",
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm px-2 py-1 text-xs font-bold ${tone[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {STATUS_LABEL[status]}
    </span>
  );
}

export function SlaPill({ state, left }: { state: SlaState; left: string }) {
  const tone: Record<SlaState, string> = {
    ok: "bg-success/12 text-success",
    warning: "bg-warning/25 text-foreground",
    breached: "bg-destructive text-destructive-foreground",
  };
  const prefix = state === "breached" ? "SLA" : "Осталось";
  return (
    <span className={`inline-flex items-center rounded-sm px-2 py-1 text-xs font-bold ${tone[state]}`}>
      {prefix} {left}
    </span>
  );
}

export function SlaBar({ state, percent }: { state: SlaState; percent: number }) {
  const tone: Record<SlaState, string> = {
    ok: "bg-success",
    warning: "bg-warning",
    breached: "bg-destructive",
  };
  return (
    <div className="h-1.5 w-full overflow-hidden rounded-full bg-border">
      <div className={`h-full ${tone[state]}`} style={{ width: `${percent}%` }} />
    </div>
  );
}

export function SlaTimer({ state, left, percent }: { state: SlaState; left: string; percent: number }) {
  const label =
    state === "breached" ? "Срок решения нарушен" : state === "warning" ? "Срок скоро истечёт" : "Срок решения";
  const color =
    state === "breached" ? "text-destructive" : state === "warning" ? "text-warning" : "text-success";
  return (
    <div className="min-w-48 rounded-md border bg-card p-3">
      <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-1 text-2xl font-bold tabular-nums ${color}`}>{left}</p>
      <div className="mt-2">
        <SlaBar state={state} percent={percent} />
      </div>
    </div>
  );
}

export function Stepper({ status }: { status: Status }) {
  const current = STAGES.findIndex((s) => s.key === status);
  return (
    <ol className="flex flex-wrap gap-y-3">
      {STAGES.map((stage, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={stage.key} className="flex flex-1 min-w-32 items-center gap-2">
            <span
              className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                done
                  ? "bg-primary text-primary-foreground"
                  : active
                    ? "bg-deep text-deep-foreground ring-4 ring-primary/20"
                    : "border border-border bg-card text-muted-foreground"
              }`}
            >
              {done ? "✓" : i + 1}
            </span>
            <span
              className={`text-xs leading-tight ${active ? "font-bold text-foreground" : "text-muted-foreground"}`}
            >
              {stage.label}
            </span>
            {i < STAGES.length - 1 && <span className="hidden h-px flex-1 bg-border sm:block" />}
          </li>
        );
      })}
    </ol>
  );
}
