/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Post,
  Get,
  Put,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { Employees } from './employees.entity';

@Controller('employees')
export class EmployeesController {
  constructor(private readonly employeesService: EmployeesService) {}

  @Post()
  async create(@Body() employeeData: Partial<Employees>) {
    return this.employeesService.create(employeeData);
  }

  @Get()
  async findAll() {
    return this.employeesService.getAll();
  }

  @Get('search')
  async search(
    @Query('name') name?: string,
    @Query('department') department?: string,
  ): Promise<Employees[]> {
    return this.employeesService.search({ name, department });
  }
 
  @Get(':id')
  async findOne(@Param('id') id: number) {
    return this.employeesService.getById(id);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() employeeData: Partial<Employees>,
  ) {
    return this.employeesService.update(id, employeeData);
  }

  @Delete(':id')
  async delete(@Param('id') id: number) {
    return this.employeesService.delete(id);
  }
}
