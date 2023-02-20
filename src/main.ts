import { NestFactory } from '@nestjs/core';
import { OtpModule } from './otp/otp.module';
import { ReducePayloadModule } from './reduce-payload/reduce-payload.module';

async function bootstrap() {
  await NestFactory.create(OtpModule);
  await NestFactory.create(ReducePayloadModule);
}
bootstrap();
