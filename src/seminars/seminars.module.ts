import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from 'src/users/users.module';
import { SeminarsRepository } from './seminar.repository';
import { SeminarsService } from './seminars.service';

@Module({
  imports: [
    //   Import seminar
    TypeOrmModule.forFeature([SeminarsRepository]),
    //    Import user module
    UsersModule,
  ],
  providers: [SeminarsService],
})
export class SeminarsModule {}
