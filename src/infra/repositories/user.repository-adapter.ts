
import {type User} from '../../application/entities/user';
import {type UserRepository} from '../../application/protocols/user.repository';
import {Dynamodb} from './dynamodb';

export class UserRepositoryAdapter extends Dynamodb implements UserRepository {
	async create(data: User): Promise<User> {
		return super.create(data) as Promise<User>;
	}
}
