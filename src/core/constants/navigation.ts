import {
  LayoutDashboard,
  User,
  Database,
  Users,
  FolderKanban,
  Settings,
  HelpCircle,
  LucideIcon
} from "lucide-react";

export interface NavItem {
  icon: LucideIcon;
  label: string;
  id: string;
  path: string;
}

export const NAV_ITEMS: NavItem[] = [
  { icon: LayoutDashboard, label: "Главная", id: "home", path: "/" },
  { icon: User, label: "Личный кабинет", id: "profile", path: "/profile" },
  { icon: Users, label: "Чаты с командой", id: "team", path: "/team" },
  { icon: Database, label: "Мои данные", id: "data", path: "/data" },
  { icon: FolderKanban, label: "Управление командой", id: "projects", path: "/projects" },
  { icon: Settings, label: "Настройки", id: "settings", path: "/settings" },
  { icon: HelpCircle, label: "Центр помощи", id: "help", path: "/help" },
];
