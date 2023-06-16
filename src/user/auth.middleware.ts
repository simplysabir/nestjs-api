/* eslint-disable prettier/prettier */
import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { UserService } from './user.service';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  constructor(private readonly userService: UserService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');

    if (!token) {
      throw new UnauthorizedException('Missing token');
    }

    const user = await this.userService.findByToken(token);

    if (!user) {
      throw new UnauthorizedException('Invalid token');
    }

    req.user = user;

    next();
  }
}
