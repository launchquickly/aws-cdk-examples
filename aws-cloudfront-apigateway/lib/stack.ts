import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CloudFrontToApiGateway } from '@aws-solutions-constructs/aws-cloudfront-apigateway';
import { Code, Function, FunctionProps, Runtime } from 'aws-cdk-lib/aws-lambda';
import { AuthorizationType, EndpointType, LambdaRestApi, LambdaRestApiProps } from 'aws-cdk-lib/aws-apigateway';

export class AwsCloudfrontApigatewayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const lambdaProps: FunctionProps = {
        code: Code.fromAsset(`${__dirname}/lambda`),
        runtime: Runtime.NODEJS_14_X,
        handler: 'hello.handler'
    };
    
    const lambdafunction = new Function(this, 'LambdaFunction', lambdaProps);
    
    const apiGatewayProps: LambdaRestApiProps = {
            handler: lambdafunction,
            endpointConfiguration: {
                types: [EndpointType.REGIONAL]
            },
            defaultMethodOptions: {
                authorizationType: AuthorizationType.NONE
            }
    };
    
    const apiGateway = new LambdaRestApi(this, 'LambdaRestApi', apiGatewayProps);
    
    new CloudFrontToApiGateway(this, 'test-cloudfront-apigateway', {
        existingApiGatewayObj: apiGateway
    });
  }
}
