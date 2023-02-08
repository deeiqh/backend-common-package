import { DynamicModule } from 'node_modules/@nestjs/common/interfaces/modules/dynamic-module.interface';
import { IProvidersConfig } from 'src/guards/guards.module';
import { ResultMessage } from 'src/guards/validate-operation-otp.service';
import { Cache } from 'node_modules/cache-manager';
import { ClientKafka } from 'node_modules/@nestjs/microservices';

export class CommonModule {
  static forRoot(configs: IProvidersConfig): DynamicModule;
}

export class SendOtpGuard {}

export class OtpValidatedGuard {}

export class ValidateOperationOtpService {
  private readonly cacheManager;
  private readonly clientKafka;

  constructor(cacheManager: Cache, clientKafka: ClientKafka);

  validateOperationOtp(input: {
    operationUUID: string;
    code: string;
  }): Promise<ResultMessage>;
}
