import { ClientKafka } from '@nestjs/microservices';
import { Cache } from 'cache-manager';

export interface ResultMessage {
  resultMessage: { message: string; statusCode: string };
}

export async function validateOperationOtp(
  cacheManager: Cache,
  clientKafka: ClientKafka,
  input: {
    operationUUID: string;
    code: string;
  },
): Promise<ResultMessage> {
  const { operationUUID, code } = input || {};

  const { code: codeCached } =
    ((await cacheManager.get(operationUUID)) as any) || {};

  const isValid = codeCached === code;

  if (!codeCached || isValid) {
    clientKafka.emit('otp-validated', {
      operationUUID,
      isValid,
    });

    if (!codeCached) {
      return {
        resultMessage: { message: 'Expired code', statusCode: '200' },
      };
    }

    await cacheManager.del(operationUUID);

    return {
      resultMessage: { message: 'Validated code', statusCode: '200' },
    };
  }

  return {
    resultMessage: { message: 'Invalid code. Try again.', statusCode: '200' },
  };
}
