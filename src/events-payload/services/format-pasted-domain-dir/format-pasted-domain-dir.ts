import { Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import * as path from 'path';
import { capitalize } from 'src/events-payload/utils/capitalize';
import { formatImports } from './services/format-imports';
import { formatPropsFiles } from './services/format-props-files';

export async function formatPastedDomainDir(
  domainName: string,
): Promise<boolean> {
  const logger = new Logger('formatPastedDomainDir');

  const domainFolderPath = path
    .join(__dirname, '..', '..', 'domain')
    .replace('/dist', '');

  const domainFolderInterfacePath = path
    .join(domainFolderPath, 'interfaces', `${domainName}.interface.ts`)
    .replace('/dist', '');

  let domainInterfaceContent: string;
  try {
    domainInterfaceContent = await fs.readFile(domainFolderInterfacePath, {
      encoding: 'utf-8',
    });
  } catch (err) {
    logger.warn(
      `\nTo create or update the ${capitalize(
        domainName,
      )}Dto please paste the 'domain' directory from ${domainName} service in\n  ${domainFolderPath.replace(
        /(.+)\/(.+)/,
        '$1',
      )} then restart`,
    );
    return false;
  }

  const domainProps: Record<string, string> = {
    required: '',
    optional: '',
  };

  const imports = formatImports(
    domainInterfaceContent,
    domainProps,
    domainName,
  );

  const domainNewContentFolderPath = path
    .join(__dirname, '..', '..', 'domain-replaced')
    .replace('/dist', '');

  try {
    await fs.mkdir(domainNewContentFolderPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      await fs.rm(domainNewContentFolderPath, { recursive: true, force: true });
      await fs.mkdir(domainNewContentFolderPath);
    } else {
      throw err;
    }
  }

  const dtoContent = `${imports}\nexport class ${capitalize(
    domainName,
  )}Props {  ${domainProps.required}  ${domainProps.optional}}\n`;

  await fs.writeFile(
    path.join(domainNewContentFolderPath, `${domainName}.ts`),
    dtoContent,
  );

  const domainFolderFiles = await fs.readdir(domainFolderPath);
  if (
    !(await formatPropsFiles(
      domainFolderFiles,
      domainName,
      domainFolderPath,
      logger,
      domainNewContentFolderPath,
    ))
  ) {
    return false;
  }

  logger.log(
    `Pasted ${domainName} directory was formatted\n  If ${capitalize(
      domainName,
    )}Dto was not created please restart`,
  );
  return true;
}
