import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { CustomRequest } from '../types/global';

@Catch()
export class CatchEverythingFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<CustomRequest>();
    const response = ctx.getResponse<Response>();
    const trace_id = request?.custom_attributes?.trace_id;
    const logName = `${trace_id} ${request?.method} ${request?.url}`;

    const internalError = new InternalServerErrorException();
    let httpStatus = internalError.getStatus();
    let exceptionResponse = internalError.getResponse() as object;

    try {
      if (exception instanceof HttpException) {
        httpStatus = exception.getStatus();
        exceptionResponse = exception.getResponse() as object;
      }

      if (httpStatus >= 500) {
        if (exception instanceof Error) {
          new Logger(logName).error(exception);
          new Logger(`${logName} : log`).error({
            message: exception.message,
            stack: exception.stack,
          });
          new Logger(`${logName} : payload`).error({
            headers: request.headers,
            body: request.body,
            query: request.query,
            params: request.params,
          });
        } else {
          new Logger(logName).error(JSON.stringify(exception));
        }
      }
    } catch (error) {
      console.error(error);
    }

    const responseBody = {
      ...exceptionResponse,
      statusCode: httpStatus,
      trace_id,
    };

    httpAdapter.reply(response, responseBody, httpStatus);
  }
}
