import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserDto } from './dto/auth_user.dto';
import { JwtPayload } from './dto/jwt.payload';
import { UserRepository } from './user.repository';
import { UserRegisterDto } from './dto/user_registraion.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  signUp(userDto: UserRegisterDto): Promise<void> {
    return this.userRepository.signUp(userDto);
  }

  async signIn(userDto: UserDto): Promise<{ accesstoken: string }> {
    const { username, id } = await this.userRepository.signIn(userDto);

    if (!username) {
      throw new UnauthorizedException('Invalid Credential');
    }
    const payload: JwtPayload = { username, id };
    const accesstoken = this.jwtService.sign(payload);

    return { accesstoken };
  }
}
