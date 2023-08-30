import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Facultad } from 'src/facultad/entities/facultad.entity';

@Entity('Carrera')
export class Carrera extends BaseEntity {
  @Column()
  nombre!: string;

  @ManyToOne(() => Facultad, (facultad) => facultad.carreras)
  @JoinColumn()
  facultad: Facultad;
}
