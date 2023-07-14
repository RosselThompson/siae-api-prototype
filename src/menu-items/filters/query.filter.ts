import { Like, SelectQueryBuilder } from 'typeorm';
import { MenuItemQueryDto } from '../dto/menu-item-query.dto';

export const setFilterToQueryBuilder = (
  menuItemQueryDto: MenuItemQueryDto,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const filters = {
    ...(menuItemQueryDto.name && { name: Like(`%${menuItemQueryDto.name}%`) }),
    ...(menuItemQueryDto.isActive && { isActive: menuItemQueryDto.isActive }),
  };

  return queryBuilder.where(filters);
};
