import { Carrera } from 'src/carrera/entities/carrera.entity';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Recinto } from 'src/recinto/entities/recinto.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

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

  @OneToMany(() => Carrera, (carrera) => carrera.facultad, {
    cascade: true,
  })
  @JoinColumn()
  carreras: Carrera[];
}
