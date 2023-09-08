import type amqplib from 'amqplib';
import {type Service} from '../../application/protocols/service';

export class RabbitmqConsumerAdapter {
	constructor(
		private readonly service: Service<unknown, unknown>,
		private readonly channel: amqplib.Channel,
	) {}

	async startConsumer(queueName: string) {
		// eslint-disable-next-line @typescript-eslint/ban-types
		return this.channel.consume(queueName, async (msg: amqplib.ConsumeMessage | null) => {
			if (msg) {
				await this.service.call(JSON.parse(msg.content.toString()));
				this.channel.ack(msg);
			}
		});
	}
}
