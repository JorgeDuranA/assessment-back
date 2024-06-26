import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CAcl } from './CAcl.entity';
import { CModules } from './CModules.entity';
import { ModuleAclRoles } from './ModuleAclRoles.entity';

@Index('module_acl_index_key', ['id'], { unique: true })
@Entity('module_acl', { schema: 'public' })
export class ModuleAcl extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

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

  @ManyToOne(() => CAcl, (acl) => acl.id)
  @JoinColumn([{ name: 'id_c_acl', referencedColumnName: 'id' }])
  idCAcl!: CAcl;

  @ManyToOne(() => CModules, (module) => module.id)
  @JoinColumn([{ name: 'id_c_module', referencedColumnName: 'id' }])
  idCModule!: CModules;

  @OneToMany(() => ModuleAclRoles, (moduleAcl) => moduleAcl.idModuleAcl)
  moduleAcls!: ModuleAclRoles[];
}
