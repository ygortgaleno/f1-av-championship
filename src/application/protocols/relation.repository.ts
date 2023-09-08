import {type Relation} from '../entities/relation';

export type RelationRepository = {
	create(data: Relation): Promise<Relation>;
};
