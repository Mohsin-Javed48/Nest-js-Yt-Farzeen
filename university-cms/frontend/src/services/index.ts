// Main export file for all services
export { authService } from './authService';
export { studentService } from './studentService';
export { teacherService } from './teacherService';
export { http, apiClient, request } from './http';

// Re-export types
export type { LoginRequest, LoginResponse, RefreshTokenResponse } from './authService';
export type { StudentProfile, StudentMarks, StudentMarksResponse } from './studentService';
export type { StudentListItem, StudentMarksUpdate, BulkMarksUpdate } from './teacherService';
