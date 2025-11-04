import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Response } from 'express';
import { CustomRequest } from '../types/global';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<CustomRequest>();
    const status = exception.getStatus();

    const exceptionResponse = exception.getResponse() as object;
    const trace_id = request?.custom_attributes?.trace_id;

    response.status(status).json({
      ...exceptionResponse,
      trace_id,
    });
  }
}
