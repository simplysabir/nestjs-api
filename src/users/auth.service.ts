/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { User } from './users.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('Users') private userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async createUser(name : string, email : string, password  : string){
    if(name && email && password){
      throw new UnauthorizedException('All Fields are Required');
    }
    const userExists = await this.userModel.findOne({ email });
    if(userExists){
      throw new UnauthorizedException('User with this email already exists');
    }

    const payload = email;
    const token = await this.jwtService.signAsync(payload);
    const user = await this.userModel.create({name, email, password, token});
    user.save();

    return user;
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }

  async generateToken(user: User): Promise<string> {
    const payload = { sub: user.email };
    return this.jwtService.signAsync(payload);
  }

  async getAllUsers() : Promise<any> {
    const allUsers = await this.userModel.find({});

    return allUsers;
  }

  async validateUserByEmail(userId: string): Promise<User> {
    const user = await this.userModel.findById(userId);

    if (!user) {
      throw new UnauthorizedException('Invalid user');
    }

    return user;
  }
}
