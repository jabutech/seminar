import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SeminarsService } from 'src/seminars/seminars.service';
import { JoinSeminarsRepository } from './seminar-repository';

@Injectable()
export class JoinSeminarsService {
  constructor(
    @InjectRepository(JoinSeminarsRepository)
    private readonly joinSeminarRepository: JoinSeminarsRepository,
    private readonly seminarService: SeminarsService,
  ) {}

  // Method create join seminar
  async createJoinSeminar(
    id: string,
    judulSeminar: string,
    userLogin: any,
  ): Promise<any> {
    // Find judul seminar on db
    const seminar = await this.seminarService.findOneSeminar(judulSeminar);

    // If seminar not found
    if (!seminar) {
      throw new BadRequestException({
        status: 'ERROR',
        message: `Seminar dengan judul '${judulSeminar}' tidak ditemukan.`,
      });
    }

    // If user login id same seminar userId relation
    if (userLogin.id === seminar.user.id) {
      throw new BadRequestException({
        status: 'ERROR',
        message: 'Tidak bisa daftar seminar milik sendiri',
      });
    }

    // Count the attendees at the seminar
    const countJoinSeminar = await this.joinSeminarRepository.find({
      seminarId: seminar.id,
    });

    // If the attendess join the seminar greather than seminar maksimal_peserta
    if (countJoinSeminar.length >= seminar.maksimal_peserta) {
      // Throw error
      throw new BadRequestException({
        status: 'ERROR',
        message: 'Kuota peserta seminar sudah penuh.',
      });
    }

    // Find user on join seminar
    const userDoubleJoin = countJoinSeminar.find(
      (item) => item.userId === userLogin.id,
    );

    if (userDoubleJoin !== undefined) {
      // Throw error
      throw new BadRequestException({
        status: 'ERROR',
        message: 'Kamu sudah terdaftar diseminar ini.',
      });
    }

    //  If all conditional is pass, create join seminar
    const joinSeminar = this.joinSeminarRepository.create();
    joinSeminar.userId = userLogin.id;
    joinSeminar.seminarId = seminar.id;

    //   Save seminar to db
    await joinSeminar.save();
    //   Return response
    return {
      status: 'SUCCESS',
      message: 'Berhasil daftar peserta seminar.',
    };
  }
}
