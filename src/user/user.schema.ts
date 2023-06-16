/* eslint-disable prettier/prettier */
import { Schema, Document } from 'mongoose';

export interface User extends Document {
  name: string;
  email: string;
  password: string;
  token: string;
}

export const UserSchema = new Schema<User>({
  name: String,
  email: String,
  password: String,
  token: String,
});
