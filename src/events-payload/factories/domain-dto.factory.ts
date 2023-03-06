import { Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import JsonToTS from 'json-to-ts';
import * as path from 'path';
import { OrderProps } from '../formatted-domain/order';

export async function domainDtoFactory(): Promise<boolean> {
  const orderProps: Record<string, any> = new OrderProps();

  const dtoObject: Record<string, any> = {};

  for (const prop of Object.keys(orderProps)) {
    const entries = Object.entries(orderProps[prop]);

    if (entries.length === 1) {
      dtoObject[prop] = entries[0][1];
    } else {
      dtoObject[prop] = orderProps[prop];
    }
  }

  const dtoObjectInterfaces = JsonToTS(dtoObject);

  const domainName = OrderProps.name.replace('Props', '');

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
    .join(__dirname, '..', 'dtos', 'domain', 'order.dto.ts')
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
