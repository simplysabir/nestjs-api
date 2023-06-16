/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Body, Controller, Post, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from './users.model';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() body: {name: string, email: string; password: string }) : Promise<User>{
    const {name, email, password} = body;
    const user = await this.authService.createUser(name,email,password);

    return user;
  }

  @Post('login')
  async login(@Body() body: { email: string; password: string }): Promise<{ token: string }> {
    const { email, password } = body;
    const user = await this.authService.validateUser(email, password);
    const token = await this.authService.generateToken(user);
    return { token };
  }

  @Get('all')
  async getAllUsers() : Promise<any>{
    return this.authService.getAllUsers()
  }
}
