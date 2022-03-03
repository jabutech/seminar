import { EntityRepository, Repository } from 'typeorm';
import { JoinSeminars } from './entity/join-seminar.entity';

@EntityRepository(JoinSeminars)
export class JoinSeminarsRepository extends Repository<JoinSeminars> {}
