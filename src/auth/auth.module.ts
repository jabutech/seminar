import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { jwtConfig } from 'src/config/jwt.config';

@Module({
  imports: [
    //   Auth service
    TypeOrmModule.forFeature([AuthRepository]),
    //   Import user module
    UsersModule,
    // Import jwt config
    JwtModule.register(jwtConfig),
  ],
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
