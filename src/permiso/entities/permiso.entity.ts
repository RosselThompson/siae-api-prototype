import { BaseEntity } from 'src/common/entities/base.entity';
import { Modulo } from 'src/modulo/entities/modulo.entity';
import { Rol } from 'src/rol/entities/rol.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity('Permiso')
export class Permiso extends BaseEntity {
  @Column()
  mostrar: boolean;

  @Column()
  guardar: boolean;

  @Column()
  editar: boolean;

  @Column()
  eliminar: boolean;

  @ManyToOne(() => Modulo, (modulo) => modulo.permisos)
  @JoinColumn()
  modulo: Modulo;

  @ManyToOne(() => Rol, (rol) => rol.permisos)
  @JoinColumn()
  rol: Rol;
}
