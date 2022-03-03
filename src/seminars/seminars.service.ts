import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
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

  // Delete
  async deleteSeminar(id: string, userLogin: any): Promise<any> {
    // Delete book use object delete from bookRepository
    const result = await this.seminarRespository.delete(id);
    // Chek status affected for get status successfully deleted.
    if (result.affected === 0) {
      throw new NotFoundException({
        status: 'ERROR',
        message: `Seminar dengan ${id} tidak ditemukan.`,
      });
    }

    // If success, return response
    return {
      status: 'SUCCESS',
      message: 'Seminar berhasil dihapus.',
    };
  }
}
