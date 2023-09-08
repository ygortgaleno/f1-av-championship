export type Publisher = {
	publish(routingKey: string, message: Record<string, any>): void;
};
