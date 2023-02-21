import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const ReducePayload = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const _payload = request.value.payload;

    return _payload;
  },
);
