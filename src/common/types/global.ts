import { Request } from 'express';

export interface CustomRequest extends Request {
  custom_attributes?: {
    trace_id?: string;
  };
}
