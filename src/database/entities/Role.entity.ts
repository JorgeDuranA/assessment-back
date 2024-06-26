import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModuleAclRoles } from './ModuleAclRoles.entity';
import { UserEntity } from './User.entity';

@Index('role_index_key', ['id'], { unique: true })
@Entity('c_role', { schema: 'catalogs' })
export class Role extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('character varying', { name: 'role' })
  role!: string;

  @Column('character varying', { name: 'level' })
  level!: string;

  @Column('character varying', { name: 'description' })
  description!: string;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active!: boolean;

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

  @ManyToMany(() => UserEntity, (userEntity) => userEntity.roles)
  @JoinTable({
    name: 'users_roles',
    schema: 'public',
    joinColumn: { name: 'id_role' },
    inverseJoinColumn: { name: 'id_user' },
  })
  users!: UserEntity[];

  @OneToMany(() => ModuleAclRoles, (moduleAclRoles) => moduleAclRoles.idRole)
  moduleAclRoles!: ModuleAclRoles[];
}
