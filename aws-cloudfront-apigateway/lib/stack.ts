import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { CloudFrontToApiGateway } from '@aws-solutions-constructs/aws-cloudfront-apigateway';
import { Code, Function, Runtime } from 'aws-cdk-lib/aws-lambda';
import { AuthorizationType, EndpointType, JsonSchemaType, LambdaIntegration, LambdaRestApi, Model, RequestValidator } from 'aws-cdk-lib/aws-apigateway';
import { AllowedMethods, CachePolicy, CacheQueryStringBehavior, GeoRestriction, PriceClass, ViewerProtocolPolicy } from 'aws-cdk-lib/aws-cloudfront';

export class AwsCloudfrontApigatewayStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLambda = new Function(this, 'HelloLambdaHandler', {
      code: Code.fromAsset('lambda-fns'),
      handler: 'hello.handler',  
      runtime: Runtime.NODEJS_14_X              
    });

    const apiGateway = new LambdaRestApi(this, 'LambdaRestApi', {
          defaultMethodOptions: {
              authorizationType: AuthorizationType.NONE
          },
          endpointConfiguration: {
            types: [EndpointType.REGIONAL]
          },
          handler: helloLambda,
          proxy: false
    });

    const hello = apiGateway.root.addResource('hello');

    hello.addMethod('GET', new LambdaIntegration(helloLambda), {
      requestParameters: {
        'method.request.querystring.greetName': true,
      },
      requestValidatorOptions: {
        requestValidatorName: 'querystring-validator',
        validateRequestBody: false,
        validateRequestParameters: true
      }
    });

    const goodbye = apiGateway.root.addResource('goodbye');

    const goodbyeModel = new Model(this, 'model-validator', {
      contentType: 'application/json',
      description: 'Validates required details are present',
      modelName: 'goodbyeModel',
      restApi: apiGateway,
      schema: {
        type: JsonSchemaType.OBJECT,
        required: [ 'name' ],
        properties: {
          name: { type: JsonSchemaType.STRING },
          address: {
            type: JsonSchemaType.OBJECT,
            properties: {
              street: { type: JsonSchemaType.STRING },
              town: { type: JsonSchemaType.STRING }
            }
          }
        }
      }
    });

    const goodbyeLambda = new Function(this, 'GoodbyeLambdaHandler', {
      code: Code.fromAsset('lambda-fns'),
      handler: 'goodbye.handler',
      runtime: Runtime.NODEJS_14_X              
    });

    goodbye.addMethod('POST', new LambdaIntegration(goodbyeLambda), {
      requestModels: {
        'application/json': goodbyeModel
      },
      requestValidator: new RequestValidator(this, 'body-validator', {
        requestValidatorName: 'body-validator',
        restApi: apiGateway,
        validateRequestBody: true  
      })
    });
    
    new CloudFrontToApiGateway(this, 'CloudfrontApigateway', {
        cloudFrontDistributionProps: {
          defaultBehavior: {
            allowedMethods: AllowedMethods.ALLOW_ALL,
            cachePolicy: new CachePolicy(this, 'bespokeCachePolicy', {
              queryStringBehavior: CacheQueryStringBehavior.allowList('greetName')
            }),
            viewerProtocolPolicy: ViewerProtocolPolicy.HTTPS_ONLY
          },
          geoRestriction: GeoRestriction.allowlist('GB'),
          priceClass: PriceClass.PRICE_CLASS_100
        },
        existingApiGatewayObj: apiGateway
    });
  }
}
