import {
  BaseEntity,
  Column,
  Entity,
  Index,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Index('log_otp_index_key', ['id'], { unique: true })
@Entity('log_otp', { schema: 'public' })
export class LogOtpEntity extends BaseEntity {
  @PrimaryGeneratedColumn({ type: 'integer', name: 'id' })
  id!: number;

  @Column('character varying', { name: 'otp' })
  otp!: string;

  @Column('timestamptz', { name: 'otp_expires_on' })
  otpExpiresOn!: Date;

  @Column('character varying', { name: 'email', nullable: true })
  email!: string;

  @Column('character varying', { name: 'token', nullable: true })
  token!: string;

  @Column('boolean', { name: 'active', default: () => 'true' })
  active!: boolean;

  @Column('timestamptz', {
    name: 'created_at',
    default: () => 'now()',
  })
  createdAt!: Date;

  @Column('timestamptz', {
    name: 'updated_at',
    default: () => 'now()',
  })
  updatedAt!: Date;
}
