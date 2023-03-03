import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { reducePayload } from './services/reduce-payload';

export const ReducePayload = createParamDecorator(
  async (payloadsSamples: Record<string, any>, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const payload = request;

    reducePayload(payload);

    return payload;
  },
);
