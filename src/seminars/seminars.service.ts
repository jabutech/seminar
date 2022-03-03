import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { UpdateSeminarDto } from './dto/update-seminar.dto';
import { Seminar } from './entity/seminar.entity';
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

  // Delete seminar
  async deleteSeminar(id: string, userLogin: any): Promise<any> {
    return this.seminarRespository.deleteSeminar(id, userLogin);
  }

  // Find one seminar service
  async findOneSeminar(judul: string): Promise<Seminar> {
    const seminar = await this.seminarRespository.findOne(
      { judul },
      // Relation
      { relations: ['user'] },
    );
    // If user is available and password is valid
    if (seminar) {
      // Return user
      return seminar;
    }

    // If no, return null
    return null;
  }
}
