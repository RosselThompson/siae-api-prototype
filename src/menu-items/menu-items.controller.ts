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
import { MenuItemsService } from './menu-items.service';
import { MenuItemDto } from './dto/menu-item.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { MenuItemQueryDto } from './dto/menu-item-query.dto';

@UseGuards(JwtAuthGuard)
@ApiBearerAuth()
@Controller('menu-items')
@ApiTags('Menu Item')
export class MenuItemsController {
  constructor(private readonly menuItemsService: MenuItemsService) {}

  @Post()
  create(@Body() createMenuItemDto: MenuItemDto) {
    return this.menuItemsService.create(createMenuItemDto);
  }

  @Get()
  findAll(@Query() menuItemQueryDto: MenuItemQueryDto) {
    return this.menuItemsService.findAll(menuItemQueryDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.menuItemsService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateMenuItemDto: MenuItemDto) {
    return this.menuItemsService.update(id, updateMenuItemDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.menuItemsService.remove(id);
  }
}
