import { Injectable } from '@nestjs/common';
import { PermissionDto } from './dto/permission.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from 'src/roles/entities/role.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { customError } from 'src/common/helpers/customResponse';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionRepository: Repository<Permission>,

    @InjectRepository(Role)
    private roleRepository: Repository<Role>,

    @InjectRepository(MenuItem)
    private menuItemRepository: Repository<MenuItem>,
  ) {}

  async create(permissionDto: PermissionDto) {
    const role = await this.roleRepository.findOneBy({
      id: permissionDto.roleId,
    });
    if (!role) throw customError('This role does not exist');

    const menuItem = await this.menuItemRepository.findOneBy({
      id: permissionDto.menuItemId,
    });
    if (!menuItem) throw customError('This menu item does not exist');

    return await this.permissionRepository.save({
      ...permissionDto,
      role,
      menuItem,
    });
  }

  async partialUpdate(id: string, permissionDto: PermissionDto) {
    return await this.permissionRepository.update(id, {
      show: permissionDto.show,
      save: permissionDto.save,
      edit: permissionDto.edit,
      remove: permissionDto.remove,
    });
  }

  async remove(id: string) {
    return await this.permissionRepository.update(id, { isActive: false });
  }

  async bulkUpdate(permissions: PermissionDto[], roleId: string) {
    try {
      const permissionsQueryBuilder =
        this.permissionRepository.createQueryBuilder('permission');

      const currentPermissions = await permissionsQueryBuilder
        .where('roleId = :roleId', { roleId })
        .andWhere('isActive = :isActive', { isActive: true })
        .getMany();

      const currentPermissionIds = currentPermissions.map((cp) => cp.id);
      const permissionIds = permissions.map((p) => p.id);
      const permissionIdsToBeRemoved = currentPermissionIds.filter(
        (id) => !permissionIds.includes(id),
      );

      await Promise.all(
        permissions.map(async (p) => {
          const permissionObj: PermissionDto = {
            show: p.show,
            save: p.save,
            edit: p.edit,
            remove: p.remove,
            roleId: roleId,
            menuItemId: p.menuItemId,
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

      return 'Permissions updated';
    } catch (err) {
      throw customError(err?.message);
    }
  }
}
