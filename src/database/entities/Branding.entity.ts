import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Branding {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  logo: string;

  @Column()
  primaryColorBtn: string;

  @Column()
  primaryColorText: string;
}
