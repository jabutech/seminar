import { JwtModuleOptions } from '@nestjs/jwt';

export const jwtConfig: JwtModuleOptions = {
  // Secret code
  secret: 'rahasia',
  signOptions: {
    // Expired time 1 day
    expiresIn: '1d',
  },
};
