import {type Logger} from '../protocols/logger';

export class LoggerMock implements Logger {
	// eslint-disable-next-line @typescript-eslint/no-empty-function
	log(level: 'info' | 'error', message: string, metadata?: Record<string, any> | undefined): void {}
}
