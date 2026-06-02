import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { Course } from '../course/course.entity';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Course)
    private readonly courseRepository: Repository<Course>,
  ) {}

  async getStudents(): Promise<Student[]> {
    return this.studentRepository.find({ relations: ['courses'] });
  }

  async getStudentById(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { studentId: id },
      relations: ['courses'],
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async createStudent(student: CreateStudentDto): Promise<Student> {
    const { courses, isActive, ...studentData } = student;
    const newStudent = this.studentRepository.create(studentData);
    return this.studentRepository.save(newStudent);
  }

  async enrollCourse(courseId: string, studentId: string): Promise<Student> {
    const student = await this.studentRepository.findOne({
      where: { studentId: Number(studentId) },
      relations: ['courses'],
    });

    if (!student) {
      throw new NotFoundException(`Student with ID ${studentId} not found`);
    }

    const course = await this.courseRepository.findOneBy({
      id: Number(courseId),
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${courseId} not found`);
    }

    student.courses = Array.from(new Set([...(student.courses ?? []), course]));
    return this.studentRepository.save(student);
  }
}
