import { Module } from '@nestjs/common';
import { ReducePayload } from './decorators/reduce-payload.decorator';

@Module({
  providers: [
    {
      provide: 'REDUCE_PAYLOAD_DECORATOR',
      useValue: ReducePayload,
    },
  ],
  exports: ['REDUCE_PAYLOAD_DECORATOR'],
})
export class ReducePayloadModule {}
