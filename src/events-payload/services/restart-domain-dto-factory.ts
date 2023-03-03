import * as fs from 'fs/promises';
import * as path from 'path';

export async function restartDomainDtoFactory(): Promise<boolean> {
  const domainDtoFactoryPath = path
    .join(__dirname, '..', 'factories', 'domain-dto.factory.ts')
    .replace('/dist', '');

  const resetContent = `export async function domainDtoFactory(): Promise<boolean> {\n  return true;\n}\n`;

  await fs.writeFile(domainDtoFactoryPath, resetContent, { encoding: 'utf-8' });

  return true;
}
