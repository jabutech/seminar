import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { UpdateSeminarDto } from './dto/update-seminar.dto';
import { SeminarsRepository } from './seminar.repository';

@Injectable()
export class SeminarsService {
  constructor(
    @InjectRepository(SeminarsRepository)
    private readonly seminarRespository: SeminarsRepository,
  ) {}

  // Method create seminar
  async createSeminar(
    userLogin: any,
    payloadSeminar: CreateSeminarDto,
  ): Promise<void> {
    return this.seminarRespository.createSeminar(userLogin, payloadSeminar);
  }

  // Method update seminar
  async updateSeminar(
    id: string,
    userLogin: any,
    payloadSeminar: UpdateSeminarDto,
  ): Promise<void> {
    return this.seminarRespository.updateSeminar(id, userLogin, payloadSeminar);
  }
}
