import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from './dto/auth_user.dto';
import { JwtPayload } from './dto/jwt.payload';
import { UserRegisterDto } from './dto/user_registraion.dto';
import { User } from './user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(userDto: UserRegisterDto): Promise<void> {
    const { username, password, email } = userDto;
    const salt = await bcrypt.genSalt();
    const user = new User();

    user.username = username;
    user.email = email;

    user.salt = salt;
    user.password = await this.hashPassword(password, salt);

    try {
      await user.save();
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('username is already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(userDto: UserDto): Promise<JwtPayload> {
    const { username, password } = userDto;

    const user = await this.findOne({
      where: [{ username }, { email: username }],
    });

    if (user && (await user.validatePassword(password))) {
      const { username, id }: JwtPayload = user;
      return { username, id };
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
