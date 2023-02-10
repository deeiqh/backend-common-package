import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { EventEmitter } from 'events';
import { EVALUATED_OPERATION_OTP_RESULT } from './events/topics';
import { OTP_OPERATION_MAX_MINUTES } from './send-operation-otp.guard';

@Injectable()
export class ValidatedOperationOtpGuard implements CanActivate {
  constructor(private readonly eventEmitter: EventEmitter) {}
  logger = new Logger(ValidatedOperationOtpGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data =
      context.switchToRpc().getData() || context.switchToHttp().getRequest();

    if (!data?.otpHeaders) {
      this.logger.error(
        `[Error] ${ValidatedOperationOtpGuard.name}: Empty context data`,
      );
      return false;
    }

    const { operationUUID } = data.otpHeaders;

    let wasProcessed = false;
    let isValid = false;

    this.eventEmitter.on(EVALUATED_OPERATION_OTP_RESULT, (payload) => {
      if (operationUUID === payload.operationUUID) {
        wasProcessed = true;
        isValid = payload.isValid;
      }
    });

    const maxMinutes = OTP_OPERATION_MAX_MINUTES;
    const intervalTime = 100;
    const maxIterations = (maxMinutes * 60 * 1000) / intervalTime;
    let iteration = 0;
    let intervalId: NodeJS.Timer;

    const isOtpValidated = await new Promise<boolean>((resolve) => {
      intervalId = setInterval(() => {
        if (wasProcessed) {
          if (isValid) {
            clearInterval(intervalId);
            resolve(true);
          }
          clearInterval(intervalId);
          resolve(false);
        }
        if (iteration > maxIterations) {
          clearInterval(intervalId);
          resolve(false);
        }
        iteration++;
      }, intervalTime);
    });

    return isOtpValidated;
  }
}
