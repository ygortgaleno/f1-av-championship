export class Relation {
	readonly identifier: string;
	readonly from: string;
	readonly to: string;
	readonly metadata?: string;

	constructor(data: Relation) {
		this.identifier = data.identifier;
		this.from = data.from;
		this.to = data.to;
		this.metadata = data.metadata;
	}
}
