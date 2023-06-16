/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-function */
/* eslint-disable prettier/prettier */
import { Injectable} from "@nestjs/common";
import { User } from "./users.model";
import {InjectModel} from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UsersServices {
    constructor(@InjectModel('Users') private readonly usersModel : Model<User>){}
    
    getHello(){
        return "Hi From User";
    }

}