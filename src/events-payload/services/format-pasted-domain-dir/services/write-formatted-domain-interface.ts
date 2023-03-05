import { capitalize } from 'src/events-payload/utils/capitalize';
import { makeFormattedDomainDir } from './make-formatted-domain-dir';
import * as fs from 'fs/promises';
import * as path from 'path';
import { DomainInterface } from '../types/domain-interface.type';

export async function writeFormattedDomainInterface(
  domainInterface: DomainInterface,
  domainName: string,
): Promise<string> {
  const formattedDomainInterface = `${
    domainInterface.imports
  }\nexport class ${capitalize(domainName)}Props {  ${
    domainInterface.props.required
  }  ${domainInterface.props.optional}}\n`;

  const formattedDomainDirPath = await makeFormattedDomainDir();

  await fs.writeFile(
    path.join(formattedDomainDirPath, `${domainName}.ts`),
    formattedDomainInterface,
  );

  return formattedDomainDirPath;
}
