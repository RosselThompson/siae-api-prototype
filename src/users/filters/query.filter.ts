import { Like, SelectQueryBuilder } from 'typeorm';
import { UserQueryDto } from '../dto/user-query.dto';

export const setFilterToQueryBuilder = (
  userQueryDto: UserQueryDto,
  queryBuilder: SelectQueryBuilder<any>,
) => {
  const filters = {
    ...(userQueryDto.email && { email: Like(`%${userQueryDto.email}%`) }),
    ...(userQueryDto.firstName && {
      firstName: Like(`%${userQueryDto.firstName}%`),
    }),
    ...(userQueryDto.lastName && {
      lastName: Like(`%${userQueryDto.lastName}%`),
    }),
    ...(userQueryDto.isActive && { isActive: userQueryDto.isActive }),
  };

  return queryBuilder.where(filters);
};
