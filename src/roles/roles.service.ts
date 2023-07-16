import { Injectable } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { customError, customOk } from 'src/common/helpers/customResponse';
import { getPaginationData } from 'src/common/helpers/getPaginationData';
import { RoleQueryDto } from './dto/role-query.dto';
import { setFilterToQueryBuilder } from './filters/query.filter';
import { Permission } from 'src/permissions/entities/permission.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,
  ) {}

  async create(roleDto: RoleDto) {
    const isExist = await this.roleRepository.findOneBy({ name: roleDto.name });
    if (isExist) throw customError('This role already exists');

    const roleWithoutPermissions = { ...roleDto, permissions: [] };

    const createdRole = await this.roleRepository.save(roleWithoutPermissions);

    roleDto.permissions.forEach(async (permission) => {
      await this.permissionRepository.save({
        ...permission,
        roleId: createdRole.id,
      });
    });

    return this.roleRepository.findOneBy({ id: createdRole.id });
  }

  async findAll(roleQueryDto: RoleQueryDto) {
    const queryBuilder = this.roleRepository.createQueryBuilder('role');

    queryBuilder.leftJoinAndSelect('role.users', 'user');
    queryBuilder.leftJoinAndSelect('role.permissions', 'permission');
    queryBuilder.leftJoinAndSelect('permission.menuItem', 'menuItem');

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
