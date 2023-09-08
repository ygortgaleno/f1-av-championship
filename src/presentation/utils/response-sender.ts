import {type Response} from '../protocols/response';

// eslint-disable-next-line @typescript-eslint/no-extraneous-class
export class ResponseSender {
	static accepted(): Response {
		return {
			statusCode: 202,
		};
	}

	static internalServerError(): Response {
		return {
			statusCode: 500,
			body: {message: 'Internal Server Error'},
		};
	}
}
