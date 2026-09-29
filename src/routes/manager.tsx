import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell } from "@/components/portal-shell";
import { SlaBar, SlaPill, StatusBadge } from "@/components/ticket-bits";
import { SPECIALISTS, TICKETS } from "@/lib/demo-data";

export const Route = createFileRoute("/manager")({
  head: () => ({
    meta: [
      { title: "Контроль SLA — ITHelp" },
      {
        name: "description",
        content:
          "Сводка руководителя ИТ-службы АФТ: просроченные заявки и обращения под угрозой SLA, нагрузка специалистов.",
      },
      { property: "og:title", content: "Контроль SLA — ITHelp" },
      { property: "og:description", content: "Просрочки, риски и загрузка команды поддержки на одном экране." },
    ],
  }),
  component: Manager,
});

function Manager() {
  const breached = TICKETS.filter((t) => t.slaState === "breached");
  const atRisk = TICKETS.filter((t) => t.slaState === "warning");

  return (
    <PortalShell
      title="Просроченные и под угрозой"
      subtitle="Надзор за сроками: где SLA уже нарушен, где истекает в ближайший час и как распределена нагрузка."
    >
      <div className="grid gap-3 sm:grid-cols-4">
        <Kpi label="Нарушен SLA" value={String(breached.length)} tone="danger" />
        <Kpi label="Под угрозой" value={String(atRisk.length)} tone="warning" />
        <Kpi label="В работе всего" value="19" />
        <Kpi label="Решено в срок за неделю" value="94%" tone="success" />
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1fr_340px]">
        <section className="rounded-md border bg-card shadow-card">
          <h2 className="border-b px-5 py-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Требуют вмешательства
          </h2>
          <ul className="divide-y">
            {[...breached, ...atRisk].map((t) => (
              <li key={t.id} className="px-5 py-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <Link
                        to="/tickets/$id"
                        params={{ id: t.id }}
                        className="text-sm font-bold tabular-nums text-primary hover:underline"
                      >
                        {t.id}
                      </Link>
                      <StatusBadge status={t.status} />
                    </div>
                    <p className="mt-1.5 font-bold">{t.subject}</p>
                    <p className="text-xs text-muted-foreground">
                      {t.assignee ?? "Без исполнителя"} · {t.line} · {t.requesterUnit}
                    </p>
                  </div>
                  <div className="w-full sm:w-44">
                    <SlaPill state={t.slaState} left={t.slaLeft} />
                    <div className="mt-2">
                      <SlaBar state={t.slaState} percent={t.slaPercent} />
                    </div>
                    <button className="mt-2 text-xs font-bold text-primary hover:underline">
                      Перераспределить
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <aside className="rounded-md border bg-card p-5 shadow-card">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Нагрузка специалистов</h2>
          <ul className="mt-4 space-y-4">
            {SPECIALISTS.map((s) => (
              <li key={s.name}>
                <div className="flex items-baseline justify-between text-sm">
                  <span className="font-bold">{s.name}</span>
                  <span className="text-xs text-muted-foreground">{s.active} в работе</span>
                </div>
                <div className="mt-1.5 h-2 w-full overflow-hidden rounded-full bg-border">
                  <div
                    className={`h-full ${s.load > 85 ? "bg-destructive" : s.load > 70 ? "bg-warning" : "bg-primary"}`}
                    style={{ width: `${s.load}%` }}
                  />
                </div>
                <p className="mt-1 text-xs text-muted-foreground">
                  {s.line} · просрочек: {s.overdue}
                </p>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </PortalShell>
  );
}

function Kpi({ label, value, tone }: { label: string; value: string; tone?: "danger" | "warning" | "success" }) {
  const color =
    tone === "danger"
      ? "text-destructive"
      : tone === "warning"
        ? "text-warning"
        : tone === "success"
          ? "text-success"
          : "text-deep";
  return (
    <div className="rounded-md border bg-card p-4 shadow-card">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${color}`}>{value}</p>
    </div>
  );
}
