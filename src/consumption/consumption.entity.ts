import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity()
export class ConsumptionRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: string;

  @Column('decimal', { precision: 5, scale: 2 })
  waterUsage: number;

  @CreateDateColumn()
  date: Date;
}
