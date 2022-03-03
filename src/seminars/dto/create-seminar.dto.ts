import { IsNotEmpty } from 'class-validator';

export class CreateSeminarDto {
  @IsNotEmpty()
  judul: string;

  @IsNotEmpty()
  @IsDate()
  jadwal_seminar: Date;

  @IsNotEmpty()
  @IsNumber()
  maksimal_peserta: number;
}
