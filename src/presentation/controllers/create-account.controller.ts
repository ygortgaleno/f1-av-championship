import {type Controller} from '../protocols/controller';
import {type Logger} from '../protocols/logger';
import {type Request} from '../protocols/request';
import {type Response} from '../protocols/response';
import {ResponseSender} from '../utils/response-sender';
import {type CreateAccountService} from '../../application/services/create-account.service';
import {type CreateAccountDto} from '../../application/dtos/create-account.dto';

export class CreateAccountController implements Controller {
	constructor(
		private readonly createAccountService: CreateAccountService,
		private readonly logger: Logger,
	) {}

	async handle(payload: Request): Promise<Response> {
		try {
			await this.createAccountService.call(payload.body as CreateAccountDto);
			return ResponseSender.accepted();
		} catch (error) {
			this.logger.log('error', 'Unhandled error in create-account.controller', {error});
			return ResponseSender.internalServerError();
		}
	}
}
