import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { SeminarsService } from './seminars.service';

@Controller('seminars')
// Use guard / middleware
@UseGuards(AuthGuard('jwt'))
export class SeminarsController {
  // Constructor with paramter seminar srvice
  constructor(private readonly seminarService: SeminarsService) {}

  //   Endpoint create seminar
  @Post('/create')
  async createSeminar(
    @Req() req,
    @Body() paylodSeminar: CreateSeminarDto,
  ): Promise<any> {
    return this.seminarService.createSeminar(req.user, paylodSeminar);
  }
}
