import * as fs from 'fs/promises';
import * as path from 'path';
import { capitalize } from 'src/events-payload/utils/methods/capitalize';

export async function generateDomainDtoFactory(
  domainName: string,
): Promise<boolean> {
  const templatePath = path
    .join(__dirname, '..', 'templates', 'domain-dto-factory.template.ts')
    .replace('/dist', '');

  const template = await fs.readFile(templatePath, { encoding: 'utf-8' });

  const domainDtoFactory = template
    .replace(/@Domain@/g, () => capitalize(domainName))
    .replace(/@domain@/g, `${domainName}`);

  const newFilePath = path
    .join(__dirname, '..', 'domain-dto.factory.ts')
    .replace('/dist', '');

  await fs.writeFile(newFilePath, domainDtoFactory, { encoding: 'utf-8' });

  return true;
}
