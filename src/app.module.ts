import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from 'src/config/database.config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { SeminarModule } from './seminar/seminar.module';

@Module({
  imports: [
    // Configuration with environtment file
    ConfigModule.forRoot(),
    // Database config
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
    AuthModule,
    SeminarModule,
  ],
})
export class AppModule {}
