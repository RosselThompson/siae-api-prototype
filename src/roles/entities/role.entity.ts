import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { User } from 'src/users/entities/user.entity';

@Entity()
export class Role extends AbstractEntity {
  @Column()
  name!: string;

  @OneToMany(() => User, (user) => user.role, { cascade: true })
  @JoinColumn()
  users: User[];
}
