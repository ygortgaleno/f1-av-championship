import {type CreateAccountDto} from '../dtos/create-account.dto';
import {Account} from '../entities/account';
import {Relation} from '../entities/relation';
import {User} from '../entities/user';
import {type AccountRepository} from '../protocols/account.repository';
import {type Publisher} from '../protocols/publisher';
import {type RelationRepository} from '../protocols/relation.repository';
import {type Service} from '../protocols/service';
import {type UserRepository} from '../protocols/user.repository';
import crypto from 'crypto';

export class CreateAccountService implements Service<CreateAccountDto, void> {
	constructor(
		private readonly accountRepository: AccountRepository,
		private readonly userRepository: UserRepository,
		private readonly relationRepository: RelationRepository,
		private readonly publisher: Publisher,
	) {}

	async call(params: CreateAccountDto): Promise<void> {
		const account = new Account({
			identifier: `account#${crypto.randomUUID()}`,
			email: params.email,
			password: params.password,
			confirmed: false,
		});
		const user = new User({
			identifier: `user#${crypto.randomUUID()}`,
			name: params.name,
			lastName: params.lastName,
		});
		const relation = new Relation({
			identifier: `relation#${crypto.randomUUID()}`,
			from: account.identifier,
			to: user.identifier,
		});

		await this.accountRepository.create(account);
		await this.userRepository.create(user);
		await this.relationRepository.create(relation);

		this.publisher.publish('send-confirmation-account-email', {email: account.email, identifier: account.identifier});
	}
}
