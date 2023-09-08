export type Logger = {
	log(level: 'info' | 'error', message: string, metadata?: Record<string, any>): void;
};
