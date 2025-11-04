import { INestApplication } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export const setupSwagger = async (app: INestApplication, path?: string) => {
  const apiURL = 'api-gateway-enterprise.zwiz.app';

  const options = new DocumentBuilder()
    .setTitle('Enterprise Notification Center')
    .setDescription('API for Notification Center')
    .setVersion('1.0')
    .addServer('http://localhost:8080', 'localhost')
    .addServer(`https://uat-${apiURL}/notification-center`, 'Uat')
    .addServer(`https://${apiURL}/notification-center`, 'Production')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(`${path ? path + '/' : ''}swagger`, app, document);
};
