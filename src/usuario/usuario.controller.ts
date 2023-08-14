import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { UsuarioService } from './usuario.service';
import { UsuarioQueryDto } from './dto/usuario-query.dto';
import { UsuarioDto } from './dto/usuario.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('usuario')
@ApiTags('Usuarios')
export class UsuarioController {
  constructor(private readonly userService: UsuarioService) {}

  @Post()
  create(@Body() userDto: UsuarioDto) {
    return this.userService.create(userDto);
  }

  @Get()
  findAll(@Query() userQueryDto: UsuarioQueryDto) {
    return this.userService.findAll(userQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Get('perfil/:id')
  findUserProfile(@Param('id') id: string) {
    return this.userService.findUserProfile(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() userDto: UsuarioDto) {
    return this.userService.update(id, userDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
