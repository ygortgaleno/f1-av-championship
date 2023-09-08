import * as bcrypt from 'bcrypt';

export class Account {
	readonly identifier: string;
	readonly email: string;
	readonly password: string;
	readonly confirmed: boolean;

	constructor(data: Pick<Account, 'identifier' | 'email' | 'confirmed' | 'password'>) {
		this.identifier = data.identifier;
		this.email = data.email;
		this.confirmed = data.confirmed;
		this.password = this.hashPassword(data.password);
	}

	private get saltRounds() {
		return 10;
	}

	private hashPassword(password: string) {
		return bcrypt.hashSync(password, this.saltRounds);
	}
}
