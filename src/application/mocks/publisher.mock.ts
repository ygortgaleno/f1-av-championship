import {type Publisher} from '../protocols/publisher';

export class PublisherMock implements Publisher {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	publish(queueName: string, message: Record<string, any>): void {}
}
