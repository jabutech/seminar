import { IsNotEmpty } from 'class-validator';

export class JoinSeminarDto {
  @IsNotEmpty()
  userId: string;

  @IsNotEmpty()
  seminarId: string;
}
