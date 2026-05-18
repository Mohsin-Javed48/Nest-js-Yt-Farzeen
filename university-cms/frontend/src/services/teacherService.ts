import { http } from './http';

export interface StudentListItem {
  id: string;
  name: string;
  email: string;
  roll: string;
  enrolledCourses?: string[];
}

export interface StudentMarksUpdate {
  subject: string;
  marks: number;
}

export interface BulkMarksUpdate {
  studentId: string;
  marks: StudentMarksUpdate[];
}

/**
 * Teacher Service
 * Handles teacher-related API calls for managing students and marks
 */
export const teacherService = {
  /**
   * Get all students (for teacher's classes)
   */
  getAllStudents: async (): Promise<StudentListItem[]> => {
    return http.get<StudentListItem[]>('/teachers/students');
  },

  /**
   * Get specific student details
   */
  getStudent: async (studentId: string): Promise<StudentListItem> => {
    return http.get<StudentListItem>(`/teachers/students/${studentId}`);
  },

  /**
   * Get student marks for editing
   */
  getStudentMarksForEditing: async (studentId: string): Promise<any> => {
    return http.get(`/teachers/students/${studentId}/marks`);
  },

  /**
   * Update marks for a single student
   */
  updateStudentMarks: async (studentId: string, marks: StudentMarksUpdate[]): Promise<any> => {
    return http.put(`/teachers/students/${studentId}/marks`, { marks });
  },

  /**
   * Bulk update marks for multiple students
   */
  bulkUpdateMarks: async (updates: BulkMarksUpdate[]): Promise<any> => {
    return http.post('/teachers/marks/bulk-update', { updates });
  },

  /**
   * Get class/section students
   */
  getClassStudents: async (classId: string): Promise<StudentListItem[]> => {
    return http.get<StudentListItem[]>(`/teachers/classes/${classId}/students`);
  },

  /**
   * Get marks statistics
   */
  getMarksStatistics: async (studentId: string): Promise<any> => {
    return http.get(`/teachers/students/${studentId}/statistics`);
  },

  /**
   * Get attendance records for a student
   */
  getStudentAttendance: async (studentId: string): Promise<any> => {
    return http.get(`/teachers/students/${studentId}/attendance`);
  },

  /**
   * Generate report card
   */
  generateReportCard: async (studentId: string): Promise<Blob> => {
    return http.get<Blob>(`/teachers/students/${studentId}/report-card`, { responseType: 'blob' });
  },

  /**
   * Export student marks as CSV
   */
  exportMarksCSV: async (): Promise<Blob> => {
    return http.get<Blob>('/teachers/marks/export', { responseType: 'blob' });
  },

  /**
   * Get teacher profile
   */
  getProfile: async (): Promise<any> => {
    return http.get('/teachers/profile');
  },
};
