import { IsNumber, IsOptional } from 'class-validator';

export class UpdateSeminarDto {
  @IsOptional()
  judul: string;

  @IsOptional()
  jadwal_seminar: string;

  @IsOptional()
  @IsNumber()
  maksimal_peserta: number;
}
