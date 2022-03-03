import { TypeOrmModuleOptions } from '@nestjs/typeorm';
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: 'root',
  database: 'seminar',
  // File entites / model
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  //   When on production set false
  synchronize: true,
};
