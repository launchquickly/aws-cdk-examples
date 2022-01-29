#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsCloudfrontApigatewayStack } from '../lib/stack';

const app = new cdk.App();
new AwsCloudfrontApigatewayStack(app, 'AwsCloudfrontApigatewayStack', {
  
});