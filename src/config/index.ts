import { registerAs } from '@nestjs/config';

export default registerAs('config', () => {
  return {
    app: {
      appName: process.env.APP_NAME,
      app_port: process.env.PORT,
      api_key: process.env.APP_API_KEY,
      jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: process.env.JWT_EXPIRATION_TIME,
      },
      domain: process.env.APP_DOMAIN,
      env: process.env.NODE_ENV,
    },
    aws: {
      s3: {
        region: process.env.AWS_S3_REGION,
      },
    },
    postgres: {
      type: 'postgres',
      port: parseInt(<string>process.env.XS_GLOBAL_DB_PORT),
      host: process.env.XS_GLOBAL_DB_HOST,
      username: process.env.XS_GLOBAL_DB_USER,
      password: process.env.XS_GLOBAL_DB_PASS,
      database: process.env.XS_GLOBAL_DB_DATABASE,
    },
  };
});
