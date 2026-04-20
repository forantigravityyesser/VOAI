import { User } from "./user";

export type TaskPriority = "low" | "medium" | "high" | "urgent";
export type TaskStatus = "todo" | "in-progress" | "review" | "done";

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: TaskPriority;
  status: TaskStatus;
  assignee: User;
  dueDate: string;
  tags: string[];
}

export interface KanbanColumn {
  id: TaskStatus;
  title: string;
  tasks: Task[];
}

export interface CalendarEvent {
  id: string;
  title: string;
  start: string;
  end: string;
  type: "meeting" | "deadline" | "holiday" | "other";
  userIds: string[];
}
