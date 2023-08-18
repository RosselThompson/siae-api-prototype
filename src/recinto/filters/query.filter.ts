import { Like, SelectQueryBuilder } from 'typeorm';
import { RecintoQueryDto } from '../dto/recinto-query.dto';

export const setFilterToQueryBuilder = (
  campusQueryDto: RecintoQueryDto,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const filters = {
    ...(campusQueryDto.nombre && {
      nombre: Like(`%${campusQueryDto.nombre}%`),
    }),
    ...(campusQueryDto._isActive && {
      _isActive: campusQueryDto._isActive,
    }),
  };

  return queryBuilder.where(filters);
};
