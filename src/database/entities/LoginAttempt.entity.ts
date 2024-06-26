import {
  BaseEntity,
  Column,
  Entity,
  Index,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserEntity } from './User.entity';

@Index('login_attempts_index_key', ['id'], { unique: true })
@Entity('login_attempts', { schema: 'public' })
export class LoginAttemptEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('timestamp', { name: 'time_login' })
  timeLogin!: Date;

  @Column('character varying', { name: 'ip' })
  ip!: string;

  @Column('timestamp', { name: 'time_logout', nullable: true })
  timeLogout!: Date;

  @Column('character varying', { name: 'login_attempt' })
  loginAttempt!: string;

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

  @ManyToOne(() => UserEntity, (userEntity) => userEntity.loginAttempts)
  @JoinColumn([{ name: 'user_id', referencedColumnName: 'id' }])
  userId!: UserEntity;
}
