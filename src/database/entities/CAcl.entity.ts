import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ModuleAcl } from './ModuleAcls.entity';

@Index('c_acl_index_key', ['id'], { unique: true })
@Entity('c_acl', { schema: 'catalogs' })
export class CAcl extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('character varying', { name: 'action_name', length: 100 })
  nameAction: string;

  @Column('character varying', { name: 'description', length: 200 })
  description: string;

  @Column('timestamp without time zone', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt!: Date;

  @Column('timestamp without time zone', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt!: Date;

  @OneToMany(() => ModuleAcl, (acl) => acl.idCAcl)
  acls!: ModuleAcl[];
}
