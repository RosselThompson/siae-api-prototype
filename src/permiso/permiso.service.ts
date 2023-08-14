import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { customError } from 'src/common/helpers/customResponse';
import { Permiso } from './entities/permiso.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Modulo } from 'src/modulo/entities/modulo.entity';
import { PermisoDto } from './dto/permiso.dto';

@Injectable()
export class PermisoService {
  constructor(
    @InjectRepository(Permiso)
    private permissionRepository: Repository<Permiso>,

    @InjectRepository(Rol)
    private roleRepository: Repository<Rol>,

    @InjectRepository(Modulo)
    private moduleRepository: Repository<Modulo>,
  ) {}

  async create(permissionDto: PermisoDto) {
    const rol = await this.roleRepository.findOneBy({
      id: permissionDto.rolId,
    });
    if (!rol) throw customError('Este rol no existe');

    const modulo = await this.moduleRepository.findOneBy({
      id: permissionDto.moduloId,
    });
    if (!modulo) throw customError('Este módulo no existe');

    return await this.permissionRepository.save({
      ...permissionDto,
      rol,
      modulo,
    });
  }

  async partialUpdate(id: number, permissionDto: PermisoDto) {
    return await this.permissionRepository.update(id, {
      mostrar: permissionDto.mostrar,
      guardar: permissionDto.guardar,
      editar: permissionDto.editar,
      eliminar: permissionDto.eliminar,
    });
  }

  async remove(id: number) {
    return await this.permissionRepository.update(id, { _isActive: false });
  }

  async bulkUpdate(permissions: PermisoDto[], roleId: number) {
    try {
      const permissionsQueryBuilder =
        this.permissionRepository.createQueryBuilder('permiso');

      const currentPermissions = await permissionsQueryBuilder
        .where('rolId = :rolId', { rolId: roleId })
        .andWhere('_isActive = :isActive', { isActive: true })
        .getMany();

      const currentPermissionIds = currentPermissions.map((cp) => cp.id);
      const permissionIds = permissions.map((p) => p.id);
      const permissionIdsToBeRemoved = currentPermissionIds.filter(
        (id) => !permissionIds.includes(id),
      );

      await Promise.all(
        permissions.map(async (p) => {
          const permissionObj: PermisoDto = {
            mostrar: p.mostrar,
            guardar: p.guardar,
            editar: p.editar,
            eliminar: p.eliminar,
            rolId: roleId,
            moduloId: p.moduloId,
          };
          if (!p.id) return await this.create(permissionObj);
          return await this.partialUpdate(p.id, permissionObj);
        }),
      );

      if (permissionIdsToBeRemoved.length > 0) {
        await Promise.all(
          permissionIdsToBeRemoved.map(async (pi) => await this.remove(pi)),
        );
      }

      return 'Permisos actualizados';
    } catch (err) {
      throw customError(err?.message);
    }
  }
}
