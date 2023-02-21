import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { reducePayload } from './reduce-payload';
import * as fs from 'fs/promises';

export const ReducePayload = createParamDecorator(
  async (payloadsSamples: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const eventCategory = request.value.category;
    const _payload = request;

    const payloadSample = reducePayload(_payload);

    const logger = new Logger('Developer Experience');

    if (!payloadsSamples[eventCategory]) {
      logger.warn(
        `[ReducePayload decorator] To show the payload type instead of 'any', please restart the app.`,
      );

      try {
        payloadsSamples[eventCategory] = payloadSample;

        const path = payloadsSamples.filePath;
        const content = `export const payloads = ${JSON.stringify(
          payloadsSamples,
        )};
        `;
        console.log(path, '\n', content);
        await fs.writeFile(path, content);
      } catch (e) {
        delete payloadsSamples[eventCategory];

        logger.error(e.message);
      }
    }

    return _payload;
  },
);
