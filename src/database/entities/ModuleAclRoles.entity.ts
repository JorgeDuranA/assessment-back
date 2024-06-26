import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ModuleAcl } from './ModuleAcls.entity';
import { Role } from './Role.entity';

@Index('module_acl_roles_index_key', ['id'], { unique: true })
@Entity('module_acl_roles', { schema: 'public' })
export class ModuleAclRoles extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @ManyToOne(() => ModuleAcl, (moduleAclRoles) => moduleAclRoles.id)
  @JoinColumn([{ name: 'id_module_acl', referencedColumnName: 'id' }])
  idModuleAcl!: ModuleAcl;

  @ManyToOne(() => Role, (role) => role.id)
  @JoinColumn([{ name: 'id_role', referencedColumnName: 'id' }])
  idRole!: Role;

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
}
