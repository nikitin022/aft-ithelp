import { Link, useRouterState } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import { AftLogo, AftMark } from "./aft-logo";

type Href = "/" | "/new" | "/queue" | "/manager" | "/admin" | "/login";

type NavItem = { to: Href; label: string; role: string; badge?: string };

const NAV: NavItem[] = [
  { to: "/", label: "Мои заявки", role: "Заявитель" },
  { to: "/new", label: "Создать заявку", role: "Заявитель" },
  { to: "/queue", label: "Очередь заявок", role: "Специалист", badge: "6" },
  { to: "/manager", label: "Контроль SLA", role: "Руководитель", badge: "3" },
  { to: "/admin", label: "Настройки", role: "Администратор" },
];

export function PortalShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const [open, setOpen] = useState(false);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname.startsWith(to) || (to === "/queue" && pathname.startsWith("/tickets"));

  const nav = (
    <nav className="flex flex-col gap-1">
      {NAV.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={() => setOpen(false)}
          className={`group flex items-center justify-between rounded-sm px-3 py-2.5 text-sm transition-colors ${
            isActive(item.to)
              ? "bg-white/12 font-bold text-white"
              : "text-white/65 hover:bg-white/8 hover:text-white"
          }`}
        >
          <span className="flex flex-col">
            <span>{item.label}</span>
            <span className="text-[10px] uppercase tracking-wider text-white/35">{item.role}</span>
          </span>
          {item.badge && (
            <span className="rounded-sm bg-destructive px-1.5 py-0.5 text-[11px] font-bold text-destructive-foreground">
              {item.badge}
            </span>
          )}
        </Link>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen lg:flex">
      {/* Шапка мобильной версии — компактный знак */}
      <header className="flex items-center justify-between bg-deep px-4 py-3 lg:hidden">
        <span className="flex items-center gap-2">
          <AftMark className="h-6 w-6" />
          <span className="text-base font-bold text-white">ITHelp</span>
        </span>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-sm border border-white/20 px-3 py-1.5 text-xs font-bold text-white"
        >
          {open ? "Закрыть" : "Меню"}
        </button>
      </header>
      {open && <div className="bg-deep px-3 pb-4 lg:hidden">{nav}</div>}

      {/* Сайдбар широкой версии — полный логотип */}
      <aside className="hidden w-64 shrink-0 flex-col bg-deep aft-pattern px-3 py-5 lg:flex">
        <div className="px-2 pb-6">
          <AftLogo />
        </div>
        {nav}
        <div className="mt-auto rounded-md bg-white/8 p-3">
          <p className="text-xs font-bold text-white">Мария Соколова</p>
          <p className="mt-0.5 text-[11px] text-white/50">Отдел закупок · вход по SSO</p>
          <Link to="/login" className="mt-2 inline-block text-[11px] font-bold text-white/70 underline">
            Сменить роль
          </Link>
        </div>
      </aside>

      <main className="flex-1 overflow-x-hidden">
        <div className="border-b bg-card px-4 py-5 sm:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <div className="mb-2.5 h-1.5 w-24 aft-rule" />
              <h1 className="text-2xl font-bold sm:text-3xl">{title}</h1>
              {subtitle && <p className="mt-1 max-w-2xl text-sm text-muted-foreground">{subtitle}</p>}
            </div>
            {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
          </div>
        </div>
        <div className="px-4 py-6 sm:px-8">{children}</div>
      </main>
    </div>
  );
}

export function PrimaryButton({
  children,
  to,
  onClick,
}: {
  children: ReactNode;
  to?: Href;
  onClick?: () => void;
}) {
  const cls =
    "inline-flex items-center justify-center rounded-sm bg-primary px-4 py-2.5 text-sm font-bold text-primary-foreground transition-colors hover:bg-deep";
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}

export function GhostButton({
  children,
  to,
  onClick,
  danger,
}: {
  children: ReactNode;
  to?: Href;
  onClick?: () => void;
  danger?: boolean;
}) {
  const cls = `inline-flex items-center justify-center rounded-sm border px-4 py-2.5 text-sm font-bold transition-colors ${
    danger
      ? "border-destructive/40 text-destructive hover:bg-destructive/8"
      : "border-border bg-card text-foreground hover:bg-accent"
  }`;
  if (to) return <Link to={to} className={cls}>{children}</Link>;
  return <button onClick={onClick} className={cls}>{children}</button>;
}
