import { mockTeamMembers, mockTasks, mockKanbanData, mockCalendarEvents } from "../mock-data/team.data";
import { TeamMember } from "@/core/types/user";
import { Task, KanbanColumn, CalendarEvent } from "@/core/types/collaboration";

export const teamService = {
  getTeamMembers: async (): Promise<TeamMember[]> => {
    return mockTeamMembers;
  },

  getTasks: async (): Promise<Task[]> => {
    return mockTasks;
  },

  getKanbanData: async (): Promise<KanbanColumn[]> => {
    return mockKanbanData;
  },

  getCalendarEvents: async (): Promise<CalendarEvent[]> => {
    return mockCalendarEvents;
  }
};
