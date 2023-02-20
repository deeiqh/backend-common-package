import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReducePayload = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context;
    console.log('REQUEST', request, 'DAAATA', data);
  },
);
