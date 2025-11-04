import { ApiResponseOptions } from '@nestjs/swagger';

export const ApiResponseError = (
  code = 500,
  message = 'Internal server error',
) =>
  ({
    status: code,
    example: {
      message: message,
      statusCode: code,
      trace_id: 'ad838',
    },
  }) as ApiResponseOptions;
