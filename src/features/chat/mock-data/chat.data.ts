import { Message, ChatSession } from "@/core/types/chat";
import { mockTeamMembers } from "../../team/mock-data/team.data";

export const mockMessages: Message[] = [
  { id: "m-1", sender: "assistant", content: "Привет! Я твой AI-ассистент Wildberries. Чем могу помочь?", timestamp: "2026-04-20T10:00:00" },
  { id: "m-2", sender: mockTeamMembers[0], content: "Привет. Анализ P&L готов?", timestamp: "2026-04-20T10:05:00" },
  { id: "m-3", sender: "assistant", content: "Да, отчет по P&L за последнюю неделю сформирован. Вижу рост чистой прибыли на 15%. Хочешь взглянуть на детали?", timestamp: "2026-04-20T10:06:00" },
];

export const mockChatSessions: ChatSession[] = [
  { id: "s-1", title: "Финансовый аудит", participants: [mockTeamMembers[0], mockTeamMembers[1]], unreadCount: 0, lastMessage: mockMessages[2] },
  { id: "s-2", title: "Логистика: Склад Коледино", participants: [mockTeamMembers[0]], unreadCount: 2, lastMessage: { id: "m-x", sender: mockTeamMembers[0], content: "Проверьте лимиты на хранение", timestamp: "2026-04-19T18:00:00" } },
];
