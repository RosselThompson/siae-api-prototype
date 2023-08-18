import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RecintoService } from './recinto.service';
import { RecintoDto } from './dto/recinto.dto';
import { RecintoQueryDto } from './dto/recinto-query.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('recinto')
@ApiTags('Recinto')
export class RecintoController {
  constructor(private readonly campusService: RecintoService) {}

  @Post()
  create(@Body() campusDto: RecintoDto) {
    return this.campusService.create(campusDto);
  }

  @Get()
  findAll(@Query() campusQueryDto: RecintoQueryDto) {
    return this.campusService.findAll(campusQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.campusService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() campusDto: RecintoDto) {
    return this.campusService.update(id, campusDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.campusService.remove(id);
  }
}
