import { Module } from '@nestjs/common';
import { ReducePayloadService } from './reduce-payload.service';

@Module({
  providers: [ReducePayloadService],
  exports: [ReducePayloadService],
})
export class ReducePayloadModule {}
