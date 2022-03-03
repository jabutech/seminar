import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';
import { AuthService } from './auth.service';

@Module({
  imports: [
    //   Import user module
    UsersModule,
  ],
  providers: [AuthService],
})
export class AuthModule {}
