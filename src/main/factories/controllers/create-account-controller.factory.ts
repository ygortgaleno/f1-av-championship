import {ConsoleLoggerAdapter} from '../../../infra/libs/console.logger-adapter';
import {CreateAccountController} from '../../../presentation/controllers/create-account.controller';
import type {Factory} from '../factory';
import {CreateAccountServiceFactory} from '../services/create-account-service.factory';

export class CreateAccountControllerFactory implements Factory<CreateAccountController> {
	create(): CreateAccountController {
		return new CreateAccountController(
			new CreateAccountServiceFactory().create(),
			new ConsoleLoggerAdapter(),
		);
	}
}
