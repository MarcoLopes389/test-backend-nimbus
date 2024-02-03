import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Alert {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  damage: number;

  @Column()
  event: string;

  @Column()
  date: string;
}
