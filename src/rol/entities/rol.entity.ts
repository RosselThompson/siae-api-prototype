import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Usuario } from 'src/usuario/entities/usuario.entity';
import { Permiso } from 'src/permiso/entities/permiso.entity';

@Entity('Rol')
export class Rol extends BaseEntity {
  @Column()
  nombre!: string;

  @OneToMany(() => Usuario, (usuario) => usuario.rol, { cascade: true })
  @JoinColumn()
  usuarios: Usuario[];

  @OneToMany(() => Permiso, (permiso) => permiso.rol, {
    cascade: true,
  })
  @JoinColumn()
  permisos: Permiso[];
}
