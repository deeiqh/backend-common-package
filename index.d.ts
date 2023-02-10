import { DynamicModule } from 'node_modules/@nestjs/common/interfaces/modules/dynamic-module.interface';
import { IProvidersConfig } from 'src/guards/guards.module';
import { ResultMessage } from 'src/guards/validate-operation-otp';
import { Cache } from 'node_modules/cache-manager';
import { ClientKafka } from 'node_modules/@nestjs/microservices';

export class CommonModule {
  static forRoot(configs: IProvidersConfig): DynamicModule;
}

export class SendOperationOtpGuard {}

export class ValidatedOperationOtpGuard {}

export class ValidateOperationOtpService {
  async validateOperationOtp(input: {
    operationUUID: string;
    code: string;
  }): Promise<ResultMessage>;
}
