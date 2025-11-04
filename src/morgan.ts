import { INestApplication } from '@nestjs/common';
import morgan from 'morgan';
export const setupMorgan = (app: INestApplication) => {
  morgan.token('ip', (req) => {
    try {
      if (req.headers['x-forwarded-for']) {
        const forwardArray = req.headers['x-forwarded-for'].split(',');
        return forwardArray[0];
      }
    } catch (error) {
      console.error(error);
    }
    return req.ip || req.connection.remoteAddress || null;
  });
  morgan.token('trace-id', (req) => {
    return req['custom_attributes']?.trace_id;
  });
  app.use(
    morgan(
      `:method :url :status :response-time ms :total-time[3] ms :ip ":referrer" :trace-id`,
      {
        skip: function (req) {
          return req.originalUrl.includes('/health-check');
        },
      },
    ),
  );
};
