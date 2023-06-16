/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import { compare, genSalt, hash } from 'bcrypt';

@Injectable()
export class AuthService {
  private readonly saltRounds = 10;

  async comparePasswords(password: string, hashedPassword: string): Promise<boolean> {
    return compare(password, hashedPassword);
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await genSalt(this.saltRounds);
    return hash(password, salt);
  }

  generateToken(): string {
    // Generate a unique token here using your preferred method
    // For simplicity, we'll generate a random string as the token
    const tokenLength = 32;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let token = '';
    for (let i = 0; i < tokenLength; i++) {
      token += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return token;
  }
}
