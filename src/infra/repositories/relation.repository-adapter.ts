
import {type Relation} from '../../application/entities/relation';
import {type RelationRepository} from '../../application/protocols/relation.repository';
import {Dynamodb} from './dynamodb';

export class RelationRepositoryAdapter extends Dynamodb implements RelationRepository {
	async create(data: Relation): Promise<Relation> {
		return super.create(data) as Promise<Relation>;
	}
}
