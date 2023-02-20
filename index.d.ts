import { DynamicModule } from 'node_modules/@nestjs/common/interfaces/modules/dynamic-module.interface';
import { ResultMessage } from 'src/guards/validate-operation-otp';
import { OtpConfig } from 'src/otp/interfaces/otp-config.interface';
import { ProvidersConfig } from 'src/otp/interfaces/providers-config.interface';

export class OtpModule {
  static forRoot(configs: OtpConfig & ProvidersConfig): DynamicModule;
}

export class ReducePayloadModule {}

export class SendOperationOtpGuard {}

export class ValidatedOperationOtpGuard {}

export class OtpService {
  async validateOperationOtp(input: {
    operationUUID: string;
    otp: string;
  }): Promise<ResultMessage>;
}

export class ReducePayloadService {
  reducePayload(payload: Record<string, any>): Record<string, any> | void;

  reduceModel(
    model: Record<string, any>,
    modelObject?: Record<string, any>,
  ): Record<string, any>;

  private reduceModelOperation(
    schema: Record<string, any>,
    model: Record<string, any>,
    modelObject?: Record<string, any>,
  ): void;
}
