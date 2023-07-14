import { Injectable } from '@nestjs/common';
import { MenuItemDto } from './dto/menu-item.dto';
import { MenuItemQueryDto } from './dto/menu-item-query.dto';
import { MenuItem } from './entities/menu-item.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customError, customOk } from 'src/common/helpers/customResponse';
import { setFilterToQueryBuilder } from 'src/users/filters/query.filter';
import { getPaginationData } from 'src/common/helpers/getPaginationData';

@Injectable()
export class MenuItemsService {
  constructor(
    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  async create(createMenuItemDto: MenuItemDto) {
    const isExist = await this.findByName(createMenuItemDto.name);
    if (isExist) throw customError('This menu item already exists');

    return await this.menuItemRepository.save(createMenuItemDto);
  }

  async findAll(menuItemQueryDto: MenuItemQueryDto) {
    const queryBuilder =
      this.menuItemRepository.createQueryBuilder('menu-item');
    const queryBuilderWithFilters = setFilterToQueryBuilder(
      menuItemQueryDto,
      queryBuilder,
    );
    const paginationData = await getPaginationData(
      'menu-item',
      menuItemQueryDto,
      queryBuilderWithFilters,
    );
    return paginationData;
  }

  findOne(id: string) {
    return this.menuItemRepository.findOneBy({ id });
  }

  async update(id: string, updateMenuItemDto: MenuItemDto) {
    await this.menuItemRepository.update(id, updateMenuItemDto);

    return this.menuItemRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.menuItemRepository.update(id, { isActive: false });
    return customOk('Menu Item was removed');
  }

  async findByName(name: string) {
    return await this.menuItemRepository.findOneBy({ name });
  }
}
