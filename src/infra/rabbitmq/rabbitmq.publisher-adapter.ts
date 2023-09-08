import {type Publisher} from '../../application/protocols/publisher';
import type amqplib from 'amqplib';

export class RabbitmqPublisherAdapter implements Publisher {
	constructor(private readonly channel: amqplib.Channel) {}

	publish(routingKey: string, message: Record<string, any>): void {
		this.channel.publish(
			process.env.RABBITMQ_EXCHANGE ?? 'development-exchange',
			routingKey,
			Buffer.from(JSON.stringify(message)),
		);
	}
}
