/** Демо-данные прототипа ITHelp. Никакой серверной логики — только контент для экранов. */

export type Status = "new" | "classified" | "diagnostics" | "resolved" | "closed";
export type Priority = "low" | "normal" | "high" | "critical";
export type SlaState = "ok" | "warning" | "breached";

export const STATUS_LABEL: Record<Status, string> = {
  new: "Новая",
  classified: "Классифицирована",
  diagnostics: "В работе",
  resolved: "Решена",
  closed: "Закрыта",
};

export const STAGES: { key: Status; label: string }[] = [
  { key: "new", label: "Регистрация" },
  { key: "classified", label: "Классификация" },
  { key: "diagnostics", label: "Диагностика" },
  { key: "resolved", label: "Решение" },
  { key: "closed", label: "Закрытие" },
];

export const PRIORITY_LABEL: Record<Priority, string> = {
  low: "Низкая",
  normal: "Обычная",
  high: "Высокая",
  critical: "Критичная",
};

export type Event = {
  author: string;
  role: "Заявитель" | "Специалист" | "Система";
  time: string;
  text: string;
  channel?: "portal" | "email";
};

export type Ticket = {
  id: string;
  subject: string;
  description: string;
  type: "Инцидент" | "Запрос на обслуживание";
  status: Status;
  priority: Priority;
  category: string;
  requester: string;
  requesterUnit: string;
  assignee: string | null;
  line: "1-я линия" | "2-я линия";
  created: string;
  channel: "Портал" | "E-mail";
  slaState: SlaState;
  slaLeft: string;
  slaPercent: number;
  reactionDone: boolean;
  attachments?: string[];
  events: Event[];
};

export const TICKETS: Ticket[] = [
  {
    id: "INC-10482",
    subject: "Не печатает принтер на 3 этаже",
    description:
      "Принтер HP в кабинете 312 принимает задание, но ничего не печатает. Горит оранжевый индикатор. Приложил фото панели.",
    type: "Инцидент",
    status: "diagnostics",
    priority: "normal",
    category: "Печать → Принтер",
    requester: "Мария Соколова",
    requesterUnit: "Отдел закупок",
    assignee: "Дмитрий Орлов",
    line: "1-я линия",
    created: "Сегодня, 09:42",
    channel: "Портал",
    slaState: "ok",
    slaLeft: "3 ч 20 м",
    slaPercent: 38,
    reactionDone: true,
    attachments: ["printer-panel.jpg"],
    events: [
      {
        author: "Мария Соколова",
        role: "Заявитель",
        time: "09:42",
        text: "Принтер в 312 не печатает с утра, задания копятся в очереди.",
        channel: "portal",
      },
      { author: "Система", role: "Система", time: "09:42", text: "Заявка зарегистрирована, SLA реакции — 1 ч." },
      {
        author: "Дмитрий Орлов",
        role: "Специалист",
        time: "10:05",
        text: "Взял в работу. Попробуйте перезагрузить принтер кнопкой питания, параллельно проверяю драйвер на сервере печати.",
      },
      {
        author: "Мария Соколова",
        role: "Заявитель",
        time: "10:21",
        text: "Перезагрузила — индикатор всё так же оранжевый.",
        channel: "portal",
      },
    ],
  },
  {
    id: "INC-10479",
    subject: "Не открывается 1С после обновления",
    description: "При запуске 1С появляется ошибка соединения с сервером. Работа бухгалтерии остановлена.",
    type: "Инцидент",
    status: "classified",
    priority: "critical",
    category: "Бизнес-приложения → 1С",
    requester: "Артём Гущин",
    requesterUnit: "Бухгалтерия",
    assignee: "Елена Крайнова",
    line: "2-я линия",
    created: "Сегодня, 08:58",
    channel: "E-mail",
    slaState: "breached",
    slaLeft: "нарушен на 47 м",
    slaPercent: 100,
    reactionDone: true,
    events: [
      {
        author: "Артём Гущин",
        role: "Заявитель",
        time: "08:58",
        text: "Письмо с корпоративной почты: 1С не запускается, ошибка соединения.",
        channel: "email",
      },
      { author: "Система", role: "Система", time: "08:58", text: "Заявка создана из письма, заявитель определён по адресу." },
      { author: "Система", role: "Система", time: "10:58", text: "Нарушен срок решения по SLA. Уведомлены заявитель и руководитель." },
    ],
  },
  {
    id: "REQ-10475",
    subject: "Доступ к сетевой папке «Договоры»",
    description: "Нужен доступ на чтение к папке отдела продаж для подготовки отчёта.",
    type: "Запрос на обслуживание",
    status: "new",
    priority: "low",
    category: "Не классифицирована",
    requester: "Ольга Жданова",
    requesterUnit: "Отдел продаж",
    assignee: null,
    line: "1-я линия",
    created: "Сегодня, 11:10",
    channel: "Портал",
    slaState: "warning",
    slaLeft: "48 м",
    slaPercent: 78,
    reactionDone: false,
    events: [
      {
        author: "Ольга Жданова",
        role: "Заявитель",
        time: "11:10",
        text: "Прошу доступ на чтение к папке «Договоры».",
        channel: "portal",
      },
      { author: "Система", role: "Система", time: "11:10", text: "Заявка зарегистрирована и помещена в общую очередь." },
    ],
  },
  {
    id: "INC-10468",
    subject: "Ноутбук не подключается к Wi-Fi в переговорной",
    description: "В переговорной на 5 этаже сеть видна, но подключение обрывается.",
    type: "Инцидент",
    status: "resolved",
    priority: "normal",
    category: "Сеть → Wi-Fi",
    requester: "Павел Ким",
    requesterUnit: "Маркетинг",
    assignee: "Дмитрий Орлов",
    line: "1-я линия",
    created: "Вчера, 16:20",
    channel: "Портал",
    slaState: "ok",
    slaLeft: "решена за 2 ч 05 м",
    slaPercent: 52,
    reactionDone: true,
    events: [
      { author: "Павел Ким", role: "Заявитель", time: "16:20", text: "Wi-Fi обрывается каждые пару минут." },
      { author: "Дмитрий Орлов", role: "Специалист", time: "16:35", text: "Перезагрузил точку доступа, обновил прошивку." },
      { author: "Дмитрий Орлов", role: "Специалист", time: "18:25", text: "Проверьте, пожалуйста, — со своей стороны вижу стабильный сигнал." },
      { author: "Система", role: "Система", time: "18:25", text: "Статус изменён на «Решена». Ожидается подтверждение заявителя." },
    ],
  },
  {
    id: "REQ-10455",
    subject: "Установить Photoshop на рабочую станцию",
    description: "Требуется лицензия и установка для дизайнера.",
    type: "Запрос на обслуживание",
    status: "closed",
    priority: "low",
    category: "ПО → Установка",
    requester: "Мария Соколова",
    requesterUnit: "Отдел закупок",
    assignee: "Елена Крайнова",
    line: "2-я линия",
    created: "24 сентября, 10:00",
    channel: "Портал",
    slaState: "ok",
    slaLeft: "закрыта в срок",
    slaPercent: 40,
    reactionDone: true,
    events: [
      { author: "Мария Соколова", role: "Заявитель", time: "10:00", text: "Прошу установить Photoshop." },
      { author: "Елена Крайнова", role: "Специалист", time: "12:30", text: "Лицензия выделена, ПО установлено." },
      { author: "Система", role: "Система", time: "25.09 09:00", text: "Заявка закрыта по подтверждению заявителя." },
    ],
  },
  {
    id: "INC-10440",
    subject: "Монитор мерцает при включении",
    description: "Второй монитор на рабочем месте периодически мерцает.",
    type: "Инцидент",
    status: "diagnostics",
    priority: "high",
    category: "Оборудование → Монитор",
    requester: "Игорь Латышев",
    requesterUnit: "Логистика",
    assignee: "Дмитрий Орлов",
    line: "1-я линия",
    created: "Сегодня, 10:12",
    channel: "E-mail",
    slaState: "warning",
    slaLeft: "1 ч 05 м",
    slaPercent: 72,
    reactionDone: true,
    events: [
      { author: "Игорь Латышев", role: "Заявитель", time: "10:12", text: "Письмо: монитор мерцает, работать тяжело.", channel: "email" },
      { author: "Дмитрий Орлов", role: "Специалист", time: "10:30", text: "Подготовил подменный монитор, зайду после обеда." },
    ],
  },
];

