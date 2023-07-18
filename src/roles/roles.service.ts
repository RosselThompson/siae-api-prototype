import { Inject, Injectable } from '@nestjs/common';
import { RoleDto } from './dto/role.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from './entities/role.entity';
import { Repository } from 'typeorm';
import { customError, customOk } from 'src/common/helpers/customResponse';
import { getPaginationData } from 'src/common/helpers/getPaginationData';
import { RoleQueryDto } from './dto/role-query.dto';
import { setFilterToQueryBuilder } from './filters/query.filter';
import { PermissionsService } from 'src/permissions/permissions.service';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @Inject(PermissionsService)
    private readonly permissionService: PermissionsService,
  ) {}

  async create(roleDto: RoleDto) {
    const isExist = await this.roleRepository.findOneBy({ name: roleDto.name });
    if (isExist) throw customError('This role already exists');

    const roleWithoutPermissions = { ...roleDto, permissions: [] };
    const createdRole = await this.roleRepository.save(roleWithoutPermissions);

    await Promise.all(
      roleDto.permissions.map(
        async (p) =>
          await this.permissionService.create({ ...p, roleId: createdRole.id }),
      ),
    );

    return await this.roleRepository.findOne({
      where: { id: createdRole.id },
      relations: { users: true, permissions: true },
    });
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
    const queryBuilder = this.roleRepository.createQueryBuilder('role');
    queryBuilder.leftJoinAndSelect('role.users', 'user');
    queryBuilder.leftJoinAndSelect('role.permissions', 'permission');
    queryBuilder.leftJoinAndSelect('permission.menuItem', 'menuItem');

    return await queryBuilder.where('role.id = :id', { id }).getOne();
  }

  async update(id: string, updateRoleDto: RoleDto) {
    await this.roleRepository.update(id, updateRoleDto);
    return await this.roleRepository.findOneBy({ id });
  }

  async remove(id: string) {
    await this.roleRepository.update(id, { isActive: false });
    return customOk('User was removed');
  }
}
