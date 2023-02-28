import { Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import JsonToTS from 'json-to-ts';
import { UserProps } from '../domain/user';

export async function interfaceFactory(): Promise<void> {
  const user: Record<string, any> = new UserProps();
  const domainName = UserProps.name;

  const sample: Record<string, any> = {};

  for (const property of Object.keys(user)) {
    const entries = Object.entries(user[property]);

    if (entries.length === 1) {
      sample[property] = entries[0][1];
    } else {
      sample[property] = user[property];
    }
  }

  let content = '';

  const interfaces = JsonToTS(sample);
  interfaces[0] = interfaces[0].replace('RootObject', `I${domainName}`);
  interfaces[0] = interfaces[0].replace('interface', `export interface`);
  interfaces.map(
    (_interface) =>
      (content += `${_interface
        .replace(/undefined/g, 'any')
        .replace(/:/g, '?:')}\n`),
  );

  await fs.writeFile(
    `/home/deeiqh/Documents/hapi/@hapi-corp/hapi-corp-backend-common-package/src/events-payload/interfaces/user-props.interface.ts`,
    content,
  );

  const logger = new Logger('dtoFactory');
  logger.log(`Interface created: ${content}`);
}
