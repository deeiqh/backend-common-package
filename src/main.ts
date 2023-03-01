import { domainDtoFactory } from './events-payload/factories/domain-dto.factory';

async function bootstrap() {
  // await NestFactory.create(OtpModule);

  //await prepareAfterDomainFolderPasted('user');
  await domainDtoFactory();
}
bootstrap();
