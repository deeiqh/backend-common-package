import { createParamDecorator, ExecutionContext, Logger } from '@nestjs/common';
import { reducePayload } from './reduce-payload';
import * as fs from 'fs/promises';

export const ReducePayload = createParamDecorator(
  async (payloadsSamples: any, context: ExecutionContext) => {
    const logger = new Logger('ReducePayload decorator');

    const request = context.switchToHttp().getRequest();

    const eventCategory = request.value.category;
    const payload = request;

    const payloadSample = reducePayload(payload);
    payloadsSamples[eventCategory] = payloadSample;

    try {
      const payloadsSamplesJSON = JSON.stringify(payloadsSamples, null, 2);

      const path = payloadsSamples.filePath;
      const fileJSON = JSON.stringify(
        JSON.parse(
          (await fs.readFile(path, { encoding: 'utf8' }))
            .replace(/.+\s+=\s+{(.+)};/s, '{$1}')
            .replace(/(['"])?([a-z0-9A-Z_-]+)(['"])?:/g, '"$2": ')
            .replace(/'/g, `"`)
            .replace(/,\n(\s+)?}/g, '\n}')
            .replace(/as any/g, ''),
        ),
        null,
        2,
      );

      if (payloadsSamplesJSON !== fileJSON) {
        const newContent = `export const payloads = ${payloadsSamplesJSON.replace(
          /"some-any"/g,
          '"some-any" as any',
        )};\n`;

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
