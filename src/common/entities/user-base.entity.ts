import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class UserBaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @CreateDateColumn()
  _createdAt!: Date;

  @UpdateDateColumn()
  _updatedAt!: Date;

  @Column({ default: true })
  _isActive!: boolean;
}
