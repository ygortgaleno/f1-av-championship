/* eslint-disable max-nested-callbacks */
import {type CreateAccountDto} from '../dtos/create-account.dto';
import {AccountRepositoryMock} from '../mocks/account.repository.mock';
import {PublisherMock} from '../mocks/publisher.mock';
import {RelationRepositoryMock} from '../mocks/relation.repository.mock';
import {UserRepositoryMock} from '../mocks/user.repository.mock';
import {CreateAccountService} from './create-account.service';
import crypto from 'crypto';
import * as bcrypt from 'bcrypt';

jest.mock('bcrypt', () => ({
	hashSync: jest.fn(),
}));

describe('CreateAccountService', () => {
	const accountRepositoryMock = new AccountRepositoryMock();
	const userRepositoryMock = new UserRepositoryMock();
	const relationRepositoryMock = new RelationRepositoryMock();
	const publisherMock = new PublisherMock();

	const sut = new CreateAccountService(
		accountRepositoryMock, userRepositoryMock, relationRepositoryMock, publisherMock,
	);

	describe('on sucess', () => {
		const identifier = 'test-test-test-test-test';
		const passHash = 'hash';
		const payload: CreateAccountDto = {
			email: 'test@test.com',
			name: 'test',
			lastName: 'lastTest',
			password: '123',
		};

		beforeAll(() => {
			jest.spyOn(accountRepositoryMock, 'create');
			jest.spyOn(userRepositoryMock, 'create');
			jest.spyOn(relationRepositoryMock, 'create');
			jest.spyOn(publisherMock, 'publish');
			jest.spyOn(crypto, 'randomUUID').mockReturnValue(identifier);
			jest.spyOn(bcrypt, 'hashSync').mockImplementationOnce(() => passHash);
		});

		afterAll(() => {
			jest.clearAllMocks();
		});

		it('should return nothing', async () => {
			await expect(sut.call(payload)).resolves.toBeUndefined();
		});

		it('should accountRepository be called with correct values', () => {
			expect(accountRepositoryMock.create).toBeCalledWith({
				identifier: `account#${identifier}`,
				email: payload.email,
				password: passHash,
				confirmed: false,
			});
		});

		it('should userRepository be called with correct values', () => {
			expect(userRepositoryMock.create).toBeCalledWith({
				identifier: `user#${identifier}`,
				name: payload.name,
				lastName: payload.lastName,
			});
		});

		it('should relationRepository be called with correct values', () => {
			expect(relationRepositoryMock.create).toBeCalledWith({
				identifier: `relation#${identifier}`,
				from: `account#${identifier}`,
				to: `user#${identifier}`,
			});
		});

		it('should publisher be called with correct values', () => {
			expect(publisherMock.publish).toBeCalledWith(
				'send-confirmation-account-email', {
					identifier: `account#${identifier}`,
					email: payload.email,
					password: passHash,
					confirmed: false,
				},
			);
		});
	});

	describe('on failure', () => {
		const passHash = 'hash';

		describe('when accountRepository throws', () => {
			const identifier = 'test-test-test-test-test';
			const payload: CreateAccountDto = {
				email: 'test@test.com',
				name: 'test',
				lastName: 'lastTest',
				password: '123',
			};

			beforeAll(() => {
				jest.spyOn(accountRepositoryMock, 'create').mockRejectedValueOnce(new Error());
				jest.spyOn(userRepositoryMock, 'create');
				jest.spyOn(relationRepositoryMock, 'create');
				jest.spyOn(publisherMock, 'publish');
				jest.spyOn(crypto, 'randomUUID').mockReturnValue(identifier);
				jest.spyOn(bcrypt, 'hashSync').mockImplementationOnce(() => passHash);
			});

			afterAll(() => {
				jest.clearAllMocks();
			});

			it('should throw error', async () => {
				await expect(sut.call(payload)).rejects.toThrowError();
			});

			it('should accountRepository be called with correct values', () => {
				expect(accountRepositoryMock.create).toBeCalledWith({
					identifier: `account#${identifier}`,
					email: payload.email,
					password: passHash,
					confirmed: false,
				});
			});

			it('should userRepository not be called', () => {
				expect(userRepositoryMock.create).not.toHaveBeenCalled();
			});

			it('should relationRepository not be called', () => {
				expect(relationRepositoryMock.create).not.toHaveBeenCalled();
			});
		});

		describe('when userRepository throws', () => {
			const identifier = 'test-test-test-test-test';
			const payload: CreateAccountDto = {
				email: 'test@test.com',
				name: 'test',
				lastName: 'lastTest',
				password: '123',
			};

			beforeAll(() => {
				jest.spyOn(accountRepositoryMock, 'create');
				jest.spyOn(userRepositoryMock, 'create').mockRejectedValueOnce(new Error());
				jest.spyOn(relationRepositoryMock, 'create');
				jest.spyOn(publisherMock, 'publish');
				jest.spyOn(crypto, 'randomUUID').mockReturnValue(identifier);
				jest.spyOn(bcrypt, 'hashSync').mockImplementationOnce(() => passHash);
			});

			afterAll(() => {
				jest.clearAllMocks();
			});

			it('should throw error', async () => {
				await expect(sut.call(payload)).rejects.toThrowError();
			});

			it('should accountRepository be called with correct values', () => {
				expect(accountRepositoryMock.create).toBeCalledWith({
					identifier: `account#${identifier}`,
					email: payload.email,
					password: passHash,
					confirmed: false,
				});
			});

			it('should userRepository be called with correct values', () => {
				expect(userRepositoryMock.create).toBeCalledWith({
					identifier: `user#${identifier}`,
					name: payload.name,
					lastName: payload.lastName,
				});
			});

			it('should relationRepository not be called', () => {
				expect(relationRepositoryMock.create).not.toHaveBeenCalled();
			});
		});

		describe('when relationRepository throws', () => {
			const identifier = 'test-test-test-test-test';
			const payload: CreateAccountDto = {
				email: 'test@test.com',
				name: 'test',
				lastName: 'lastTest',
				password: '123',
			};

			beforeAll(() => {
				jest.spyOn(accountRepositoryMock, 'create');
				jest.spyOn(userRepositoryMock, 'create');
				jest.spyOn(relationRepositoryMock, 'create').mockRejectedValueOnce(new Error());
				jest.spyOn(publisherMock, 'publish');
				jest.spyOn(crypto, 'randomUUID').mockReturnValue(identifier);
				jest.spyOn(bcrypt, 'hashSync').mockImplementationOnce(() => passHash);
			});

			afterAll(() => {
				jest.clearAllMocks();
			});

			it('should throw error', async () => {
				await expect(sut.call(payload)).rejects.toThrowError();
			});

			it('should accountRepository be called with correct values', () => {
				expect(accountRepositoryMock.create).toBeCalledWith({
					identifier: `account#${identifier}`,
					email: payload.email,
					password: passHash,
					confirmed: false,
				});
			});

			it('should userRepository be called with correct values', () => {
				expect(userRepositoryMock.create).toBeCalledWith({
					identifier: `user#${identifier}`,
					name: payload.name,
					lastName: payload.lastName,
				});
			});

			it('should relationRepository not be called', () => {
				expect(relationRepositoryMock.create).toBeCalledWith({
					identifier: `relation#${identifier}`,
					from: `account#${identifier}`,
					to: `user#${identifier}`,
				});
			});
		});
	});
});
