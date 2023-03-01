import { domainDtoFactory } from './events-payload/factories/domain-dto.factory';

async function bootstrap() {
  // await NestFactory.create(OtpModule);

  await domainDtoFactory('user');
}
bootstrap();
