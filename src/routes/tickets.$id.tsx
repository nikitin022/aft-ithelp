import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, GhostButton } from "@/components/portal-shell";
import { SlaTimer, StatusBadge, Stepper } from "@/components/ticket-bits";
import { CATEGORIES, PRIORITY_LABEL, SPECIALISTS, getTicket } from "@/lib/demo-data";

export const Route = createFileRoute("/tickets/$id")({
  head: () => ({
    meta: [
      { title: "Карточка заявки — ITHelp" },
      {
        name: "description",
        content:
          "Карточка обращения ITHelp: этапы ITIL, SLA-таймер, лента переписки и действия специалиста поддержки.",
      },
      { property: "og:title", content: "Карточка заявки — ITHelp" },
      {
        property: "og:description",
        content: "Жизненный цикл заявки: регистрация, классификация, диагностика, решение, закрытие.",
      },
    ],
  }),
  loader: ({ params }) => {
    const ticket = getTicket(params.id);
    if (!ticket) throw notFound();
    return { ticket };
  },
  component: TicketCard,
  notFoundComponent: TicketNotFound,
});

function TicketNotFound() {
  return (
    <PortalShell title="Заявка не найдена" subtitle="Проверьте номер обращения.">
      <GhostButton to="/queue">Вернуться в очередь</GhostButton>
    </PortalShell>
  );
}

