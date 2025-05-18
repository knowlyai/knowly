import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as iam from 'aws-cdk-lib/aws-iam'
// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const stage = process.env.GITHUB_REF_NAME || 'dev'

    const s3Bucket = new s3.Bucket(this, 'KnowlyFrontBucket' + stage, {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      accessControl: s3.BucketAccessControl.PRIVATE,
      autoDeleteObjects: true
    })

    const oac = new cloudfront.CfnOriginAccessControl(this, 'AOC', {
      originAccessControlConfig: {
        name: 'Knowly Front Bucket OAC ' + stage,
        originAccessControlOriginType: 's3',
        signingBehavior: 'always',
        signingProtocol: 'sigv4'
      }
    })

    const cloudFrontWebDistribution = new cloudfront.CloudFrontWebDistribution(
      this,
      'CDN',
      {
        comment: 'Knowly Front Distribution ' + stage,
        originConfigs: [
          {
            s3OriginSource: {
              s3BucketSource: s3Bucket
            },
            behaviors: [
              {
                isDefaultBehavior: true,
                allowedMethods: cloudfront.CloudFrontAllowedMethods.GET_HEAD,
                compress: true,
                cachedMethods:
                  cloudfront.CloudFrontAllowedCachedMethods.GET_HEAD,
                viewerProtocolPolicy:
                  cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
                minTtl: cdk.Duration.seconds(0),
                maxTtl: cdk.Duration.seconds(86400),
                defaultTtl: cdk.Duration.seconds(3600)
              }
            ]
          }
        ]
      }
    )

    const cfnDistribution = cloudFrontWebDistribution.node
      .defaultChild as cloudfront.CfnDistribution

    cfnDistribution.addPropertyOverride(
      'DistributionConfig.Origins.0.OriginAccessControlId',
      oac.getAtt('Id')
    )

    s3Bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject'],
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        resources: [s3Bucket.arnForObjects('*')]
      })
    )

    new cdk.CfnOutput(this, 'KnowlyFrontBucketName-' + stage, {
      value: s3Bucket.bucketName
    })

    new cdk.CfnOutput(this, 'KnowlyFrontDistributionId-' + stage, {
      value: cloudFrontWebDistribution.distributionId
    })

    new cdk.CfnOutput(this, 'KnowlyFrontDistributionDomainName-' + stage, {
      value: cloudFrontWebDistribution.distributionDomainName
    })
  }
}
