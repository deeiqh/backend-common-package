import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { EventEmitter } from 'events';
import { OTP_OPERATION_MAX_MINUTES } from './send-otp.guard';

@Injectable()
export class OtpValidatedGuard implements CanActivate {
  constructor(private readonly eventEmitter: EventEmitter) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const data = context.switchToRpc().getData(); //more cases, http, graphql etc
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
