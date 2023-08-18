import { Like, SelectQueryBuilder } from 'typeorm';
import { FacultadQueryDto } from '../dto/facultad-query.dto';

export const setFilterToQueryBuilder = (
  facultyQueryDto: FacultadQueryDto,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const filters = {
    ...(facultyQueryDto.nombre && {
      nombre: Like(`%${facultyQueryDto.nombre}%`),
    }),
    ...(facultyQueryDto.tipo && {
      tipo: Like(`%${facultyQueryDto.tipo}%`),
    }),
    ...(facultyQueryDto.codigo && {
      codigo: Like(`%${facultyQueryDto.codigo}%`),
    }),
    ...(facultyQueryDto._isActive && {
      _isActive: facultyQueryDto._isActive,
    }),
  };

  return queryBuilder.where(filters);
};
