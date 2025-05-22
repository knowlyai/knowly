import * as cdk from 'aws-cdk-lib'
import { Construct } from 'constructs'
import * as s3 from 'aws-cdk-lib/aws-s3'
import * as cloudfront from 'aws-cdk-lib/aws-cloudfront'
import * as iam from 'aws-cdk-lib/aws-iam'
import * as origins from 'aws-cdk-lib/aws-cloudfront-origins'
import { Certificate } from 'aws-cdk-lib/aws-certificatemanager'
import * as route53 from 'aws-cdk-lib/aws-route53'
import * as route53Targets from 'aws-cdk-lib/aws-route53-targets'

export class IacStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props)

    const stage = process.env.GITHUB_REF_NAME || 'dev'
    const prodCertArn = process.env.ACM_CERTIFICATE_ARN as string
    const devCertArn = process.env.ACM_CERTIFICATE_ARN_2 as string
    const acmCertificateArn = stage === 'prod' ? prodCertArn : devCertArn

    let alternativeDomains: string[] = []
    if (
      process.env.ALTERNATIVE_DOMAIN_NAME_1 &&
      process.env.ALTERNATIVE_DOMAIN_NAME_2
    ) {
      alternativeDomains = [
        process.env.ALTERNATIVE_DOMAIN_NAME_1,
        process.env.ALTERNATIVE_DOMAIN_NAME_2
      ]
    } else if (process.env.ALTERNATIVE_DOMAIN_NAME) {
      alternativeDomains = [process.env.ALTERNATIVE_DOMAIN_NAME]
    } else {
      throw new Error('No alternative domain name(s) provided.')
    }
    const hostedZoneId = process.env.HOSTED_ZONE_ID || 'Z1234567890123'

    const s3Bucket = new s3.Bucket(this, 'KnowlyFrontBucket' + stage, {
      versioned: true,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      blockPublicAccess: s3.BlockPublicAccess.BLOCK_ALL,
      accessControl: s3.BucketAccessControl.PRIVATE,
      autoDeleteObjects: true
    })

    const oac = new cloudfront.S3OriginAccessControl(this, 'KnowlyOAC', {
      originAccessControlName: `KnowlyFrontOAC-${stage}`,
      signing: cloudfront.Signing.SIGV4_ALWAYS
    })

    const s3Origin = origins.S3BucketOrigin.withOriginAccessControl(s3Bucket, {
      originAccessControl: oac
    })

    const certificate = Certificate.fromCertificateArn(
      this,
      `KnowlyCert-${stage}`,
      acmCertificateArn
    )

    const distribution = new cloudfront.Distribution(this, 'CDN', {
      comment: `Knowly Front Distribution ${stage}`,
      defaultBehavior: {
        origin: s3Origin,
        viewerProtocolPolicy: cloudfront.ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        allowedMethods: cloudfront.AllowedMethods.ALLOW_GET_HEAD,
        cachedMethods: cloudfront.CachedMethods.CACHE_GET_HEAD,
        cachePolicy: new cloudfront.CachePolicy(this, 'CachePolicy', {
          defaultTtl: cdk.Duration.seconds(3600),
          minTtl: cdk.Duration.seconds(0),
          maxTtl: cdk.Duration.seconds(86400),
          enableAcceptEncodingGzip: true,
          enableAcceptEncodingBrotli: true
        }),
        compress: true
      },
      errorResponses: [
        {
          httpStatus: 403,
          responseHttpStatus: 200,
          responsePagePath: '/index.html',
          ttl: cdk.Duration.seconds(0)
        }
      ],
      domainNames: alternativeDomains,
      certificate,
      sslSupportMethod: cloudfront.SSLMethod.SNI,
      minimumProtocolVersion: cloudfront.SecurityPolicyProtocol.TLS_V1_2_2021
    })

    const cfnDistribution = distribution.node
      .defaultChild as cloudfront.CfnDistribution

    s3Bucket.addToResourcePolicy(
      new iam.PolicyStatement({
        effect: iam.Effect.ALLOW,
        actions: ['s3:GetObject'],
        principals: [new iam.ServicePrincipal('cloudfront.amazonaws.com')],
        resources: [s3Bucket.arnForObjects('*')]
      })
    )

    if (alternativeDomains.length > 0) {
      const parentZoneName = alternativeDomains[0]
        .split('.')
        .slice(-2)
        .join('.')
      const zone = route53.HostedZone.fromHostedZoneAttributes(
        this,
        `HostedZone-${stage}`,
        {
          hostedZoneId: hostedZoneId,
          zoneName: parentZoneName
        }
      )

      alternativeDomains.forEach((domain, idx) => {
        new route53.ARecord(this, `AliasRecord-${stage}-${idx}`, {
          zone,
          recordName: domain,
          target: route53.RecordTarget.fromAlias(
            new route53Targets.CloudFrontTarget(distribution)
          )
        })
      })
    }

    new cdk.CfnOutput(this, 'KnowlyFrontBucketName-' + stage, {
      value: s3Bucket.bucketName
    })

    new cdk.CfnOutput(this, 'KnowlyFrontDistributionId-' + stage, {
      value: distribution.distributionId
    })

    new cdk.CfnOutput(this, 'KnowlyFrontDistributionDomainName-' + stage, {
      value: distribution.distributionDomainName
    })
  }
}
