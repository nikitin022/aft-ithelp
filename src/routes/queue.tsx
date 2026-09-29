import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell } from "@/components/portal-shell";
import { SlaBar, SlaPill, StatusBadge } from "@/components/ticket-bits";
import { PRIORITY_LABEL, TICKETS } from "@/lib/demo-data";

export const Route = createFileRoute("/queue")({
  head: () => ({
    meta: [
      { title: "Очередь заявок — ITHelp" },
      {
        name: "description",
        content:
          "Входящая очередь специалиста поддержки АФТ: сортировка по сроку SLA, подсветка дедлайнов, классификация обращений.",
      },
      { property: "og:title", content: "Очередь заявок — ITHelp" },
      {
        property: "og:description",
        content: "Рабочая очередь 1-й и 2-й линии с контролем сроков по каждому обращению.",
      },
    ],
  }),
  component: Queue,
});

const FILTERS = ["По сроку SLA", "Все заявки", "Без исполнителя", "Просроченные"] as const;

function Queue() {
  const [filter, setFilter] = useState<(typeof FILTERS)[number]>("По сроку SLA");

  let list = [...TICKETS].filter((t) => t.status !== "closed");
  if (filter === "Без исполнителя") list = list.filter((t) => !t.assignee);
  if (filter === "Просроченные") list = list.filter((t) => t.slaState === "breached");
  if (filter === "По сроку SLA") list.sort((a, b) => b.slaPercent - a.slaPercent);

  return (
    <PortalShell
      title="Очередь заявок"
      subtitle="Дмитрий Орлов, 1-я линия. Сверху — заявки, у которых срок истекает раньше всех."
    >
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-sm border px-3 py-2 text-sm font-bold transition-colors ${
              filter === f ? "border-primary bg-accent text-primary" : "border-border bg-card hover:bg-surface"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="grid gap-3">
        {list.map((t) => (
          <Link
            key={t.id}
            to="/tickets/$id"
            params={{ id: t.id }}
            className={`block rounded-md border bg-card p-4 shadow-card transition-colors hover:bg-accent/30 ${
              t.slaState === "breached"
                ? "border-l-4 border-l-destructive"
                : t.slaState === "warning"
                  ? "border-l-4 border-l-warning"
                  : "border-l-4 border-l-success"
            }`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-bold tabular-nums text-primary">{t.id}</span>
                  <StatusBadge status={t.status} />
                  {t.priority === "critical" && (
                    <span className="rounded-sm bg-destructive px-2 py-1 text-xs font-bold text-destructive-foreground">
                      Критичная
                    </span>
                  )}
                  {!t.assignee && (
                    <span className="rounded-sm border border-steel px-2 py-1 text-xs font-bold text-muted-foreground">
                      Без исполнителя
                    </span>
                  )}
                </div>
                <p className="mt-2 font-bold">{t.subject}</p>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t.requester} · {t.requesterUnit} · {t.category} · {t.channel} · {t.created}
                </p>
              </div>
              <div className="w-full sm:w-48">
                <SlaPill state={t.slaState} left={t.slaLeft} />
                <div className="mt-2">
                  <SlaBar state={t.slaState} percent={t.slaPercent} />
                </div>
                <p className="mt-1.5 text-xs text-muted-foreground">
                  {t.line} · приоритет: {PRIORITY_LABEL[t.priority]}
                </p>
              </div>
            </div>
          </Link>
        ))}
        {list.length === 0 && (
          <div className="rounded-md border bg-deep aft-pattern p-10 text-center">
            <p className="text-lg font-bold text-white">Заявок по этому фильтру нет</p>
            <p className="mt-1 text-sm text-white/60">Очередь пуста — все сроки под контролем.</p>
          </div>
        )}
      </div>
    </PortalShell>
  );
}
