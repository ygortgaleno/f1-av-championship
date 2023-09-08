import {type Account} from '../entities/account';
import {type AccountRepository} from '../protocols/account.repository';

export class AccountRepositoryMock implements AccountRepository {
	async create(payload: Account): Promise<Account> {
		return payload;
	}
}
