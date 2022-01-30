import { App } from 'aws-cdk-lib';
import { Template } from 'aws-cdk-lib/assertions';
import { AwsCloudfrontApigatewayStack } from '../lib/stack';

let template: Template;

beforeEach(() => {
    // GIVEN
    const app = new App();
    // WHEN
    const stack = new AwsCloudfrontApigatewayStack(app, 'MyTestStack');
    // THEN
    template = Template.fromStack(stack);
});

test('Stack contains a Cloudfront Distribution', () => {
    template.hasResource('AWS::CloudFront::Distribution', {

    });
});

test('Stack contains an API Gateway REST API', () => {
    template.hasResource('AWS::ApiGateway::RestApi', {

    });
});

test('Stack contains 2 Lambda functions', () => {
    template.resourceCountIs('AWS::Lambda::Function', 2);
});

test('Stack contains a S3 Bucket - used to capture Cloudfront logging', () => {
    template.hasResource('AWS::S3::Bucket', {

    });
});