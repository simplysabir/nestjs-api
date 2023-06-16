import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.schema';
import { AuthService } from './auth.service';
import { ResetApiKeyDto } from './dto/reset-api-key.dto';
import { ApiBearerAuth } from '@nestjs/swagger';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService, private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto): Promise<User> {
    const { name, email, password } = createUserDto;
    return this.userService.createUser(name, email, password);
  }

  @ApiBearerAuth()
  @Post('reset-api-key')
  async resetApiKey(@Body() resetApiKeyDto: ResetApiKeyDto, @Req() req: Request): Promise<User> {
    const { email, password } = resetApiKeyDto;
    const user = await this.userService.findByEmail(email);
    if (!user || !(await this.authService.comparePasswords(password, user.password))) {
      throw new UnauthorizedException('Invalid email or password');
    }
    user.token = this.authService.generateToken();
    await user.save();
    return user;
  }
}
