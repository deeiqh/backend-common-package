import { Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { capitalize } from 'src/events-payload/utils/capitalize';

export async function readDomainInterfaceFileContent(
  domainName: string,
  logger: Logger,
): Promise<{
  domainDirPath: string;
  domainInterfaceFileContent: string;
}> {
  const domainDirPath = path
    .join(__dirname, '..', '..', '..', 'domain')
    .replace('/dist', '');

  const domainDirInterfacePath = path
    .join(domainDirPath, 'interfaces', `${domainName}.interface.ts`)
    .replace('/dist', '');

  let domainInterfaceFileContent = '';

  try {
    domainInterfaceFileContent = await fs.readFile(domainDirInterfacePath, {
      encoding: 'utf-8',
    });
  } catch (err) {
    logger.warn(
      `\nTo create or update the ${capitalize(
        domainName,
      )}Dto please paste the 'domain' directory from ${domainName} service in\n  ${domainDirPath.replace(
        /(.+)\/(.+)/,
        '$1',
      )} then restart`,
    );
  }

  return {
    domainDirPath,
    domainInterfaceFileContent,
  };
}
