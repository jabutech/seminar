import { User } from 'src/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Seminar extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  judul: string;

  @Column()
  jadwal_seminar: Date;

  @Column()
  maksimal_peserta: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  //   Relation Many To One with table user
  @ManyToOne(() => User, (user) => user.seminar)
  user: User;
}
