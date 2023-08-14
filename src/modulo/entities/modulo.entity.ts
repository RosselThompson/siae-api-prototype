import { Entity, Column, OneToMany, JoinColumn } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Permiso } from 'src/permiso/entities/permiso.entity';

@Entity('Modulo')
export class Modulo extends BaseEntity {
  @Column()
  nombre!: string;

  @Column()
  link!: string;

  @Column()
  icono: string;

  @Column()
  orden: number;

  @OneToMany(() => Permiso, (permiso) => permiso.modulo, {
    cascade: true,
  })
  @JoinColumn()
  permisos: Permiso[];
}
