import { mockMessages, mockChatSessions } from "../mock-data/chat.data";
import { Message, ChatSession } from "@/core/types/chat";

export const chatService = {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getMessages: async (sessionId?: string): Promise<Message[]> => {
    return mockMessages;
  },

  getSessions: async (): Promise<ChatSession[]> => {
    return mockChatSessions;
  },

  sendMessage: async (content: string): Promise<Message> => {
    // Simulate API call
    return {
      id: Math.random().toString(36).substr(2, 9),
      sender: "assistant", // or current user
      content,
      timestamp: new Date().toISOString()
    };
  }
};
