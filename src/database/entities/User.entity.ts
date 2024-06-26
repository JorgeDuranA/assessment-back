import {
  BaseEntity,
  Column,
  Entity,
  Index,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { LoginAttemptEntity } from './LoginAttempt.entity';
import { Role } from './Role.entity';

@Entity('users', { schema: 'public' })
@Index('user_index_key', ['id'], { unique: true })
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('character varying', { name: 'name', nullable: true })
  name!: string;

  @Column('character varying', { name: 'area_code', nullable: true })
  areaCode!: string;

  @Column('character varying', { name: 'phone', nullable: true })
  phone!: string;

  @Column('character varying', { name: 'surname', nullable: true })
  surname!: string;

  @Column('character varying', { name: 'username', nullable: true })
  username!: string;

  @Column('character varying', { name: 'second_surname', nullable: true })
  secondSurname!: string;

  @Column('character varying', { name: 'email' })
  email!: string;

  @Column('character varying', { name: 'password' })
  password!: string;

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

  @Column('boolean', { name: 'status', default: () => 'true' })
  status!: boolean;

  @Column('boolean', { name: 'is_deleted', default: () => 'false' })
  isDeleted!: boolean;

  @ManyToMany(() => Role, (RoleEntity) => RoleEntity.users)
  roles!: Role[];

  @OneToMany(
    () => LoginAttemptEntity,
    (loginAttemptEntity) => loginAttemptEntity.userId,
  )
  loginAttempts!: LoginAttemptEntity[];
}
