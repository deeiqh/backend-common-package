import { DynamicModule } from 'node_modules/@nestjs/common/interfaces/modules/dynamic-module.interface';
import { IProvidersConfig } from 'src/guards/guards.module';
import { ResultMessage } from 'src/guards/validate-operation-otp';

export class CommonModule {
  static forRoot(configs: IProvidersConfig): DynamicModule;
}

export class SendOperationOtpGuard {}

export class ValidatedOperationOtpGuard {}

export class GuardsService {
  async validateOperationOtp(input: {
    operationUUID: string;
    otp: string;
  }): Promise<ResultMessage>;
}

export class CommonService {
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
