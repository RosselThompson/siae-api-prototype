import { Like, SelectQueryBuilder } from 'typeorm';
import { ModuloQueryDto } from '../dto/modulo-query.dto';

export const setFilterToQueryBuilder = (
  moduloQueryDto: ModuloQueryDto,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const filters = {
    ...(moduloQueryDto.nombre && {
      nombre: Like(`%${moduloQueryDto.nombre}%`),
    }),
    ...(moduloQueryDto._isActive && {
      _isActive: moduloQueryDto._isActive,
    }),
  };

  return queryBuilder.where(filters);
};
