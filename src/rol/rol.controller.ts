import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseGuards,
  Query,
  Put,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RolService } from './rol.service';
import { RolDto } from './dto/rol.dto';
import { RolQueryDto } from './dto/rol-query.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('rol')
@ApiTags('Roles')
export class RolController {
  constructor(private readonly roleService: RolService) {}

  @Post()
  create(@Body() roleDto: RolDto) {
    return this.roleService.create(roleDto);
  }

  @Get()
  findAll(@Query() roleQueryDto: RolQueryDto) {
    return this.roleService.findAll(roleQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() roleDto: RolDto) {
    return this.roleService.update(id, roleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.roleService.remove(id);
  }
}
