import { TeamMember } from "@/core/types/user";
import { Task, KanbanColumn, CalendarEvent } from "@/core/types/collaboration";

export const mockTeamMembers: TeamMember[] = [
  { id: "u-1", name: "Александр В.", role: "Lead Developer", status: "online", projects: ["WB-AI", "Analytics"], tasksCount: 12, avatarUrl: "https://i.pravatar.cc/150?u=u-1" },
  { id: "u-2", name: "Мария С.", role: "Product Manager", status: "online", projects: ["WB-AI"], tasksCount: 5, avatarUrl: "https://i.pravatar.cc/150?u=u-2" },
  { id: "u-3", name: "Иван К.", role: "Data Scientist", status: "busy", projects: ["Analytics"], tasksCount: 8, avatarUrl: "https://i.pravatar.cc/150?u=u-3" },
  { id: "u-4", name: "Елена П.", role: "UI/UX Designer", status: "offline", lastSeen: "2ч назад", projects: ["WB-AI"], tasksCount: 3, avatarUrl: "https://i.pravatar.cc/150?u=u-4" },
];

export const mockTasks: Task[] = [
  { id: "t-1", title: "Оптимизация SQL запросов", priority: "high", status: "in-progress", assignee: mockTeamMembers[0], dueDate: "2026-04-22", tags: ["Backend", "Perf"] },
  { id: "t-2", title: "Разработка дизайна P&L", priority: "medium", status: "review", assignee: mockTeamMembers[3], dueDate: "2026-04-20", tags: ["Design"] },
  { id: "t-3", title: "Интеграция API Wildberries", priority: "urgent", status: "todo", assignee: mockTeamMembers[0], dueDate: "2026-04-18", tags: ["API"] },
  { id: "t-4", title: "Тестирование рекурсии", priority: "low", status: "done", assignee: mockTeamMembers[2], dueDate: "2026-04-15", tags: ["QA"] },
];

export const mockKanbanData: KanbanColumn[] = [
  { id: "todo", title: "К выполнению", tasks: mockTasks.filter(t => t.status === "todo") },
  { id: "in-progress", title: "В работе", tasks: mockTasks.filter(t => t.status === "in-progress") },
  { id: "review", title: "Проверка", tasks: mockTasks.filter(t => t.status === "review") },
  { id: "done", title: "Готово", tasks: mockTasks.filter(t => t.status === "done") },
];

export const mockCalendarEvents: CalendarEvent[] = [
  { id: "e-1", title: "Урок английского", start: "2026-04-08T09:00:00", end: "2026-04-08T10:15:00", type: "meeting", userIds: ["u-1", "u-2"] },
  { id: "e-2", title: "Собеседование", start: "2026-04-08T10:00:00", end: "2026-04-08T11:00:00", type: "meeting", userIds: ["u-1"] },
  { id: "e-3", title: "Team Sync Call", start: "2026-04-08T13:00:00", end: "2026-04-08T15:00:00", type: "deadline", userIds: ["u-1", "u-2", "u-3", "u-4"] },
];
