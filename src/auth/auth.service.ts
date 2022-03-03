import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entity/user.entity';
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

  // Method service logout
  async logout(payloadUserLogin): Promise<any> {
    // Find user is login on database
    const user = await this.authRepository.findOne(payloadUserLogin.id);
    // If token user is notfound
    if (!user.token) {
      throw new BadRequestException({
        status: 'ERROR',
        message: 'Kamu sudah logout.',
      });
    }

    // If user token is available
    // set object token null
    user.token = null;
    // save to db
    await user.save();

    // Return
    return {
      status: 'SUCCESS',
      message: 'Logout berhasil.',
    };
  }

  // Method get user by id for validate jwt strategy
  async findUserById(id: string): Promise<User> {
    return await this.authRepository.findOne(id);
  }
}
