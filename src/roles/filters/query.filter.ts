import { Like, SelectQueryBuilder } from 'typeorm';
import { RoleQueryDto } from '../dto/role-query.dto';

export const setFilterToQueryBuilder = (
  roleQueryDto: RoleQueryDto,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const filters = {
    ...(roleQueryDto.name && { name: Like(`%${roleQueryDto.name}%`) }),
    ...(roleQueryDto.isActive && { isActive: roleQueryDto.isActive }),
  };

  return queryBuilder.where(filters);
};
