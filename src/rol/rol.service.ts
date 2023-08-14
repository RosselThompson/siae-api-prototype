import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customError, customOk } from 'src/common/helpers/customResponse';
import { getPaginationData } from 'src/common/helpers/getPaginationData';
import { setFilterToQueryBuilder } from './filters/query.filter';
import { Rol } from './entities/rol.entity';
import { RolDto } from './dto/rol.dto';
import { PermisoService } from 'src/permiso/permiso.service';
import { RolQueryDto } from './dto/rol-query.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private roleRepository: Repository<Rol>,

    @Inject(PermisoService)
    private readonly permissionService: PermisoService,
  ) {}

  async create(roleDto: RolDto) {
    const isExist = await this.roleRepository.findOneBy({
      nombre: roleDto.nombre,
    });
    if (isExist) throw customError('Este Rol ya existe');

    const roleWithoutPermissions = { ...roleDto, permisos: [] };
    const createdRole = await this.roleRepository.save(roleWithoutPermissions);

    await Promise.all(
      roleDto.permisos.map(
        async (p) =>
          await this.permissionService.create({ ...p, rolId: createdRole.id }),
      ),
    );

    return await this.roleRepository.findOne({
      where: { id: createdRole.id },
      relations: { usuarios: true, permisos: true },
    });
  }

  async findAll(roleQueryDto: RolQueryDto) {
    const rolesQueryBuilder = this.generateRolesQueryBuilder();
    const queryBuilderWithFilters = setFilterToQueryBuilder(
      roleQueryDto,
      rolesQueryBuilder,
    );
    const paginationData = await getPaginationData(
      'rol',
      roleQueryDto,
      queryBuilderWithFilters,
    );
    return paginationData;
  }

  async findOne(id: number) {
    try {
      const rolesQueryBuilder = this.generateRolesQueryBuilder();
      const role = await rolesQueryBuilder
        .where('rol.id = :id', { id })
        .getOne();
      if (!role) throw customError('Este Rol no existe');
      return role;
    } catch (err) {
      throw customError(err?.message);
    }
  }

  async update(id: number, rolDto: RolDto) {
    try {
      await this.roleRepository.update(id, { nombre: rolDto.nombre });
      await this.permissionService.bulkUpdate(rolDto.permisos, id);
      return await this.findOne(id);
    } catch (err) {
      throw customError(err?.message);
    }
  }

  async remove(id: number) {
    await this.roleRepository.update(id, { _isActive: false });
    return customOk('Rol eliminado exitosamente');
  }

  generateRolesQueryBuilder() {
    const queryBuilder = this.roleRepository.createQueryBuilder('rol');
    queryBuilder.leftJoinAndSelect('rol.usuarios', 'usuario');
    queryBuilder.leftJoinAndSelect(
      'rol.permisos',
      'permiso',
      'permiso._isActive = :isActive',
      {
        isActive: true,
      },
    );
    queryBuilder.leftJoinAndSelect('permiso.modulo', 'modulo');
    return queryBuilder;
  }
}
