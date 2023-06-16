/* eslint-disable prettier/prettier */
import { Module } from "@nestjs/common";
import { UsersController } from "./users.controller";
import { UsersServices } from "./user.service";
import { MongooseModule } from '@nestjs/mongoose';
import { userSchema } from "./users.model";
import {AuthController} from './auth.controller';
import { AuthService } from "./auth.service";
import { JwtStrategy } from "./jwt.strategy";
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{name : 'Users', schema : userSchema}]),
  JwtModule.register({
    secret: 'testingpurpose123', // Replace with your own secret key
  }),
  ],
  controllers: [UsersController, AuthController],
  providers : [UsersServices, AuthService, JwtStrategy],
})
export class UsersModule {}