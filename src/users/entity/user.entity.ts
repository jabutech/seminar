import {
  BaseEntity,
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
// Import bcrypt
import * as bcrypt from 'bcrypt';
import { Seminar } from 'src/seminar/entity/seminar.entity';
@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ nullable: true })
  token: string;

  @Column({ type: 'timestamp' })
  createdAt: Date;

  // Relation one to many with seminar
  @OneToMany(() => Seminar, (seminar) => seminar.user)
  seminar: Seminar[];

  //   Before insert data or update hash password
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    //   If password empty
    if (!this.password) {
      return;
    }
    // If password available run password hash
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
  }
}
