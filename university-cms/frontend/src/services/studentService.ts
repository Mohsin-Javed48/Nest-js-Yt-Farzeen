import { http } from './http';

export interface StudentProfile {
  id: string;
  name: string;
  email: string;
  roll: string;
  enrolledCourses?: string[];
}

export interface StudentMarks {
  id: string;
  subject: string;
  marks: number;
  maxMarks?: number;
}

export interface StudentMarksResponse {
  studentId: string;
  marks: StudentMarks[];
}

/**
 * Student Service
 * Handles student-related API calls
 */
export const studentService = {
  /**
   * Get current student's profile
   */
  getProfile: async (): Promise<StudentProfile> => {
    return http.get<StudentProfile>('/students/profile');
  },

  /**
   * Get current student's marks/results
   */
  getMarks: async (): Promise<StudentMarksResponse> => {
    return http.get<StudentMarksResponse>('/students/marks');
  },

  /**
   * Get specific student marks by student ID (admin/teacher only)
   */
  getStudentMarks: async (studentId: string): Promise<StudentMarksResponse> => {
    return http.get<StudentMarksResponse>(`/students/${studentId}/marks`);
  },

  /**
   * Get student enrollment/courses
   */
  getEnrolledCourses: async (): Promise<any[]> => {
    return http.get<any[]>('/students/courses');
  },

  /**
   * Update student profile
   */
  updateProfile: async (data: Partial<StudentProfile>): Promise<StudentProfile> => {
    return http.put<StudentProfile>('/students/profile', data);
  },

  /**
   * Get attendance records
   */
  getAttendance: async (): Promise<any[]> => {
    return http.get<any[]>('/students/attendance');
  },

  /**
   * Download transcript/report
   */
  downloadTranscript: async (): Promise<Blob> => {
    return http.get<Blob>('/students/transcript', { responseType: 'blob' });
  },
};
