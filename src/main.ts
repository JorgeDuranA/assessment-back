import { ErrorsInterceptor } from '@/interceptors/errors.interceptors';
import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { json, urlencoded } from 'express';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    allowedHeaders: 'Content-Type, Accept',
  });
  app.use(json({ limit: '70mb' }));
  app.use(urlencoded({ extended: true, limit: '70mb' }));
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix(process.env.APP_ASSESSMENT_PREFIX);
  app.useGlobalInterceptors(new ErrorsInterceptor());
  const config = new DocumentBuilder()
    .setTitle('XS GLOBAL')
    .setDescription('')
    .setVersion('1.0')
    .addTag('Alpex-api')
    .setDescription(
      `XS GLOBAL API Documentation: This documentation provides instructions on making requests to the ALPEX API. To make requests,
       you need to include the following headers:x-api-key y Authorization.This header should include the necessary authentication credentials.
       You can set these headers clicking the following button(Authorize)`,
    )
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'Bearer',
        bearerFormat: 'Token',
        name: 'authorization',
        in: 'headers',
        description: 'The bearer token',
      },
      'authorization',
    )
    .addApiKey(
      {
        name: 'x-api-key',
        type: 'apiKey',
        in: 'header',
        description: 'the api key is the first auth layer',
      },
      'x-api-key',
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/documentation', app, document);
  await app.listen(process.env.PORT);
}

bootstrap()
  .then(() => {
    console.log(
      'Listening on: http://localhost:' +
        process.env.PORT +
        '/' +
        process.env.APP_ASSESSMENT_PREFIX,
    );
    console.log('Server started successfully 🎸 ');
  })
  .catch((e) => {
    console.log('Server failed to start');
    console.log(e);
  });
