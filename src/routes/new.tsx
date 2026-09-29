import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { PortalShell, GhostButton } from "@/components/portal-shell";
import { CATEGORIES } from "@/lib/demo-data";

export const Route = createFileRoute("/new")({
  head: () => ({
    meta: [
      { title: "Создать заявку — ITHelp" },
      {
        name: "description",
        content: "Форма обращения в ИТ-службу АФТ: тип, тема, описание, критичность и вложение — в один экран.",
      },
      { property: "og:title", content: "Создать заявку — ITHelp" },
      { property: "og:description", content: "Единая форма регистрации обращения в ИТ-службу с автоопределением заявителя." },
    ],
  }),
  component: NewTicket,
});

const field =
  "mt-1.5 w-full rounded-sm border border-input bg-card px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20";

function NewTicket() {
  const [sent, setSent] = useState(false);
  const [type, setType] = useState("Инцидент");
  const [priority, setPriority] = useState("Обычная");

  if (sent) {
    return (
      <PortalShell title="Заявка зарегистрирована" subtitle="Копия подтверждения отправлена на вашу рабочую почту.">
        <div className="mx-auto max-w-xl rounded-md border bg-card p-8 text-center shadow-card">
          <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-success/15 text-xl font-bold text-success">
            ✓
          </div>
          <p className="mt-4 text-sm text-muted-foreground">Номер вашего обращения</p>
          <p className="text-3xl font-bold tabular-nums text-primary">INC-10486</p>
          <p className="mt-3 text-sm text-muted-foreground">
            Срок реакции — 1 ч, срок решения — 8 ч. Специалист напишет в карточке заявки.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            <Link
              to="/tickets/$id"
              params={{ id: "INC-10482" }}
              className="inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground hover:bg-deep"
            >
              Открыть карточку
            </Link>
            <GhostButton to="/">Мои заявки</GhostButton>
          </div>
        </div>
      </PortalShell>
    );
  }

  return (
    <PortalShell
      title="Создать заявку"
      subtitle="Заявитель определён автоматически по входу SSO: Мария Соколова, отдел закупок."
    >
      <form
        className="mx-auto max-w-2xl rounded-md border bg-card p-5 shadow-card sm:p-6"
        onSubmit={(e) => {
          e.preventDefault();
          setSent(true);
        }}
      >
        <fieldset className="border-0 p-0">
          <legend className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
            Тип обращения
          </legend>
          <div className="mt-2 grid gap-2 sm:grid-cols-2">
            {["Инцидент", "Запрос на обслуживание"].map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setType(t)}
                className={`rounded-sm border px-3 py-3 text-left text-sm font-bold transition-colors ${
                  type === t ? "border-primary bg-accent text-primary" : "border-border hover:bg-surface"
                }`}
              >
                {t}
                <span className="mt-0.5 block text-xs font-normal text-muted-foreground">
                  {t === "Инцидент" ? "Что-то не работает" : "Нужен доступ, ПО или оборудование"}
                </span>
              </button>
            ))}
          </div>
        </fieldset>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-bold sm:col-span-2">
            Тема
            <input className={field} placeholder="Например: не печатает принтер на 3 этаже" required />
          </label>
          <label className="block text-sm font-bold">
            Категория
            <select className={field} defaultValue="">
              <option value="">Определит специалист</option>
              {CATEGORIES.map((c) => (
                <option key={c.name}>{c.name}</option>
              ))}
            </select>
          </label>
          <label className="block text-sm font-bold">
            Кабинет / расположение
            <input className={field} placeholder="312, 3 этаж" />
          </label>
          <label className="block text-sm font-bold sm:col-span-2">
            Описание
            <textarea className={`${field} min-h-28`} placeholder="Что происходит, когда началось, что уже пробовали" />
          </label>
        </div>

        <div className="mt-5">
          <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Критичность</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Низкая", "Обычная", "Высокая", "Критичная"].map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => setPriority(p)}
                className={`rounded-sm border px-3 py-2 text-sm font-bold transition-colors ${
                  priority === p
                    ? p === "Критичная"
                      ? "border-destructive bg-destructive/10 text-destructive"
                      : "border-primary bg-accent text-primary"
                    : "border-border hover:bg-surface"
                }`}
              >
                {p}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-5 rounded-sm border border-dashed border-steel bg-surface p-4 text-center text-sm text-muted-foreground">
          Перетащите файл или <span className="font-bold text-primary">выберите вложение</span>
          <p className="mt-1 text-xs">Скриншот или фото помогают решить заявку быстрее</p>
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-3 border-t pt-5">
          <button
            type="submit"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-5 py-2.5 text-sm font-bold text-primary-foreground hover:bg-deep"
          >
            Отправить заявку
          </button>
          <GhostButton to="/">Отмена</GhostButton>
          <p className="text-xs text-muted-foreground">
            Срок реакции и решения рассчитается автоматически по SLA выбранной категории.
          </p>
        </div>
      </form>
    </PortalShell>
  );
}
