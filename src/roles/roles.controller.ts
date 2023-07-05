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
import { RolesService } from './roles.service';
import { RoleDto } from './dto/role.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { RoleQueryDto } from './dto/role-query.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('roles')
@ApiTags('Role')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  create(@Body() createRoleDto: RoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  findAll(@Query() roleQueryDto: RoleQueryDto) {
    return this.rolesService.findAll(roleQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.rolesService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateRoleDto: RoleDto) {
    return this.rolesService.update(id, updateRoleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.rolesService.remove(id);
  }
}
