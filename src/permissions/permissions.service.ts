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
    if (!role.id) throw customError('This role does not exist');

    const menuItem = await this.menuItemRepository.findOneBy({
      id: permissionDto.menuItemId,
    });
    if (!menuItem.id) throw customError('This menu item does not exist');

    return await this.permissionRepository.save(permissionDto);
  }

  findAll() {
    return `This action returns all permissions`;
  }

  findOne(id: string) {
    return `This action returns a #${id} permission`;
  }

  update(id: string, updatePermissionDto: PermissionDto) {
    return `This action updates a #${id} permission`;
  }

  remove(id: number) {
    return `This action removes a #${id} permission`;
  }
}