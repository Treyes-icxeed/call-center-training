// AWS Amplify Configuration for Cognito Authentication
// Configuration will be injected at build time from CDK outputs

export const awsconfig = {
  Auth: {
    Cognito: {
      userPoolId: import.meta.env.VITE_USER_POOL_ID || '',
      userPoolClientId: import.meta.env.VITE_USER_POOL_CLIENT_ID || '',
      identityPoolId: import.meta.env.VITE_IDENTITY_POOL_ID || 'us-east-1:94571323-80e1-4d15-b576-de8ec2508d40',
      loginWith: {
        oauth: {
          domain: import.meta.env.VITE_USER_POOL_DOMAIN || '',
          scopes: ['openid', 'email', 'profile'],
          redirectSignIn: [window.location.origin],
          redirectSignOut: [window.location.origin],
          responseType: 'code' as const,
        },
      },
    },
  },
};
