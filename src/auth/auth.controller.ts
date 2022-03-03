import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  // Constructo with paramter auth service
  constructor(private readonly authService: AuthService) {}

  //   Endpoint register
  @Post('/register')
  async register(@Body() payloadUser: RegisterDto): Promise<void> {
    return this.authService.register(payloadUser);
  }

  // Endpoint login
  @Post('/login')
  async login(@Body() payloadLogin: LoginDto): Promise<void> {
    return this.authService.login(payloadLogin);
  }
}