function TicketCard() {
  const { ticket } = Route.useLoaderData();
  const [view, setView] = useState<"agent" | "requester">("agent");
  const isAgent = view === "agent";

  return (
    <PortalShell
      title={ticket.subject}
      subtitle={`${ticket.id} · ${ticket.type} · зарегистрирована ${ticket.created} (${ticket.channel})`}
      actions={
        <div className="flex rounded-sm border bg-card p-1">
          {(
            [
              ["agent", "Вид специалиста"],
              ["requester", "Вид заявителя"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`rounded-sm px-3 py-2 text-xs font-bold transition-colors ${
                view === key ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      }
    >
      {/* (а) Шапка карточки */}
      <div className="rounded-md border bg-card shadow-card">
        <div className="relative overflow-hidden rounded-t-md bg-deep aft-pattern px-5 py-4">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-wider text-white/50">Обращение</p>
              <p className="text-2xl font-bold tabular-nums text-white">{ticket.id}</p>
              <p className="mt-1 text-sm text-white/70">
                {ticket.requester} · {ticket.requesterUnit}
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <StatusBadge status={ticket.status} />
              <SlaTimer state={ticket.slaState} left={ticket.slaLeft} percent={ticket.slaPercent} />
            </div>
          </div>
        </div>
        <div className="border-t px-5 py-4">
          <Stepper status={ticket.status} />
        </div>
      </div>

      {ticket.slaState === "breached" && (
        <div className="mt-4 rounded-md border border-destructive/40 bg-destructive/8 px-4 py-3 text-sm font-bold text-destructive">
          Нарушен срок решения по SLA. Уведомления отправлены заявителю и руководителю ИТ-службы.
        </div>
      )}

      <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_320px]">
        {/* (б) Лента событий и комментариев */}
        <section className="rounded-md border bg-card p-5 shadow-card">
          <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Описание</h2>
          <p className="mt-2 text-sm">{ticket.description}</p>
          {ticket.attachments?.length ? (
            <div className="mt-3 flex flex-wrap gap-2">
              {ticket.attachments.map((a) => (
                <span key={a} className="rounded-sm border bg-surface px-2 py-1 text-xs font-bold text-primary">
                  {a}
                </span>
              ))}
            </div>
          ) : null}

          <h2 className="mt-6 text-sm font-bold uppercase tracking-wider text-muted-foreground">Лента заявки</h2>
          <ol className="mt-3 space-y-4">
            {ticket.events.map((e, i) => (
              <li key={i} className="flex gap-3">
                <span
                  className={`mt-1 h-2.5 w-2.5 shrink-0 rounded-full ${
                    e.role === "Система" ? "bg-steel" : e.role === "Специалист" ? "bg-primary" : "bg-warning"
                  }`}
                />
                <div
                  className={`flex-1 rounded-md px-3 py-2.5 text-sm ${
                    e.role === "Система" ? "bg-surface text-muted-foreground" : "border bg-card"
                  }`}
                >
                  <p className="flex flex-wrap items-center gap-2 text-xs">
                    <span className="font-bold text-foreground">{e.author}</span>
                    <span className="text-muted-foreground">{e.role}</span>
                    {e.channel === "email" && (
                      <span className="rounded-sm bg-accent px-1.5 py-0.5 font-bold text-primary">из e-mail</span>
                    )}
                    <span className="text-muted-foreground">{e.time}</span>
                  </p>
                  <p className="mt-1.5">{e.text}</p>
                </div>
              </li>
            ))}
          </ol>

          <div className="mt-5 border-t pt-4">
            <textarea
              className="min-h-24 w-full rounded-sm border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              placeholder={isAgent ? "Ответ заявителю или внутренняя заметка…" : "Напишите специалисту…"}
            />
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-deep">
                Отправить
              </button>
              {isAgent && <GhostButton>Внутренняя заметка</GhostButton>}
              <GhostButton>Прикрепить файл</GhostButton>
            </div>
          </div>
        </section>

        {/* (в) Панель действий */}
        <aside className="space-y-4">
          {isAgent ? (
            <>
              <div className="rounded-md border bg-card p-4 shadow-card">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Действия</h2>
                <div className="mt-3 grid gap-2">
                  <button className="rounded-sm bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-deep">
                    Взять в работу
                  </button>
                  <button className="rounded-sm bg-success px-4 py-3 text-sm font-bold text-success-foreground hover:opacity-90">
                    Решить
                  </button>
                  <GhostButton>Закрыть заявку</GhostButton>
                  <GhostButton danger>Эскалировать на 2-ю линию</GhostButton>
                </div>
              </div>

              <div className="rounded-md border bg-card p-4 shadow-card">
                <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Классификация</h2>
                <div className="mt-3 space-y-3 text-sm">
                  <Select
                    label="Категория"
                    value={ticket.category.split(" → ")[0] ?? "Не выбрана"}
                    options={CATEGORIES.map((c) => c.name)}
                  />
                  <Select
                    label="Подкатегория"
                    value={ticket.category.split(" → ")[1] ?? "Не выбрана"}
                    options={["Принтер", "МФУ", "Расходники", "Не выбрана"]}
                  />
                  <Select
                    label="Приоритет"
                    value={PRIORITY_LABEL[ticket.priority]}
                    options={["Низкая", "Обычная", "Высокая", "Критичная"]}
                  />
                  <Select
                    label="Ответственный"
                    value={ticket.assignee ?? "Не назначен"}
                    options={[...SPECIALISTS.map((s) => s.name), "Не назначен"]}
                  />
                </div>
              </div>
            </>
          ) : (
            <div className="rounded-md border bg-card p-4 shadow-card">
              <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Ваша заявка</h2>
              <dl className="mt-3 space-y-2 text-sm">
                <Row k="Статус" v={ticket.status === "resolved" ? "Решена — подтвердите" : "В работе"} />
                <Row k="Ответственный" v={ticket.assignee ?? "Назначается"} />
                <Row k="Срок решения" v={ticket.slaLeft} />
              </dl>
              <div className="mt-4 grid gap-2">
                <button className="rounded-sm bg-primary px-4 py-3 text-sm font-bold text-primary-foreground hover:bg-deep">
                  Подтвердить решение
                </button>
                <GhostButton>Проблема осталась</GhostButton>
              </div>
              <p className="mt-3 text-xs text-muted-foreground">
                Действия классификации и назначения доступны только специалисту поддержки.
              </p>
            </div>
          )}

          <div className="rounded-md border bg-card p-4 shadow-card">
            <h2 className="text-sm font-bold uppercase tracking-wider text-muted-foreground">Реквизиты</h2>
            <dl className="mt-3 space-y-2 text-sm">
              <Row k="Тип" v={ticket.type} />
              <Row k="Канал" v={ticket.channel} />
              <Row k="Линия" v={ticket.line} />
              <Row k="Реакция" v={ticket.reactionDone ? "Выполнена в срок" : "Ожидается"} />
            </dl>
            <Link to="/queue" className="mt-4 inline-block text-sm font-bold text-primary hover:underline">
              ← К очереди заявок
            </Link>
          </div>
        </aside>
      </div>
    </PortalShell>
  );
}

function Row({ k, v }: { k: string; v: string }) {
  return (
    <div className="flex justify-between gap-3">
      <dt className="text-muted-foreground">{k}</dt>
      <dd className="text-right font-bold">{v}</dd>
    </div>
  );
}

function Select({ label, value, options }: { label: string; value: string; options: string[] }) {
  return (
    <label className="block text-xs font-bold uppercase tracking-wider text-muted-foreground">
      {label}
      <select
        defaultValue={value}
        className="mt-1.5 w-full rounded-sm border border-input bg-card px-3 py-2.5 text-sm font-normal normal-case tracking-normal text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
