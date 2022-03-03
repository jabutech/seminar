import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthRepository } from './auth.repository';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  // Constructor
  constructor(
    // parameter inject repository Auth
    @InjectRepository(AuthRepository)
    private readonly authRepository: AuthRepository,
    // parameter jwt servive
    private readonly jwtService: JwtService,
  ) {}

  //   Method service register
  async register(payloadRegister: RegisterDto): Promise<void> {
    return await this.authRepository.register(payloadRegister);
  }

  //   Method service login
  async login(payloadLogin: LoginDto): Promise<any> {
    // Validate user use method validateUser on auth repository
    const user = await this.authRepository.validateUser(payloadLogin);

    // If user not found
    if (!user) {
      // throw error
      throw new UnauthorizedException({
        status: 'ERROR',
        message: 'Email atau password salah',
      });
    }

    // If user is available
    // Create payload for token
    const payloadToken = {
      id: user.id,
    };

    // Create token
    const token = await this.jwtService.signAsync(payloadToken, {
      // Token life in 1 day
      expiresIn: '1d',
    });

    // Insert token to user login
    this.authRepository.update(user.id, { token });

    // Return
    return {
      status: 'SUCCESS',
      message: 'Login berhasil',
      token,
    };
  }
}
