import { createParamDecorator, ExecutionContext } from '@nestjs/common';

function warnIfPayloadIsAnyType(
  payload: any,
  payloads: Record<string, any>,
  eventName: string,
) {
  if (!payloads[eventName]) {
    console.log(
      payload,
      'EN LOGGER COMO WARNINGwrite to file. New Event Coded, please restart app.',
    );
  }
}

const payloads = { event1: '1' };

export const ReducePayload = createParamDecorator(
  (data: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const eventName = request.value.category;
    const _payload = request.value.payload;

    warnIfPayloadIsAnyType(_payload, payloads, eventName);

    return _payload;
  },
);
