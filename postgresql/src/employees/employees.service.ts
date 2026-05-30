import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Employees } from './employees.entity';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(Employees)
    private employeeRepository: Repository<Employees>,
  ) {}

  async create(employeeData: Partial<Employees>): Promise<Employees> {
    if (employeeData.email) {
      const existingEmployee = await this.employeeRepository.findOneBy({
        email: employeeData.email,
      });
      if (existingEmployee) {
        const error = new Error(
          `Employee with email ${employeeData.email} already exists`,
        );
        throw error;
      }
    }
    return this.employeeRepository.save(employeeData);
  }

  async getAll(): Promise<Employees[]> {
    return this.employeeRepository.find();
  }

  async getById(id: number): Promise<Employees> {
    const employee = await this.employeeRepository.findOneBy({ id });
    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    return employee;
  }

  async update(
    id: number,
    employeeData: Partial<Employees>,
  ): Promise<Employees> {
    const employee = await this.getById(id);
    if (!employee) {
      throw new Error(`Employee with ID ${id} not found`);
    }
    const updatedEmployee = Object.assign(employee, employeeData);
    return this.employeeRepository.save(updatedEmployee);
  }

  async delete(
    id: number,
  ): Promise<{ message: string; deletedEmployee: Employees }> {
    const employee = await this.employeeRepository.findOneBy({ id });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${id} not found`);
    }

    await this.employeeRepository.remove(employee);

    return {
      message: `Employee with ID ${id} deleted successfully`,
      deletedEmployee: employee,
    };
  }

  async search(filters: {
    name?: string;
    department?: string;
  }): Promise<Employees[]> {
    const query = this.employeeRepository.createQueryBuilder('employee');

    if (filters.name) {
      query.andWhere('employee.name ILIKE :name', {
        name: `%${filters.name}%`,
      });
    }

    if (filters.department) {
      query.andWhere('employee.department ILIKE :department', {
        department: `%${filters.department}%`,
      });
    }

    return query.getMany();
  }
}
