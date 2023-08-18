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
import { CarreraService } from './carrera.service';
import { CarreraDto } from './dto/carrera.dto';
import { CarreraQueryDto } from './dto/carrera-query.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('carrera')
@ApiTags('Carrera')
export class CarreraController {
  constructor(private readonly careerService: CarreraService) {}

  @Post()
  create(@Body() careerDto: CarreraDto) {
    return this.careerService.create(careerDto);
  }

  @Get()
  findAll(@Query() careerQueryDto: CarreraQueryDto) {
    return this.careerService.findAll(careerQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.careerService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() careerDto: CarreraDto) {
    return this.careerService.update(id, careerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.careerService.remove(id);
  }
}
