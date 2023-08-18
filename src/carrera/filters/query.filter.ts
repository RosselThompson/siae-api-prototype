import { Like, SelectQueryBuilder } from 'typeorm';
import { CarreraQueryDto } from '../dto/carrera-query.dto';

export const setFilterToQueryBuilder = (
  careerQueryDto: CarreraQueryDto,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const filters = {
    ...(careerQueryDto.nombre && {
      nombre: Like(`%${careerQueryDto.nombre}%`),
    }),
    ...(careerQueryDto._isActive && {
      _isActive: careerQueryDto._isActive,
    }),
  };

  return queryBuilder.where(filters);
};
