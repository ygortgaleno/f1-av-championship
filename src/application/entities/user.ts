export class User {
	readonly identifier: string;
	readonly name: string;
	readonly lastName: string;

	constructor(data: User) {
		this.identifier = data.identifier;
		this.name = data.name;
		this.lastName = data.lastName;
	}
}
