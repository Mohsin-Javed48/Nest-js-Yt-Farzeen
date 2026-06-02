import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  getStudents() {
    return this.studentService.getStudents();
  }

  @Get(':id')
  getStudentById(@Param('id', ParseIntPipe) id: number) {
    return this.studentService.getStudentById(id);
  }

  @Post()
  createStudent(@Body() student: CreateStudentDto) {
    return this.studentService.createStudent(student);
  }

  @Post(':courseId/enroll/:studentId')
  enrollCourse(
    @Param('courseId') courseId: string,
    @Param('studentId') studentId: string,
  ) {
    return this.studentService.enrollCourse(courseId, studentId);
  }
}
