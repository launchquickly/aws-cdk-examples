import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CloudFrontToApiGateway } from '@aws-solutions-constructs/aws-cloudfront-apigateway';
import { Code, Function, FunctionProps, Runtime } from 'aws-cdk-lib/aws-lambda';
import { AuthorizationType, EndpointType, LambdaIntegration, LambdaRestApi, LambdaRestApiProps } from 'aws-cdk-lib/aws-apigateway';

export class AwsCloudfrontApigatewayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLambda = new Function(this, 'HelloLambdaHandler', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('lambda-fns'),
      handler: 'hello.handler',                
    });

    const goodbyeLambda = new Function(this, 'GoodbyeLambdaHandler', {
      runtime: Runtime.NODEJS_14_X,
      code: Code.fromAsset('lambda-fns'),
      handler: 'goodbye.handler',                
    });
    
    const apiGateway = new LambdaRestApi(this, 'LambdaRestApi', {
          handler: helloLambda,
          endpointConfiguration: {
              types: [EndpointType.REGIONAL]
          },
          defaultMethodOptions: {
              authorizationType: AuthorizationType.NONE
          },
          proxy: false
    });

    apiGateway.root.resourceForPath('hello').addMethod('GET', new LambdaIntegration(helloLambda));
    apiGateway.root.resourceForPath('goodbye').addMethod('GET', new LambdaIntegration(goodbyeLambda));
    
    new CloudFrontToApiGateway(this, 'CloudfrontApigateway', {
        existingApiGatewayObj: apiGateway
    });
  }
}
