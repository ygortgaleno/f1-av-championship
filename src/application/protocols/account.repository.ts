import {type Account} from '../entities/account';

export type AccountRepository = {
	create(data: Account): Promise<Account>;
};
