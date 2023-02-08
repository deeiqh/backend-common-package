import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';
import { EventEmitter } from 'events';
import { OTP_OPERATION_MAX_MINUTES } from './send-otp.guard';

@Injectable()
export class OtpValidatedGuard implements CanActivate {
  constructor(private readonly eventEmitter: EventEmitter) {}
  logger = new Logger(OtpValidatedGuard.name);

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data =
      context.switchToRpc().getData() || context.switchToHttp().getRequest();

    if (!data?.otpHeaders) {
      this.logger.error('[Error] OtpValidatedGuard: Empty context data');
      return false;
    }

    const { operationUUID } = data.otpHeaders;

    let wasProcessed = false;
    let isValid = false;

    this.eventEmitter.on('otp-validated-result', (payload) => {
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
