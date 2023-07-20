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

  async update(id: string, permissionDto: PermissionDto) {
    const currentPermission = await this.permissionRepository.findOneBy({ id });
    if (!currentPermission) throw customError('This permission does not exist');

    const menuItem = await this.menuItemRepository.findOneBy({
      id: permissionDto.menuItemId,
    });
    if (!menuItem) throw customError('This menu item does not exist');

    this.permissionRepository.update(currentPermission.id, {
      ...permissionDto,
      menuItem,
    });

    return await this.permissionRepository.findOne({
      where: { id: currentPermission.id },
      relations: {
        menuItem: true,
        role: true,
      },
    });
  }
}
