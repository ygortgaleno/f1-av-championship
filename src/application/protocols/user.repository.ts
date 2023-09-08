import {type User} from '../entities/user';

export type UserRepository = {
	create(data: User): Promise<User>;
};
