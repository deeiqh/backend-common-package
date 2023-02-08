import { DynamicModule } from 'node_modules/@nestjs/common/interfaces/modules/dynamic-module.interface';
import { IProvidersConfig } from 'src/guards/guards.module';
import { ResultMessage } from 'src/guards/validate-operation-otp.service';

export class CommonModule {
  static forRoot(configs: IProvidersConfig): DynamicModule;
}

export class SendOtpGuard {}

export class OtpValidatedGuard {}

export class ValidateOperationOtpService {
  async validateOperationOtp(input: {
    operationUUID: string;
    code: string;
  }): Promise<ResultMessage>;
}
