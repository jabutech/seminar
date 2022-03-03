import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeminarsRepository } from './seminar.repository';

@Injectable()
export class SeminarsService {
  constructor(
    @InjectRepository(SeminarsRepository)
    private readonly seminarRespository: SeminarsRepository,
  ) {}
}
