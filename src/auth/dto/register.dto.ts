import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class RegisterDto {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @IsEmail() // Format email
  email: string;

  @IsNotEmpty()
  @MinLength(5) // Min length 5 carachter
  password: string;
}
