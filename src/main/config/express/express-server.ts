import express from 'express';
import {ExpressGlobalMiddlewares} from './express-global-middlewares';
import {ExpressRoutes} from './express-routes';
import {ConsoleLoggerAdapter} from '../../../infra/libs/console.logger-adapter';

export class ExpressServer {
	private readonly expressGlobalMiddlewares = new ExpressGlobalMiddlewares();
	private readonly expressRoutes = new ExpressRoutes();
	private readonly server = express();
	private readonly logger = new ConsoleLoggerAdapter();

	async start() {
		this.expressGlobalMiddlewares.set(this.server);
		this.expressRoutes.set(this.server);
		const port = 3000;
		this.server.listen(port, () => {
			this.logger.log('info', `Server started on ${port}`);
		});
	}
}
