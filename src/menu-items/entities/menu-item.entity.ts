import { Entity, Column } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract.entity';

@Entity()
export class MenuItem extends AbstractEntity {
  @Column()
  name!: string;

  @Column()
  to!: string;

  @Column()
  icon: string;

  @Column()
  order: number;
}
