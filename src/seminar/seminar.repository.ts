import { EntityRepository, Repository } from 'typeorm';
import { Seminar } from './entity/seminar.entity';

@EntityRepository(Seminar)
export class SeminarRepository extends Repository<Seminar> {
  // Create seminar
  async createSeminar(payloadSeminar);
}
