import { Like, SelectQueryBuilder } from 'typeorm';
import { UsuarioQueryDto } from '../dto/usuario-query.dto';

export const setFilterToQueryBuilder = (
  userQueryDto: UsuarioQueryDto,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const filters = {
    ...(userQueryDto.email && { email: Like(`%${userQueryDto.email}%`) }),
    ...(userQueryDto.nombre && {
      nombre: Like(`%${userQueryDto.nombre}%`),
    }),
    ...(userQueryDto.apellido && {
      apellido: Like(`%${userQueryDto.apellido}%`),
    }),
    ...(userQueryDto._isActive && {
      _isActive: userQueryDto._isActive,
    }),
  };

  return queryBuilder.where(filters);
};
