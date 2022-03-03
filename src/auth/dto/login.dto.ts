import { IsEmail, IsNotEmpty, MinLength } from 'class-validator';

export class LoginDto {
  @IsNotEmpty() // Is required
  @IsEmail() // Email format
  email: string;

  @IsNotEmpty() // Is required
  @MinLength(5) // Min length 5 carachter
  password: string;
}
