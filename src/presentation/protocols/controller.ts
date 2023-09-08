import {type Request} from './request';
import {type Response} from './response';

export type Controller = {
	handle(payload: Request): Promise<Response>;
};
