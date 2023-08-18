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
import { FacultadService } from './facultad.service';
import { FacultadDto } from './dto/facultad.dto';
import { FacultadQueryDto } from './dto/facultad-query.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('facultad')
@ApiTags('Facultad/Sede')
export class FacultadController {
  constructor(private readonly facultyService: FacultadService) {}

  @Post()
  create(@Body() facultyDto: FacultadDto) {
    return this.facultyService.create(facultyDto);
  }

  @Get()
  findAll(@Query() facultyQueryDto: FacultadQueryDto) {
    return this.facultyService.findAll(facultyQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.facultyService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() facultyDto: FacultadDto) {
    return this.facultyService.update(id, facultyDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.facultyService.remove(id);
  }
}
