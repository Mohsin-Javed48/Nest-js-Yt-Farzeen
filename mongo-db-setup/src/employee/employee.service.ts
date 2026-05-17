/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Employee } from './schemas/employee.schema';
import { Profile } from './schemas/profile.schema';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectModel(Employee.name) private employeeModel: Model<Employee>,
    @InjectModel(Profile.name) private profileModel: Model<Profile>,
  ) {}

  async createEmployee(): Promise<Employee> {
    const profile = await new this.profileModel({
      age: 30,
      qualification: 'Masters',
    }).save();
    const employee = await new this.employeeModel({
      name: 'Jane Doe',
      profile: profile._id,
    }).save();
    console.log(employee);
    return employee;
  }

  async findAll(): Promise<Employee[]> {
    return this.employeeModel.find().populate('profile');
  }
}
