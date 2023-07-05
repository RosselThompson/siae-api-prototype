import { Entity, Column } from 'typeorm';
import { AbstractEntity } from 'src/common/entities/abstract.entity';

@Entity()
export class User extends AbstractEntity {
  @Column({ unique: true })
  email!: string;

  @Column()
  password!: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({ default: true })
  hasHashPassword: boolean;
}
