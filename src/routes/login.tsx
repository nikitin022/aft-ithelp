import { createFileRoute, Link } from "@tanstack/react-router";
import { AftLogo } from "@/components/aft-logo";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Вход в портал ITHelp" },
      {
        name: "description",
        content: "Вход в service desk ИТ-службы АФТ по корпоративной учётной записи SSO. Выберите роль для просмотра прототипа.",
      },
      { property: "og:title", content: "Вход в портал ITHelp" },
      { property: "og:description", content: "Единая точка входа в ИТ-поддержку АФТ." },
    ],
  }),
  component: Login,
});

const ROLES = [
  { to: "/", role: "Заявитель", name: "Мария Соколова", unit: "Отдел закупок" },
  { to: "/queue", role: "Специалист поддержки", name: "Дмитрий Орлов", unit: "1-я линия" },
  { to: "/manager", role: "Руководитель ИТ-службы", name: "Елена Крайнова", unit: "Начальник поддержки" },
  { to: "/admin", role: "Администратор", name: "Сергей Бабин", unit: "Технолог системы" },
] as const;

function Login() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="relative flex flex-col justify-between bg-deep aft-pattern px-8 py-10 lg:px-14">
        <AftLogo />
        <div className="max-w-md py-12">
          <h1 className="text-3xl font-bold leading-tight text-white lg:text-4xl">
            Единая точка входа в ИТ-службу
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-white/70">
            Все обращения фиксируются с уникальным номером и статусом. Срок реакции и решения контролируется
            автоматически по SLA — заявитель видит прогресс, руководитель видит нагрузку команды.
          </p>
        </div>
        <p className="text-xs text-white/40">АФТ · внутренний service desk · прототип</p>
      </div>

      <div className="flex items-center justify-center aft-pattern-light px-6 py-12">
        <div className="w-full max-w-sm">
          <div className="mb-2 h-1 w-14 aft-rule" />
          <h2 className="text-2xl font-bold">Вход по корпоративной учётной записи</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            В прототипе выберите роль — экраны откроются от её имени.
          </p>
          <div className="mt-6 grid gap-2">
            {ROLES.map((r) => (
              <Link
                key={r.role}
                to={r.to}
                className="flex items-center justify-between rounded-sm border bg-card px-4 py-3 text-left transition-colors hover:border-primary hover:bg-accent"
              >
                <span>
                  <span className="block text-sm font-bold">{r.role}</span>
                  <span className="block text-xs text-muted-foreground">
                    {r.name} · {r.unit}
                  </span>
                </span>
                <span className="text-primary">→</span>
              </Link>
            ))}
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Обращения с корпоративной почты попадают в портал автоматически — входить для этого не нужно.
          </p>
        </div>
      </div>
    </div>
  );
}
