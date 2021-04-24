import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class UserRegisterDto {
  @IsNotEmpty()
  @MinLength(4)
  username: string;
  @IsEmail()
  email: string;
  @MinLength(6)
  password: string;
}
