import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Facultad } from 'src/facultad/entities/facultad.entity';

@Entity('Carrera')
export class Carrera extends BaseEntity {
  @Column()
  nombre!: string;

  @ManyToMany(() => Facultad, (facultad) => facultad.carreras)
  @JoinTable()
  facultades: Facultad[];
}
