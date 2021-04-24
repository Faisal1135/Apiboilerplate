import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'MY USERNAME',
  password: 'MY PASSWORD',
  database: 'mydb',
  //   autoLoadEntities: true,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  //Not in prdoduction mode
  synchronize: true,
};
