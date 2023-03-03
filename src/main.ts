import { generateDomainDto } from './events-payload/services/generate-domain-dto';

async function bootstrap() {
  // await NestFactory.create(OtpModule);

  await generateDomainDto('authentication');
}
bootstrap();
