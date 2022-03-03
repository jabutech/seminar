import { EntityRepository, Repository } from 'typeorm';
import { Seminar } from './entity/seminar.entity';

@EntityRepository(Seminar)
export class SeminarsRepository extends Repository<Seminar> {}
