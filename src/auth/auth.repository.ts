import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from 'src/users/entity/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@EntityRepository(User)
export class AuthRepository extends Repository<User> {
  // Method register
  async register(payloadRegister: RegisterDto): Promise<any> {
    try {
      // Destructuring payload user
      const { name, email, password } = payloadRegister;

      //   Create new object user
      const user = this.create();
      user.name = name;
      user.email = email;
      user.password = password;

      //   Save to db
      await user.save();

      //   Return response
      return {
        status: 'SUCCESS',
        message: 'User berhasil didaftarkan.',
      };
    } catch (error) {
      // If error no 1062 as duplicate entry from mysql
      if (error.errno === 1062) {
        // Return error respons
        throw new ConflictException({
          status: 'ERROR',
          message: 'Email sudah ada.',
        });
      } else {
        // If no, return any error
        throw new InternalServerErrorException({
          status: 'ERROR',
          message: error,
        });
      }
    }
  }

  // Method validate user
  async validateUser(payloadLogin: LoginDto): Promise<any> {
    // Destructuring payload login
    const { email, password } = payloadLogin;

    // Find user on db by email
    const user = await User.findOne({ email });

    // If user is available and password is match
    if (user && (await bcrypt.compare(password, user.password))) {
      // Return user
      return user;
    }

    // If user not found
    return null;
  }
}
