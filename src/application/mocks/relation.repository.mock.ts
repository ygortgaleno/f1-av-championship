import {type Relation} from '../entities/relation';
import {type RelationRepository} from '../protocols/relation.repository';

export class RelationRepositoryMock implements RelationRepository {
	async create(payload: Relation): Promise<Relation> {
		return payload;
	}
}
