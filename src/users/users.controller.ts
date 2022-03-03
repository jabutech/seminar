import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  // Contructor with parameter user servive
  constructor(private readonly usersService: UsersService) {}

  //   Endpoint create register
  @Post('/register')
  async register(@Body() payloadUser: CreateUserDto): Promise<void> {
    return this.usersService.register(payloadUser);
  }
}
