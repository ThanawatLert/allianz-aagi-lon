if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  require('module-alias/register');
}
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import * as bodyParser from 'body-parser';
import express from 'express';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { CatchEverythingFilter } from './common/filters/catch-everything-filter';
import { CustomLogger } from './common/utils/customLogger';
import { setupMorgan } from './morgan';
import { setupSwagger } from './swagger';

async function bootstrap() {
  const expressApp = express();
  expressApp.disable('x-powered-by');
  const adapter = new ExpressAdapter(expressApp);

  const app = await NestFactory.create(AppModule, adapter, {
    rawBody: true,
    logger: new CustomLogger(), // disable nestjs logger https://dev.to/micalevisk/nestjs-tip-how-to-disable-initialization-logging-1b38
  });
  const configService = app.get(ConfigService);

  app.enableCors({
    origin: [
      /.zwiz.app$/,
      /.localhost$/,
      /.localhost:\d+$/,
      /.\[::1\]$/,
      /.\[::1\]:\d+$/,
    ], // add /\.ngrok\-free\.app/ for test webhook
  });

  app.use(
    helmet({
      xPoweredBy: false,
    }),
  );

  app.use(bodyParser.json({ limit: '80mb' }));
  app.use(bodyParser.urlencoded({ limit: '80mb', extended: true }));

  app.useGlobalFilters(new CatchEverythingFilter(app.get(HttpAdapterHost)));
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );

  setupMorgan(app);
  setupSwagger(app);

  await app.listen(configService.get('PORT') || 3000);
  const appUrl = `http://localhost:${configService.get('PORT')}`;
  console.log(`Application is running on: ${appUrl}`);
  console.log(`Document on: ${appUrl}/swagger`);
}
bootstrap();
