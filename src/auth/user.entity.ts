import { Exclude } from 'class-transformer';
import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @MinLength(4)
  @Column({ unique: true })
  username: string;

  @MinLength(6)
  @Exclude()
  @Column()
  password: string;

  @Exclude()
  @Column()
  salt: string;

  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @Column({ default: 'baseuser' })
  role: UserRole;
}

export enum UserRole {
  SuperAdmin = 'SuperAdmin',
  Admin = 'admin',
  Staff = 'staff',
  BaseUser = 'baseuser',
  InActive = 'inactive',
}
