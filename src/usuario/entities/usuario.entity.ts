import { Entity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { UserBaseEntity } from 'src/common/entities/user-base.entity';
import { Rol } from 'src/rol/entities/rol.entity';

@Entity('Usuario')
export class Usuario extends UserBaseEntity {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column({ default: true })
  hashPassword: boolean;

  @ManyToOne(() => Rol, (rol) => rol.usuarios)
  @JoinColumn()
  rol: Rol;
}
