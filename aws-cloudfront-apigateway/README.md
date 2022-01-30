# Cloudfront fronting API Gateway REST API

Example illustrating the use of [@aws-solutions-constructs/aws-cloudfront-apigateway](https://github.com/awslabs/aws-solutions-constructs/tree/main/source/patterns/@aws-solutions-constructs/aws-cloudfront-apigateway) that implements an Amazon CloudFront distribution in front of an Amazon API Gateway REST API.

Each API Gateway endpoint in implemented as a single unique function and the lambda function code is in its own Typescript file.

![Architecture Diagram](https://github.com/awslabs/aws-solutions-constructs/raw/main/source/patterns/%40aws-solutions-constructs/aws-cloudfront-apigateway/architecture.png "Architecture Diagram")

## Resources deployed

### Amazon CloudFront

* Configure Access logging for CloudFront WebDistribution
* Enable automatic injection of best practice HTTP security headers in all responses from CloudFront WebDistribution

### Amazon API Gateway

* API Gateway with 2 REST endpoints:
    * /hello
    * /goodbye
* Enable X-Ray Tracing

### AWS Lambda

* Lambda function that prints a hello message for /hello endpoint
* Lambda function that prints a goodbye message for /goodbye endpoint

## Useful commands

 * `npm run build`   compile typescript to js
 * `npm run watch`   watch for changes and compile
 * `npm run test`    perform the jest unit tests
 * `cdk deploy`      deploy this stack to your default AWS account/region
 * `cdk diff`        compare deployed stack with current state
 * `cdk synth`       emits the synthesized CloudFormation template

 ## References

* [AWS Solutions doc for aws-cloudfront-apigateway](https://docs.aws.amazon.com/solutions/latest/constructs/aws-cloudfront-apigateway.html)
* [@aws-solutions-constructs/aws-cloudfront-apigateway](https://github.com/awslabs/aws-solutions-constructs/tree/main/source/patterns/@aws-solutions-constructs/aws-cloudfront-apigateway)
* [The Lambda Trilogy](https://github.com/cdk-patterns/serverless/tree/main/the-lambda-trilogy/typescript) - discusses 3 potential patterns for organising, encapsulating and deploying logic in lambdas
