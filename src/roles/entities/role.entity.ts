import { Column, Entity } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract.entity';

@Entity()
export class Role extends AbstractEntity {
  @Column()
  name!: string;
}
