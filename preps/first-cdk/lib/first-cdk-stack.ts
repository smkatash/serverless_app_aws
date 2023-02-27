import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { Bucket } from 'aws-cdk-lib/aws-s3';
import { CfnOutput, Duration, CfnParameter } from 'aws-cdk-lib';
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class FirstCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const duration = new CfnParameter(this, 'duration', {
      type: 'Number',
      default: 7,
      minValue: 1,
      maxValue: 365
    })
    // The code that defines your stack goes here
    const myBucket = new Bucket(this, 'testBucket', {
      lifecycleRules: [ {
        expiration: Duration.days(duration.valueAsNumber)
      }]
    })

    new CfnOutput(this, 'mybucket', {
      value: myBucket.bucketName
    })
    
    // example resource
    // const queue = new sqs.Queue(this, 'FirstCdkQueue', {
    //   visibilityTimeout: cdk.Duration.seconds(300)
    // });
  }
}
