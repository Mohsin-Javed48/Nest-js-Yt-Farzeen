import { Body, Controller, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { Course } from './Schemas/course.schema';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  async createCourse(@Body() courseData: Partial<Course>): Promise<Course> {
    return this.courseService.createCourse(courseData);
  }
}
