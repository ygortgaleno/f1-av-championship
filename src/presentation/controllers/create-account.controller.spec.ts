import {LoggerMock} from '../mocks/logger.mock';
import {PublisherMock} from '../../application/mocks/publisher.mock';
import {type Request} from '../protocols/request';
import {ResponseSender} from '../utils/response-sender';
import {CreateAccountController} from './create-account.controller';
import {AccountRepositoryMock} from '../../application/mocks/account.repository.mock';
import {UserRepositoryMock} from '../../application/mocks/user.repository.mock';
import {RelationRepositoryMock} from '../../application/mocks/relation.repository.mock';
import {CreateAccountService} from '../../application/services/create-account.service';

describe('CreateUserController', () => {
	const accountRepositoryMock = new AccountRepositoryMock();
	const userRepositoryMock = new UserRepositoryMock();
	const relationRepositoryMock = new RelationRepositoryMock();
	const publisherMock = new PublisherMock();
	const createAccountService = new CreateAccountService(
		accountRepositoryMock, userRepositoryMock, relationRepositoryMock, publisherMock,
	);
	const loggerMock = new LoggerMock();
	const sut = new CreateAccountController(createAccountService, loggerMock);

	describe('on success', () => {
		beforeAll(() => {
			jest.spyOn(createAccountService, 'call');
			jest.spyOn(loggerMock, 'log');
		});

		afterAll(() => {
			jest.clearAllMocks();
		});

		const payload: Request = {
			body: {
				name: 'test',
				lastName: 'test',
				email: 'test@test.com',
				password: 'test',
			},
			headers: {},
			params: {},
		};

		it('should return 202', async () => {
			await expect(sut.handle(payload)).resolves.toEqual(ResponseSender.accepted());
		});

		it('should call publihser with correct values', () => {
			expect(createAccountService.call).toHaveBeenCalledWith(payload.body);
		});

		it('should not call logger', () => {
			expect(loggerMock.log).not.toHaveBeenCalled();
		});
	});

	describe('on error', () => {
		describe('when createAccountService throws', () => {
			const error = new Error();

			beforeAll(() => {
				jest.spyOn(createAccountService, 'call').mockRejectedValueOnce(new Error());
				jest.spyOn(loggerMock, 'log');
			});

			afterAll(() => {
				jest.clearAllMocks();
			});

			const payload: Request = {
				body: {},
				headers: {},
				params: {},
			};

			it('should return 500', async () => {
				await expect(
					sut.handle(payload),
				).resolves.toEqual(ResponseSender.internalServerError());
			});

			it('should call publisher with correct values', () => {
				expect(createAccountService.call).toHaveBeenCalledWith(payload.body);
			});

			it('should call logger with correct values', () => {
				expect(loggerMock.log).toHaveBeenCalledWith('error', 'Unhandled error in create-account.controller', {error});
			});
		});
	});
});
