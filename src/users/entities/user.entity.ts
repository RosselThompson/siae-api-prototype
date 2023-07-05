import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract.entity';
import { Role } from 'src/roles/entities/role.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  hasHashPassword: boolean;

  @ManyToOne(() => Role, (role) => role.users)
  @JoinColumn()
  role: Role;
}
