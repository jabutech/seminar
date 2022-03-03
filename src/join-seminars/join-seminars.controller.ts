import { Controller, Param, Post, Query, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { JoinSeminarsService } from './join-seminars.service';

@Controller('join-seminars')
// Use guard / middleware
@UseGuards(AuthGuard('jwt'))
export class JoinSeminarsController {
  // Constructor with parameter join seminar service
  constructor(private readonly joinSeminar: JoinSeminarsService) {}

  // Endpoint join seminar
  @Post()
  async createJoinSeminar(
    @Param('id') id: string,
    @Query('judul_seminar') judul_seminar: string,
    @Req() req,
  ): Promise<any> {
    return this.joinSeminar.createJoinSeminar(id, judul_seminar, req.user);
  }
}
