import { createFileRoute, Link } from "@tanstack/react-router";
import { PortalShell, PrimaryButton } from "@/components/portal-shell";
import { SlaBar, SlaPill, StatusBadge } from "@/components/ticket-bits";
import { MY_TICKET_IDS, TICKETS } from "@/lib/demo-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Мои заявки — ITHelp, service desk АФТ" },
      {
        name: "description",
        content:
          "Портал ITHelp: единая точка входа для обращений в ИТ-службу АФТ. Статусы заявок, SLA-таймеры и переписка со специалистом.",
      },
      { property: "og:title", content: "Мои заявки — ITHelp, service desk АФТ" },
      {
        property: "og:description",
        content: "Все обращения в ИТ-службу в одном портале: номер, статус, срок решения по SLA.",
      },
    ],
  }),
  component: MyTickets,
});

function MyTickets() {
  const mine = MY_TICKET_IDS.map((id) => TICKETS.find((t) => t.id === id)!);
  const open = mine.filter((t) => t.status !== "closed");

  return (
    <PortalShell
      title="Мои заявки"
      subtitle="Обращения, которые вы зарегистрировали на портале или отправили на адрес поддержки."
      actions={<PrimaryButton to="/new">Создать заявку</PrimaryButton>}
    >
      <div className="mb-6 grid gap-3 sm:grid-cols-3">
        <Stat label="В работе" value={String(open.length)} />
        <Stat label="Ожидают вашего подтверждения" value="1" tone="warning" />
        <Stat label="Закрыто за месяц" value="5" />
      </div>

      {/* Таблица на широком экране */}
      <div className="hidden overflow-hidden rounded-md border bg-card shadow-card md:block">
        <table className="w-full text-sm">
          <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="px-4 py-3 font-bold">Номер</th>
              <th className="px-4 py-3 font-bold">Тема</th>
              <th className="px-4 py-3 font-bold">Статус</th>
              <th className="px-4 py-3 font-bold">Срок решения</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {mine.map((t) => (
              <tr key={t.id} className="border-t hover:bg-accent/40">
                <td className="px-4 py-3 font-bold tabular-nums text-primary">{t.id}</td>
                <td className="px-4 py-3">
                  <p className="font-medium">{t.subject}</p>
                  <p className="text-xs text-muted-foreground">
                    {t.type} · {t.channel} · {t.created}
                  </p>
                </td>
                <td className="px-4 py-3">
                  <StatusBadge status={t.status} />
                </td>
                <td className="w-48 px-4 py-3">
                  <SlaPill state={t.slaState} left={t.slaLeft} />
                  <div className="mt-2">
                    <SlaBar state={t.slaState} percent={t.slaPercent} />
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <Link
                    to="/tickets/$id"
                    params={{ id: t.id }}
                    className="text-sm font-bold text-primary underline-offset-2 hover:underline"
                  >
                    Открыть
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Карточки на мобильном */}
      <div className="grid gap-3 md:hidden">
        {mine.map((t) => (
          <Link
            key={t.id}
            to="/tickets/$id"
            params={{ id: t.id }}
            className="block rounded-md border bg-card p-4 shadow-card"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm font-bold tabular-nums text-primary">{t.id}</span>
              <StatusBadge status={t.status} />
            </div>
            <p className="mt-2 font-medium">{t.subject}</p>
            <p className="text-xs text-muted-foreground">
              {t.type} · {t.created}
            </p>
            <div className="mt-3 flex items-center justify-between gap-3">
              <SlaPill state={t.slaState} left={t.slaLeft} />
            </div>
            <div className="mt-2">
              <SlaBar state={t.slaState} percent={t.slaPercent} />
            </div>
          </Link>
        ))}
      </div>
    </PortalShell>
  );
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "warning" }) {
  return (
    <div className="rounded-md border bg-card p-4 shadow-card">
      <p className="text-xs uppercase tracking-wider text-muted-foreground">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${tone === "warning" ? "text-warning" : "text-deep"}`}>{value}</p>
    </div>
  );
}
