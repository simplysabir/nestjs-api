import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { User } from './user.schema';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  async createUser(name: string, email: string, password: string): Promise<User> {
    const user: User = {
      name,
      email,
      password,
      token: '',
    };
    return this.userRepository.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepository.findByEmail(email);
  }
}
