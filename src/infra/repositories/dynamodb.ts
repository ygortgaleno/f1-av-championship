/* eslint-disable @typescript-eslint/naming-convention */
import {DynamoDB} from '@aws-sdk/client-dynamodb';
import {DynamoDBDocument} from '@aws-sdk/lib-dynamodb';

export abstract class Dynamodb {
	protected readonly dynamoClient: DynamoDBDocument;

	constructor() {
		const client = new DynamoDB({endpoint: process.env.DYNAMODB_ENDPOINT ?? 'http://127.0.0.1:4566'});
		this.dynamoClient = DynamoDBDocument.from(client, {marshallOptions: {removeUndefinedValues: true}});
	}

	protected get tableName() {
		return 'f1-va-championship';
	}

	async create(data: Record<string, any>): Promise<unknown> {
		await this.dynamoClient.put({
			TableName: this.tableName,
			Item: {
				...data,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			},
		});
		return data;
	}
}
