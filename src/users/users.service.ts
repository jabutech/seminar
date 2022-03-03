import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
  // Constructor with parameter inject repository user
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
  ) {}

  //   Method service register
  async register(payloadUser: CreateUserDto): Promise<void> {
    return await this.userRepository.register(payloadUser);
  }
}
