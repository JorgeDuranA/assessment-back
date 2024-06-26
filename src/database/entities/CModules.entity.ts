import {
  BaseEntity,
  Column,
  Entity,
  Index,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ModuleAcl } from './ModuleAcls.entity';

@Index('c_modules_index_key', ['id'], { unique: true })
@Entity('c_modules', { schema: 'catalogs' })
export class CModules extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('character varying', { name: 'name_module', length: 200 })
  nameModule: string;

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

  @OneToMany(() => ModuleAcl, (module) => module.idCModule)
  modules!: ModuleAcl[];
}
