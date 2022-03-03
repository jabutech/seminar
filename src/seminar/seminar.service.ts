import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeminarRepository } from './seminar.repository';

@Injectable()
export class SeminarService {
  // Constructor
  constructor(
    @InjectRepository(SeminarRepository)
    private readonly seminarRepository: SeminarRepository,
  ) {}
}
