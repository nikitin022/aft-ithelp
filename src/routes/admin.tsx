import { createFileRoute } from "@tanstack/react-router";
import { PortalShell, GhostButton } from "@/components/portal-shell";
import { CATEGORIES, ROUTING_RULES } from "@/lib/demo-data";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Настройки классификаторов и SLA — ITHelp" },
      {
        name: "description",
        content:
          "Администратор ITHelp настраивает типы обращений, категории, правила маршрутизации и нормативы времени SLA/OLA.",
      },
      { property: "og:title", content: "Настройки классификаторов и SLA — ITHelp" },
      { property: "og:description", content: "Классификаторы, маршрутизация и нормативы SLA в одном разделе." },
    ],
  }),
  component: Admin,
});

function Admin() {
  return (
    <PortalShell
      title="Настройки"
      subtitle="Классификаторы обращений, правила маршрутизации и нормативы SLA/OLA."
      actions={<GhostButton>Сохранить изменения</GhostButton>}
    >
      <div className="grid gap-5 lg:grid-cols-2">
        <section className="rounded-md border bg-card shadow-card">
          <h2 className="border-b px-5 py-4 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            Категории и нормативы SLA
          </h2>
          <table className="w-full text-sm">
            <thead className="bg-surface text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-5 py-2.5 font-bold">Категория</th>
                <th className="px-5 py-2.5 font-bold">Реакция</th>
                <th className="px-5 py-2.5 font-bold">Решение</th>
              </tr>
            </thead>
            <tbody>
              {CATEGORIES.map((c) => (
                <tr key={c.name} className="border-t">
                  <td className="px-5 py-3">
                    <p className="font-bold">{c.name}</p>
                    <p className="text-xs text-muted-foreground">{c.sub.join(" · ")}</p>
                  </td>
                  <td className="px-5 py-3 font-bold tabular-nums">{c.reaction}</td>
                  <td className="px-5 py-3 font-bold tabular-nums">{c.resolve}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="border-t px-5 py-4">
            <GhostButton>Добавить категорию</GhostButton>
          </div>
        </section>

        <div className="space-y-5">
          <section className="rounded-md border bg-card p-5 shadow-card">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">
              Правила маршрутизации
            </h2>
            <ul className="mt-3 space-y-3">
              {ROUTING_RULES.map((r) => (
                <li key={r.when} className="rounded-sm border bg-surface p-3 text-sm">
                  <p className="text-xs uppercase tracking-wider text-muted-foreground">Если</p>
                  <p className="font-bold">{r.when}</p>
                  <p className="mt-2 text-xs uppercase tracking-wider text-muted-foreground">То</p>
                  <p className="font-bold text-primary">{r.then}</p>
                </li>
              ))}
            </ul>
          </section>

          <section className="rounded-md border bg-card p-5 shadow-card">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Уведомления</h2>
            <ul className="mt-3 space-y-3 text-sm">
              {[
                ["Регистрация заявки", "Заявителю — номер и ссылка на портал"],
                ["80% срока SLA", "Специалисту и руководителю"],
                ["Нарушение SLA", "Заявителю, специалисту, руководителю"],
                ["Смена статуса", "Заявителю в портале и на e-mail"],
              ].map(([k, v]) => (
                <li key={k} className="flex items-start justify-between gap-3 border-b pb-3 last:border-0 last:pb-0">
                  <span>
                    <span className="block font-bold">{k}</span>
                    <span className="text-xs text-muted-foreground">{v}</span>
                  </span>
                  <span className="mt-1 h-5 w-9 shrink-0 rounded-full bg-primary p-0.5">
                    <span className="block h-4 w-4 translate-x-4 rounded-full bg-white" />
                  </span>
                </li>
              ))}
            </ul>
          </section>
        </div>
      </div>
    </PortalShell>
  );
}
