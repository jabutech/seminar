import {
  BadRequestException,
  ConflictException,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { UpdateSeminarDto } from './dto/update-seminar.dto';
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

  // Edit seminar
  async updateSeminar(
    id: string,
    userLogin: any,
    payloadSeminar: UpdateSeminarDto,
  ): Promise<any> {
    // Destructuring payload
    const { judul, jadwal_seminar, maksimal_peserta } = payloadSeminar;

    // Find seminar by id
    const seminar = await Seminar.findOne({ id }, { relations: ['user'] });

    // If seminar not found
    if (!seminar) {
      throw new NotFoundException({
        status: 'ERROR',
        message: 'Seminar tidak ditemukan.',
      });
    }

    // If the seminar does not belong to the logged in user
    if (seminar.user.id !== userLogin.id) {
      throw new UnauthorizedException({
        status: 'ERROR',
        message: 'Tidak dapat update seminar yang bukan milik kamu.',
      });
    }

    // Update seminar
    seminar.judul = judul;
    seminar.jadwal_seminar = jadwal_seminar;
    seminar.maksimal_peserta = maksimal_peserta;
    await seminar.save();

    return {
      status: 'SUCCESS',
      message: 'Seminar berhasil diupdate.',
    };
  }

  // Delete seminar
  async deleteSeminar(id: string, userLogin: any): Promise<any> {
    // Find seminar by id
    const seminar = await Seminar.findOne({ id }, { relations: ['user'] });

    // If seminar not found
    if (!seminar) {
      throw new NotFoundException({
        status: 'ERROR',
        message: 'Seminar tidak ditemukan.',
      });
    }

    // If the seminar does not belong to the logged in user
    if (seminar.user.id !== userLogin.id) {
      throw new UnauthorizedException({
        status: 'ERROR',
        message: 'Tidak dapat delete seminar yang bukan milik kamu.',
      });
    }

    // Delete seminar
    await Seminar.delete(id);

    // If success, return response
    return {
      status: 'SUCCESS',
      message: 'Seminar berhasil dihapus.',
    };
  }
}
