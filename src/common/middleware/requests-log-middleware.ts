import { getCurrentInvoke } from '@codegenie/serverless-express';
import { NestMiddleware } from '@nestjs/common';
import { NextFunction } from 'express';
import { v4 as uuidv4 } from 'uuid';
import { CustomRequest } from '../types/global';

export class RequestsLogMiddleware implements NestMiddleware {
  use(request: CustomRequest, response: Response, next: NextFunction): void {
    const { context } = getCurrentInvoke();

    request['custom_attributes'] = {
      trace_id:
        context?.awsRequestId ||
        request?.custom_attributes?.trace_id ||
        uuidv4(),
    };
    next();
  }
}
