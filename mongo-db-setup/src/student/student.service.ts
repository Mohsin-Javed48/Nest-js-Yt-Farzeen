/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Student, StudentDocument } from './student.schema';
import { Model } from 'mongoose';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<StudentDocument>,
  ) {}

  async createStudent(data: Partial<Student>): Promise<Student> {
    const createStudent = new this.studentModel(data);
    return createStudent.save();
  }

  async getAllStudents(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async updateStudent(
    id: string,
    data: Partial<Student>,
  ): Promise<Student | null> {
    const updatedStudent = await this.studentModel.findByIdAndUpdate(
      id,
      {
        name: data.name || null,
        age: data.age || null,
        email: data.email || null,
      },
      { new: true, overwrite: true },
    );
    return updatedStudent;
  }

  async patchStudent(
    id: string,
    data: Partial<Student>,
  ): Promise<Student | null> {
    const updatedStudent = await this.studentModel
      .findByIdAndUpdate(id, data, { new: true })
      .exec();
    return updatedStudent;
  }

  async deleteStudent(id: string): Promise<Student | null> {
    return this.studentModel.findByIdAndDelete(id).exec();
  }
}
