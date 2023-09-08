import {type User} from '../entities/user';
import {type UserRepository} from '../protocols/user.repository';

export class UserRepositoryMock implements UserRepository {
	async create(payload: User): Promise<User> {
		return payload;
	}
}
