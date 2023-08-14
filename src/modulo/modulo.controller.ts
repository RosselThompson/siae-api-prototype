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
import { ModuloService } from './modulo.service';
import { ModuloDto } from './dto/modulo.dto';
import { ModuloQueryDto } from './dto/modulo-query.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('modulo')
@ApiTags('Modulos')
export class ModuloController {
  constructor(private readonly moduleService: ModuloService) {}

  @Post()
  create(@Body() moduleDto: ModuloDto) {
    return this.moduleService.create(moduleDto);
  }

  @Get()
  findAll(@Query() moduleQueryDto: ModuloQueryDto) {
    return this.moduleService.findAll(moduleQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.moduleService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() moduleDto: ModuloDto) {
    return this.moduleService.update(id, moduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.moduleService.remove(id);
  }
}
