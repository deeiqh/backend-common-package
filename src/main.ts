import { NestFactory } from '@nestjs/core';
import { OtpModule } from './otp/otp.module';

async function bootstrap() {
  await NestFactory.create(OtpModule);
}
bootstrap();
