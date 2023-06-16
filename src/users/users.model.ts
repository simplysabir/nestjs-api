/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-empty-interface */
/* eslint-disable prettier/prettier */
import * as mongoose from 'mongoose';

export const userSchema = new mongoose.Schema(
    {
      name: {
        type: String,
        required: true,
        trim: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
      },
      password: {
        type: String,
        required: true,
        minlength: 8,
      },
      token : {
        type : String,
        required : true,
        default : null
      },
      role: {
        type: String,
        default: 'user',
      },
      isEmailVerified: {
        type: Boolean,
        default: false,
      },
    },
    {
      timestamps: true,
    }
);

export interface User {
    name : string;
    email : string;
    password : string;
    token : string;
    role : string;
    isEmailVerified : boolean;
}