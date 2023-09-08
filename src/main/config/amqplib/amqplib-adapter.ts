import amqplib from 'amqplib';

class AmqplibAdapter {
	connection: amqplib.Connection | undefined;
	channels: {
		publisher: amqplib.Channel | undefined; consumer: amqplib.Channel | undefined;
	} = {publisher: undefined, consumer: undefined};

	async startConnection() {
		this.connection = await amqplib.connect('amqp://admin:admin@127.0.0.1:5672');
	}

	async createChannels() {
		this.channels.publisher = await this.connection!.createChannel();
		this.channels.consumer = await this.connection!.createChannel();
	}

	async createExchange() {
		await this.channels.publisher!.assertExchange('development-exchange', 'fanout');
	}

	async createQueues() {
		await this.channels.publisher!.assertQueue('send-confirmation-account-email');
		await this.channels.publisher!.bindQueue('send-confirmation-account-email', 'development-exchange', '');
	}
}

export const amqplibAdapter = new AmqplibAdapter();
