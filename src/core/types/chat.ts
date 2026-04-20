import { User } from "./user";

export interface Message {
  id: string;
  sender: User | "assistant";
  content: string;
  timestamp: string;
  isRead?: boolean;
}

export interface ChatSession {
  id: string;
  title: string;
  participants: User[];
  lastMessage?: Message;
  unreadCount: number;
}
