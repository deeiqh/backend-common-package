import {
  CACHE_MANAGER,
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { Cache } from 'cache-manager';
import { SEND_OPERATION_OTP } from './events/topics';

export const OTP_OPERATION_MAX_MINUTES = 1;

@Injectable()
export class SendOperationOtpGuard implements CanActivate {
  constructor(
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
    @Inject('CLIENT_KAFKA') private readonly clientKafka: ClientKafka,
  ) {}

  logger = new Logger(SendOperationOtpGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data =
      context.switchToRpc().getData() || context.switchToHttp().getRequest();

    if (!data?.otpHeaders) {
      this.logger.error(
        `[Error] ${SendOperationOtpGuard.name}: Empty context data`,
      );
      return false;
    }

    const { targetType, target, operationUUID } = data.otpHeaders;

    const numberDigits = 6;
    const chars = '0123456789abcdefghijklmnopqrstuvwxyz';
    let code = '';
    for (let i = numberDigits; i > 0; --i) {
      code += chars[Math.round(Math.random() * (chars.length - 1))];
    }
    code = code.toUpperCase();

    this.clientKafka.emit(SEND_OPERATION_OTP, {
      targetType,
      target,
      code,
    });

    await this.cacheManager.set(
      operationUUID,
      {
        code,
      },
      OTP_OPERATION_MAX_MINUTES * 60 * 1000,
    );

    return true;
  }
}
