import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'config/database.config';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    // Configuration with environtment file
    ConfigModule.forRoot(),
    // Database config
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
  ],
})
export class AppModule {}
