import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { reducePayload } from './reduce-payload';
import * as fs from 'fs/promises';

export const ReducePayload = createParamDecorator(
  async (payloadsSamples: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const eventCategory = request.value.category;
    const payload = request;

    const payloadSample = reducePayload(payload);

    if (!payloadsSamples[eventCategory]) {
      const logger = new Logger('Developer Experience');
      logger.warn(
        `[ReducePayload decorator] To show the payload type instead of 'any', please restart the app.`,
      );

      try {
        payloadsSamples[eventCategory] = payloadSample;

        const path = payloadsSamples.filePath;
        const content = `export const payloads = ${JSON.stringify(
          payloadsSamples,
          null,
          2,
        ).replace('"uuid-123-some-any-abc-uuid"', '"some-any" as any')};
        `;

        await fs.writeFile(path, content);
      } catch (e) {
        delete payloadsSamples[eventCategory];
        logger.error(e.message);
      }
    }

    return payload;
  },
);