export const MY_TICKET_IDS = ["INC-10482", "REQ-10475", "INC-10468", "REQ-10455"];

export const SPECIALISTS = [
  { name: "Дмитрий Орлов", line: "1-я линия", active: 7, overdue: 1, load: 78 },
  { name: "Елена Крайнова", line: "2-я линия", active: 5, overdue: 2, load: 92 },
  { name: "Сергей Бабин", line: "1-я линия", active: 3, overdue: 0, load: 41 },
  { name: "Ника Тарасова", line: "2-я линия", active: 4, overdue: 0, load: 55 },
];

export const CATEGORIES = [
  { name: "Печать", sub: ["Принтер", "МФУ", "Расходники"], reaction: "1 ч", resolve: "8 ч" },
  { name: "Сеть", sub: ["Wi-Fi", "Кабельная сеть", "VPN"], reaction: "30 м", resolve: "4 ч" },
  { name: "Бизнес-приложения", sub: ["1С", "CRM", "Почта"], reaction: "30 м", resolve: "2 ч" },
  { name: "Оборудование", sub: ["Монитор", "Ноутбук", "Периферия"], reaction: "1 ч", resolve: "1 р. д." },
  { name: "Доступы", sub: ["Сетевые папки", "Учётные записи"], reaction: "2 ч", resolve: "1 р. д." },
];

export const ROUTING_RULES = [
  { when: "Категория «Бизнес-приложения» + критичная", then: "2-я линия → Елена Крайнова" },
  { when: "Канал E-mail без категории", then: "Общая очередь 1-й линии" },
  { when: "Категория «Печать»", then: "1-я линия → Дмитрий Орлов" },
  { when: "Нарушен SLA решения", then: "Эскалация руководителю ИТ-службы" },
];

export function getTicket(id: string) {
  return TICKETS.find((t) => t.id === id);
}
