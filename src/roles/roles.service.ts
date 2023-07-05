import { Injectable } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { customOk } from 'src/common/helpers/customResponse';
import { getPaginationData } from 'src/common/helpers/getPaginationData';
import { RoleQueryDto } from './dto/role-query.dto';
import { setFilterToQueryBuilder } from './filters/query.filter';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createRoleDto: RoleDto) {
    return await this.roleRepository.save(createRoleDto);
  }

  async findAll(roleQueryDto: RoleQueryDto) {
    const queryBuilder = this.roleRepository.createQueryBuilder('role');
    const queryBuilderWithFilters = setFilterToQueryBuilder(
      roleQueryDto,
      queryBuilder,
    );
    const paginationData = await getPaginationData(
      'role',
      roleQueryDto,
      queryBuilderWithFilters,
    );
    return paginationData;
  }

  async findOne(id: string) {
    return this.roleRepository.findOneBy({ id });
  }

  async update(id: string, updateRoleDto: RoleDto) {
    await this.roleRepository.update(id, updateRoleDto);
    return this.roleRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.roleRepository.update(id, { isActive: false });
    return customOk('User was removed');
  }
}
