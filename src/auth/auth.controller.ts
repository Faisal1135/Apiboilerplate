import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Get,
  Post,
  UseGuards,
  UseInterceptors,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserDto } from './dto/auth_user.dto';
import { UserRegisterDto } from './dto/user_registraion.dto';
import { GetUser } from './get-user.decorator';

import { User } from './user.entity';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  signUp(@Body(ValidationPipe) userDto: UserRegisterDto): Promise<void> {
    return this.authService.signUp(userDto);
  }

  @Post('signin')
  signin(@Body(ValidationPipe) userDto: UserDto) {
    return this.authService.signIn(userDto);
  }

  @Get()
  getTest() {
    return {
      data: 'rest',
    };
  }

  @Post('test')
  @UseGuards(AuthGuard())
  @UseInterceptors(ClassSerializerInterceptor)
  test(@GetUser() user: User) {
    console.log(user);
    return user;
  }
}
