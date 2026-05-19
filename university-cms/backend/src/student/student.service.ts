import { Get, Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student';
import { Student, StudentDocument } from './schemas/student.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { StudentModule } from './student.module';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async getStudents(): Promise<Student[]> {
    // Use this.studentModel instead of the Student class
    return await this.studentModel.find().populate('courses').exec();
  }

  async getStudentById(id: number): Promise<Student> {
    const student = await this.studentModel
      .findOne({ studentId: id })
      .populate('courses')
      .exec();

    if (!student) {
      throw new NotFoundException(`Student with ID ${id} not found`);
    }

    return student;
  }

  async createStudent(student: CreateStudentDto): Promise<Student> {
    const newStudent = new this.studentModel(student);
    return newStudent.save();
  }

  @Get('api/health')
  health(): { status: string } {
    return { status: 'Backend is healthy' };
  }
}
