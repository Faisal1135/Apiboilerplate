import {
  BaseEntity,
  Column,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';

import * as bcypt from 'bcrypt';
import { Exclude } from 'class-transformer';

@Entity({ name: 'users' })
@Unique(['username', 'email'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  @Exclude()
  salt: string;

  async validatePassword(password: string): Promise<boolean> {
    const hash = await bcypt.hash(password, this.salt);

    return hash === this.password;
  }
}
