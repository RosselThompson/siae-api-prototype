import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { User } from 'src/users/entities/user.entity';
import { Permission } from 'src/permissions/entities/permission.entity';

@Entity('role')
export class Role extends AbstractEntity {
  @Column()
  name!: string;

  @OneToMany(() => User, (user) => user.role, { cascade: true })
  @JoinColumn()
  users: User[];

  @OneToMany(() => Permission, (permission) => permission.role, {
    cascade: true,
  })
  @JoinColumn()
  permissions: Permission[];
}
