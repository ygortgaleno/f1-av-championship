import {CreateAccountService} from '../../../application/services/create-account.service';
import {amqplibAdapter} from '../../config/amqplib/amqplib-adapter';
import {RabbitmqPublisherAdapter} from '../../../infra/rabbitmq/rabbitmq.publisher-adapter';
import {AccountRepositoryAdapter} from '../../../infra/repositories/account.repository-adapter';
import {RelationRepositoryAdapter} from '../../../infra/repositories/relation.repository-adapter';
import {UserRepositoryAdapter} from '../../../infra/repositories/user.repository-adapter';
import type {Factory} from '../factory';

export class CreateAccountServiceFactory implements Factory<CreateAccountService> {
	create(): CreateAccountService {
		return new CreateAccountService(
			new AccountRepositoryAdapter(),
			new UserRepositoryAdapter(),
			new RelationRepositoryAdapter(),
			new RabbitmqPublisherAdapter(amqplibAdapter.channels.publisher!),
		);
	}
}
