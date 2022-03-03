import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { Seminar } from './entity/seminar.entity';

@EntityRepository(Seminar)
export class SeminarsRepository extends Repository<Seminar> {
  // Create seminar
  async createSeminar(
    userLogin: any,
    payloadSeminar: CreateSeminarDto,
  ): Promise<any> {
    try {
      //  Destructuring payload Seminar
      const { judul, jadwal_seminar, maksimal_peserta } = payloadSeminar;

      // Create object seminar
      const seminar = this.create();
      seminar.judul = judul;
      seminar.jadwal_seminar = jadwal_seminar;
      seminar.maksimal_peserta = maksimal_peserta;
      seminar.user = userLogin;

      //   Save seminar to db
      await seminar.save();
      //   Return response
      return {
        status: 'SUCCESS',
        message: 'Seminar berhasil dibuat.',
      };
    } catch (error) {
      // If error no 1062 as duplicate entry from mysql
      if (error.errno === 1062) {
        // Return error respons
        throw new ConflictException({
          status: 'ERROR',
          message: 'Judul seminar sudah ada.',
        });
      } else {
        // If no, return any error
        throw new InternalServerErrorException({
          status: 'ERROR',
          message: error,
        });
      }
    }
  }
}