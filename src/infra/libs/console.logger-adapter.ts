import {type Logger} from '../../presentation/protocols/logger';

export class ConsoleLoggerAdapter implements Logger {
	log(level: 'error' | 'info', message: string, metadata?: Record<string, any> | undefined): void {
		console[level](message, metadata);
	}
}
