import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  // Constructor with parameter inject repository Auth
  constructor(
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
  ) {}

  //   Method service register
  async register(payloadRegister: RegisterDto): Promise<void> {
    return await this.authRepository.register(payloadRegister);
  }
}
