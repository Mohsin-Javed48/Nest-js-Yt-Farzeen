/* eslint-disable prettier/prettier */
import { Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService){}

    @Get()
    async findAll() {
        return this.userService.findAll();
    }

    @Post()
    async createUser(){
        return this.userService.createUser();
    }
    
}
