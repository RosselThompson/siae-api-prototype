import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { MenuItem } from 'src/menu-items/entities/menu-item.entity';
import { Role } from 'src/roles/entities/role.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('permission')
export class Permission extends AbstractEntity {
  @Column()
  show: boolean;

  @Column()
  save: boolean;

  @Column()
  edit: boolean;

  @Column()
  remove: boolean;

  @ManyToOne(() => MenuItem, (menuItem) => menuItem.permissions)
  @JoinColumn({ name: 'menuItemId', referencedColumnName: 'id' })
  menuItem: MenuItem;

  @ManyToOne(() => Role, (role) => role.permissions)
  @JoinColumn()
  role: Role;
}
