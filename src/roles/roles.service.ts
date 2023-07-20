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
    const rolesQueryBuilder = this.generateRolesQueryBuilder();
    const queryBuilderWithFilters = setFilterToQueryBuilder(
      roleQueryDto,
      rolesQueryBuilder,
    );
    const paginationData = await getPaginationData(
      'role',
      roleQueryDto,
      queryBuilderWithFilters,
    );
    return paginationData;
  }

  async findOne(id: string) {
    try {
      const rolesQueryBuilder = this.generateRolesQueryBuilder();
      const role = await rolesQueryBuilder
        .where('role.id = :id', { id })
        .getOne();
      if (!role) throw customError('Role does not exist');
      return role;
    } catch (err) {
      throw customError(err?.message);
    }
  }

  async update(id: string, roleDto: RoleDto) {
    try {
      await this.roleRepository.update(id, { name: roleDto.name });
      await this.permissionService.bulkUpdate(roleDto.permissions, id);
      return await this.findOne(id);
    } catch (err) {
      throw customError(err?.message);
    }
  }

  async remove(id: string) {
    await this.roleRepository.update(id, { isActive: false });
    return customOk('User was removed');
  }

  generateRolesQueryBuilder() {
    const queryBuilder = this.roleRepository.createQueryBuilder('role');
    queryBuilder.leftJoinAndSelect('role.users', 'user');
    queryBuilder.leftJoinAndSelect(
      'role.permissions',
      'permission',
      'permission.isActive = :isActive',
      {
        isActive: true,
      },
    );
    queryBuilder.leftJoinAndSelect('permission.menuItem', 'menuItem');
    return queryBuilder;
  }
}
