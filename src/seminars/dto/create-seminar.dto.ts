import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateSeminarDto {
  @IsNotEmpty()
  judul: string;

  @IsNotEmpty()
  jadwal_seminar: string;

  @IsNotEmpty()
  @IsNumber()
  maksimal_peserta: number;
}
