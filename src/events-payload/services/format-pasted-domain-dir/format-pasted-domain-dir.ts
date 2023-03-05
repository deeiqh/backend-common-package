import { Logger } from '@nestjs/common';
import * as fs from 'fs/promises';
import { capitalize } from 'src/events-payload/utils/capitalize';
import { formatDomainInterfaceFile } from './services/format-domain-interface-file';
import { formatRawPropsFiles } from './services/format-raw-props-files';
import { readDomainInterfaceFileContent } from './services/read-domain-interface-file-content';
import { writeFormattedDomainInterface } from './services/write-formatted-domain-interface';

export async function formatPastedDomainDir(
  domainName: string,
): Promise<boolean> {
  const logger = new Logger('formatPastedDomainDir');

  const { domainDirPath, domainInterfaceFileContent } =
    await readDomainInterfaceFileContent(domainName, logger);

  if (!domainInterfaceFileContent) {
    return false;
  }

  const domainInterface = {
    imports: '',
    props: { required: '', optional: '', all: '' },
  };

  formatDomainInterfaceFile(
    domainInterfaceFileContent,
    domainInterface,
    domainName,
  );

  const formattedDomainDirPath = await writeFormattedDomainInterface(
    domainInterface,
    domainName,
  );

  const domainDirFiles = await fs.readdir(domainDirPath);

  if (
    !(await formatRawPropsFiles(
      domainDirFiles,
      domainName,
      domainDirPath,
      logger,
      formattedDomainDirPath,
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
