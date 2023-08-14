import {
  Column,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @CreateDateColumn()
  _createdAt!: Date;

  @UpdateDateColumn()
  _updatedAt!: Date;

  @Column({ default: true })
  _isActive!: boolean;
}
