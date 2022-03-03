import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';

@Module({
  imports: [
    //   Auth service
    TypeOrmModule.forFeature([AuthRepository]),
    //   Import user module
    UsersModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
