
import {type Account} from '../../application/entities/account';
import {type AccountRepository} from '../../application/protocols/account.repository';
import {Dynamodb} from './dynamodb';

export class AccountRepositoryAdapter extends Dynamodb implements AccountRepository {
	async create(data: Account): Promise<Account> {
		return super.create(data) as Promise<Account>;
	}
}
