/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Controller, Post,Body, Get } from '@nestjs/common';
import { UsersServices } from './user.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersServices : UsersServices) {}
    
    @Get()
    getHello() {
        return this.usersServices.getHello();
    }

}