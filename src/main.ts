import { generateDomainDto } from './events-payload/services/generate-domain-dto';
import { restartDomainDtoFactory } from './events-payload/services/restart-domain-dto-factory';

async function bootstrap() {
  // await NestFactory.create(OtpModule);

  await generateDomainDto('user');
}
bootstrap();
