import {amqplibAdapter} from './main/config/amqplib/amqplib-adapter';
import {ExpressServer} from './main/config/express/express-server';

const server = new ExpressServer();

(async () => {
	await amqplibAdapter.startConnection();
	await amqplibAdapter.createChannels();
	await amqplibAdapter.createExchange();
	await amqplibAdapter.createQueues();
	await server.start();
})();
