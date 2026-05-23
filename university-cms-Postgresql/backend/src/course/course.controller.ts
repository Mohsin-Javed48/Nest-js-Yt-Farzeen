import { Body, Controller, Get, Post, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './course.entity';
@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async createCourse(@Body() courseData: Partial<Course>): Promise<Course> {
    return this.courseService.createCourse(courseData);
  }



  @Get()
  async getCourses(): Promise<Course[]> {
    return this.courseService.getCourses();
  }

  @Post(':courseId/enroll/:studentId')
  async enrollStudent(
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string,
  ): Promise<any> {
    return this.courseService.enrollStudent(courseId, studentId);
  }
}
