import { Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import JsonToTS from 'json-to-ts';
import * as path from 'path';
import { @Domain@Props } from '../domain-replaced/@domain@';

export async function domainDtoFactory(): Promise<boolean> {
  const @domain@Props: Record<string, any> = new @Domain@Props();

  const dtoObject: Record<string, any> = {};

  for (const prop of Object.keys(@domain@Props)) {
    const entries = Object.entries(@domain@Props[prop]);

    if (entries.length === 1) {
      dtoObject[prop] = entries[0][1];
    } else {
      dtoObject[prop] = @domain@Props[prop];
    }
  }

  const dtoObjectInterfaces = JsonToTS(dtoObject);

  const domainName = @Domain@Props.name.replace('Props', '');

  dtoObjectInterfaces[0] = dtoObjectInterfaces[0].replace(
    'RootObject',
    `${domainName}Dto`,
  );

  let dtoContent = '';

  dtoObjectInterfaces.map(
    (dtoObjectInterface) =>
      (dtoContent += `${dtoObjectInterface
        .replace(/undefined/g, 'any')
        .replace(/interface/g, 'export class')
        .replace(/:/g, '?:')}\n`),
  );

  const dtoPath = path
    .join(__dirname, '..', 'dtos', 'domain', '@domain@.dto.ts')
    .replace('/dist', '');

  await fs.writeFile(dtoPath, dtoContent);

  const domainFolderPath = path
    .join(__dirname, '..', 'domain')
    .replace('/dist', '');

  await fs.rm(domainFolderPath, { recursive: true, force: true });

  const logger = new Logger('domainDtoFactory');
  logger.log(`${domainName}Dto created`);

  return true;
}
