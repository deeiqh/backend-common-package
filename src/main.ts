import { generateDomainDto } from './events-payload/factories/methods/generate-domain-dto';

async function bootstrap() {
  // await NestFactory.create(OtpModule);

  await generateDomainDto('user');
}
bootstrap();
