import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JoinSeminarsRepository } from './seminar-repository';
import { JoinSeminarsService } from './join-seminars.service';
import { JoinSeminarsController } from './join-seminars.controller';
import { SeminarsModule } from 'src/seminars/seminars.module';

@Module({
  imports: [
    // Import seminar module
    SeminarsModule,
    //   Import join seminars
    TypeOrmModule.forFeature([JoinSeminarsRepository]),
  ],
  providers: [JoinSeminarsService],
  controllers: [JoinSeminarsController],
})
export class JoinSeminarsModule {}
