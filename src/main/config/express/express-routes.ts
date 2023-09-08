import type {Express} from 'express';
import {ExpressControllerAdapter} from '../../adapters/express-controller.adapter';
import {CreateAccountControllerFactory} from '../../factories/controllers/create-account-controller.factory';

export class ExpressRoutes {
	private readonly expressControllerAdapter = new ExpressControllerAdapter();

	set(server: Express) {
		server.route('/account').post(this.controllers.createAccountController);
	}

	private get controllers() {
		const createAccountController = new CreateAccountControllerFactory().create();

		return {
			createAccountController: this.expressControllerAdapter.adapt(createAccountController),
		};
	}
}
