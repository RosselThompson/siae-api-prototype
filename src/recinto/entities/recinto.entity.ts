import { Column, Entity, JoinColumn, OneToMany } from 'typeorm';
import { BaseEntity } from 'src/common/entities/base.entity';
import { Facultad } from 'src/facultad/entities/facultad.entity';

@Entity('Recinto')
export class Recinto extends BaseEntity {
  @Column()
  nombre!: string;

  @Column()
  siglas: string;

  @OneToMany(() => Facultad, (facultad) => facultad.recinto, {
    cascade: true,
  })
  @JoinColumn()
  facultades: Facultad[];
}
