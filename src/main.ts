import { generateDomainDto } from './events-payload/factories/methods/domain-dto-factory';

async function bootstrap() {
  // await NestFactory.create(OtpModule);

  await generateDomainDto('user');
}
bootstrap();
