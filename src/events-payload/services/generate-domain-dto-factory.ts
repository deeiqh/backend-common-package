import { Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { capitalize } from 'src/events-payload/utils/capitalize';

export async function generateDomainDtoFactory(
  domainName: string,
): Promise<boolean> {
  const logger = new Logger(`generateDomainDtoFactory`);

  const domainDtoFactoryTemplatePath = path
    .join(
      __dirname,
      '..',
      'factories',
      'templates',
      'domain-dto-factory.template.ts',
    )
    .replace('/dist', '');

  let domainDtoFactoryTemplate: string;
  try {
    domainDtoFactoryTemplate = await fs.readFile(domainDtoFactoryTemplatePath, {
      encoding: 'utf-8',
    });
  } catch (err) {
    logger.error(`Can't read ${domainDtoFactoryTemplatePath}`);
    return false;
  }

  const domainDtoFactoryMethod = domainDtoFactoryTemplate
    .replace(/@Domain@/g, () => capitalize(domainName))
    .replace(/@domain@/g, `${domainName}`);

  const domainDtoFactoryMethodPath = path
    .join(__dirname, '..', 'factories', 'domain-dto.factory.ts')
    .replace('/dist', '');

  await fs.writeFile(domainDtoFactoryMethodPath, domainDtoFactoryMethod, {
    encoding: 'utf-8',
  });

  return true;
}
