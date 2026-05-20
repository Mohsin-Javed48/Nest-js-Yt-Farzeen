import { http } from "./http";
import type { Mark } from "../lib/types";

export const marksService = {
  getMarks: async (studentId: string): Promise<Mark[]> => {
    return http.get<Mark[]>(`/marks/${studentId}`);
  },

  createMark: async (data: Partial<Mark>): Promise<Mark> => {
    return http.post<Mark>("/marks", data);
  },

  updateMark: async (id: string, data: Partial<Mark>): Promise<Mark> => {
    return http.put<Mark>(`/marks/${id}`, data);
  },
};
