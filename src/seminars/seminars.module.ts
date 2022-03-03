import { Module } from '@nestjs/common';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [
    //    Import user module
    UsersModule,
  ],
})
export class SeminarsModule {}
