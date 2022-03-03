import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'rahasia',
    });
  }

  //   Validate user
  async validate(payload: any) {
    //   Find user
    const user = await this.authService.findUserById(payload.id);

    // If user not available
    if (!user) {
      // Return error
      throw new UnauthorizedException({
        status: 'Error',
        message: 'User not found',
      });
    }

    // If user is available, return
    return user;
  }
}
