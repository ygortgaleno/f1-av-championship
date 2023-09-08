import type {Controller} from '../../presentation/protocols/controller';
import type {Request as ExpressRequest, Response as ExpressResponse} from 'express';

export class ExpressControllerAdapter {
	adapt(controller: Controller) {
		return async (req: ExpressRequest, res: ExpressResponse) => {
			const request = {
				body: req.body as Record<any, any>,
				params: req.params as Record<any, any>,
				headers: req.headers as Record<any, any>,
			};

			const response = await controller.handle(request);
			res.writeHead(response.statusCode, {
				'Content-Length': Buffer.byteLength(JSON.stringify(response.body) || ''),
				'Content-Type': 'application/json',
			}).end(JSON.stringify(response.body));
		};
	}
}
