import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

@Entity('menuItem')
export class MenuItem extends AbstractEntity {
  @Column()
  name!: string;

  @Column()
  to!: string;

  @Column()
  icon: string;

  @Column()
  order: number;

  @OneToMany(() => Permission, (permission) => permission.menuItem, {
    cascade: true,
  })
  @JoinColumn()
  permissions: Permission[];
}
