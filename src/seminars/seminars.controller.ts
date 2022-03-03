import {
  Body,
  Controller,
  Delete,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateSeminarDto } from './dto/create-seminar.dto';
import { UpdateSeminarDto } from './dto/update-seminar.dto';
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

  // Enpoint update seminar
  @Put('/update/:id')
  async updateSeminar(
    @Param('id') id: string,
    @Req() req,
    @Body() payloadSeminar: UpdateSeminarDto,
  ): Promise<any> {
    return this.seminarService.updateSeminar(id, req.user, payloadSeminar);
  }

  // Endpoint delete seminar
  @Delete('/delete/:id')
  async deteleSeminar(@Param('id') id: string, @Req() req): Promise<any> {
    return this.seminarService.deleteSeminar(id, req.user);
  }
}
