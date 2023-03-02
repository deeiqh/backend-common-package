import { Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import JsonToTS from 'json-to-ts';
import * as path from 'path';
import { @Domain@Props } from '../domain-replaced/@domain@';

export async function domainDtoFactory(): Promise<boolean> {
  const @domain@: Record<string, any> = new @Domain@Props();

  const domainName = @Domain@Props.name.replace('Props', '');

  const sample: Record<string, any> = {};

  for (const property of Object.keys(@domain@)) {
    const entries = Object.entries(@domain@[property]);

    if (entries.length === 1) {
      sample[property] = entries[0][1];
    } else {
      sample[property] = @domain@[property];
    }
  }

  let content = '';

  const interfaces = JsonToTS(sample);
  interfaces[0] = interfaces[0].replace('RootObject', `${domainName}Dto`);
  interfaces[0] = interfaces[0].replace('interface', `export class`);
  interfaces.map(
    (_interface) =>
      (content += `${_interface
        .replace(/undefined/g, 'any')
        .replace(/interface/g, 'export class')
        .replace(/:/g, '?:')}\n`),
  );

  const dtoPath = path
    .join(__dirname, '..', 'dtos', 'domain', '@domain@.dto.ts')
    .replace('/dist', '');

  await fs.writeFile(dtoPath, content);

  const logger = new Logger('dtoFactory');
  logger.log(`${domainName}Dto created`);

  return true;
}
