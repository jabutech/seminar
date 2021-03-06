import { User } from 'src/users/entity/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Seminar extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  judul: string;

  @Column({ type: 'date' })
  jadwal_seminar: string;

  @Column()
  maksimal_peserta: number;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  //   Relation Many To One with table user
  @ManyToOne(() => User, (user) => user.seminar)
  user: User;
}
