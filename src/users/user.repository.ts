import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entity/user.entity';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  // Method register
  async register(payloadUser: CreateUserDto): Promise<any> {
    try {
      // Destructuring payload user
      const { name, email, password } = payloadUser;

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
        message: 'User registration is successful.',
      };
    } catch (error) {
      // If error no 1062 as duplicate entry from mysql
      if (error.errno === 1062) {
        // Return error respons
        throw new ConflictException({
          status: 'ERROR',
          message: 'Email already exist.',
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
}
