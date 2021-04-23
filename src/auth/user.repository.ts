import { EntityRepository, Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { User } from './user.entity';
import * as bcrypt from 'bcrypt';
import { ClassSerializerInterceptor, UseInterceptors } from '@nestjs/common';

@EntityRepository(User)
@UseInterceptors(ClassSerializerInterceptor)
export class UserRepository extends Repository<User> {
  async signUp(userDto: UserDto) {
    const { username, password, email } = userDto;
    const salt = await bcrypt.genSalt();

    const newUser = new User();

    newUser.email = email;
    newUser.salt = salt;
    newUser.salt = salt;
    newUser.username = username;
    newUser.password = await this.hashPassword(password, salt);

    await newUser.save();

    delete newUser.password;
    delete newUser.salt;

    return newUser;
  }

  hashPassword(password: string, salt: string) {
    return bcrypt.hash(password, salt);
  }
}
