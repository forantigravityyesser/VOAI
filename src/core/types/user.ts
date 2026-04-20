export interface User {
  id: string;
  name: string;
  role: string;
  avatarUrl?: string;
  status: "online" | "offline" | "busy";
  lastSeen?: string;
}

export interface TeamMember extends User {
  projects: string[];
  tasksCount: number;
}
