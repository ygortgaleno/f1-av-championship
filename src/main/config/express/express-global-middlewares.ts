import type {Express} from 'express';
import {json as expressJson} from 'express';

export class ExpressGlobalMiddlewares {
	set(server: Express) {
		server.use(expressJson({type: '*/*'}));
	}
}
