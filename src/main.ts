import { dtoFactory } from './events-payload/factories/interface.factory';

async function bootstrap() {
  // await NestFactory.create(OtpModule);

  //await dtoFactoryTemplate('user');
  await dtoFactory();
}
bootstrap();
