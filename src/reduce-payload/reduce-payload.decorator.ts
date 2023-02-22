import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { reducePayload } from './reduce-payload';
import * as fs from 'fs/promises';

export const ReducePayload = createParamDecorator(
  async (payloadsSamples: any, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest();

    const eventCategory = request.value.category;
    const payload = request;

    const payloadSample = reducePayload(payload);
    payloadsSamples[eventCategory] = payloadSample;

    const logger = new Logger('ReducePayload decorator');
    try {
      const path = payloadsSamples.filePath;
      const newContent = `export const payloads = ${JSON.stringify(
        payloadsSamples,
        null,
        2,
      ).replace('"uuid-123-some-any-abc-uuid"', '"some-any" as any')};
        `;

      const fileContent = await fs.readFile(path, {
        encoding: 'utf8',
      });
      console.log(
        'AAAA',
        JSON.stringify(payloadsSamples).replace(
          /uuid-123-some-any-abc-uuid/g,
          'some-any',
        ),
        'BBB',

        JSON.stringify(
          JSON.parse(
            fileContent
              .replace(/.+\s+=\s+{(.+)};/s, '{$1}')
              .replace(/(['"])?([a-z0-9A-Z_-]+)(['"])?:/g, '"$2": ')
              .replace(/'/g, `"`)
              .replace(/,\n(\s+)?}/g, '\n}')
              .replace(/as any/g, ''),
          ),
        ),
      );
      if (
        JSON.stringify(payloadsSamples).replace(
          /uuid-123-some-any-abc-uuid/g,
          'some-any',
        ) !==
        JSON.stringify(
          JSON.parse(
            fileContent
              .replace(/.+\s+=\s+{(.+)};/s, '{$1}')
              .replace(/(['"])?([a-z0-9A-Z_-]+)(['"])?:/g, '"$2": ')
              .replace(/'/g, `"`)
              .replace(/,\n(\s+)?}/g, '\n}')
              .replace(/as any/g, ''),
          ),
        )
      ) {
        await fs.writeFile(path, newContent);

        logger.warn(
          `[Developer Experience] To show the updated payload type, please restart the app.`,
        );
      }
    } catch (e) {
      delete payloadsSamples[eventCategory];
      logger.error(e.message);
    }

    return payload;
  },
);
