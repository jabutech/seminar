import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { SeminarService } from './seminar.service';

@Module({
  imports: [
    //   Import seminar
    TypeOrmModule.forFeature([SeminarModule]),
    //   Import user module
    UsersModule,
  ],
  providers: [SeminarService],
})
export class SeminarModule {}
