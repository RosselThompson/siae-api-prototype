import { Carrera } from 'src/carrera/entities/carrera.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Recinto } from 'src/recinto/entities/recinto.entity';
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne } from 'typeorm';

@Entity('Facultad')
export class Facultad extends BaseEntity {
  @Column()
  nombre!: string;

  @Column()
  tipo!: string;

  @Column()
  codigo: string;

  @Column()
  siglas: string;

  @ManyToOne(() => Recinto, (recinto) => recinto.facultades)
  @JoinColumn()
  recinto: Recinto;

  @ManyToMany(() => Carrera, (carrera) => carrera.facultades)
  carreras: Carrera[];
}
