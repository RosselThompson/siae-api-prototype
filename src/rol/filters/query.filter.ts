import { Like, SelectQueryBuilder } from 'typeorm';
import { RolQueryDto } from '../dto/rol-query.dto';

export const setFilterToQueryBuilder = (
  rolQueryDto: RolQueryDto,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const filters = {
    ...(rolQueryDto.nombre && { nombre: Like(`%${rolQueryDto.nombre}%`) }),
    ...(rolQueryDto._isActive && { _isActive: rolQueryDto._isActive }),
  };

  return queryBuilder.where(filters);
};
