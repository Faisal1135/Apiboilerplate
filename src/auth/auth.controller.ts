import { Body, Controller, Get, Post, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from './dto/user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private readonly userService: AuthService) {}
  @Get()
  getUser() {
    return {
      test: 'fonni',
    };
  }

  @Post()
  signInUser(@Body(ValidationPipe) userDto: UserDto) {
    return this.userService.signUpUser(userDto);
  }
}
