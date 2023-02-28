import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { join } from 'path';
import { AuthorizationType, LambdaIntegration, MethodOptions, RestApi } from 'aws-cdk-lib/aws-apigateway';
import { GenericTable } from './GenericTable';
import { NodejsFunction } from 'aws-cdk-lib/aws-lambda-nodejs';
import { PolicyStatement } from 'aws-cdk-lib/aws-iam';
import { AuthorizerWrapper } from './auth/AuthorizerWrapper';

export class SpaceStack extends Stack {

	private api = new RestApi(this, 'SpaceApi');
	private authorizer: AuthorizerWrapper;

	private spacesTable = new GenericTable(this, {
		tableName: 'SpacesTable',
		primaryKey: 'spaceId',
		createLambdaPath: 'Create',
		readLambdaPath: 'Read',
		updateLambdaPath: 'Update',
		deleteLambdaPath: 'Delete',
		secondaryIndexes: ['location']
	})

	constructor(scope: Construct, id: string, props: StackProps) {
		super(scope, id, props);
		this.authorizer = new AuthorizerWrapper(this, this.api);

		const helloLambdaNodeJs = new NodejsFunction(this, 'helloLambdaNodeJs', {
			entry: join(__dirname, '..', 'services', 'node-lambda', 'hello.ts'),
			handler: 'handler'
		})

		const s3ListPolicy = new PolicyStatement();
		s3ListPolicy.addActions('s3:ListAllMyBuckets');
		s3ListPolicy.addResources('*');
		helloLambdaNodeJs.addToRolePolicy(s3ListPolicy);

		const optionsWithAuthorizer: MethodOptions = {
			authorizationType: AuthorizationType.COGNITO,
			authorizer: {
				authorizerId: this.authorizer.authorizer.authorizerId
			}
		}

		/* Hello Api lambda integration: */
		const helloLambdaIntegration = new LambdaIntegration(helloLambdaNodeJs);
		const helloLambdaResource = this.api.root.addResource('hello');
		helloLambdaResource.addMethod('GET', helloLambdaIntegration, optionsWithAuthorizer);

		/* Spaces API integrations: */
		const spacesResource = this.api.root.addResource('spaces');
		spacesResource.addMethod('POST', this.spacesTable.createLambdaIntegration);
		spacesResource.addMethod('GET', this.spacesTable.readLambdaIntegration);
		spacesResource.addMethod('PUT', this.spacesTable.updateLambdaIntegration);
		spacesResource.addMethod('DELETE', this.spacesTable.deleteLambdaIntegration);
	}
}