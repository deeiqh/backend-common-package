import * as path from 'path';
import * as fs from 'fs/promises';
import { fileNameToPascalCase } from 'src/events-payload/utils/methods/file-name-to-pascal-case';
import { Logger } from '@nestjs/common';
import { capitalize } from 'src/events-payload/utils/methods/capitalize';

export async function formatPastedDomainDir(
  domainName: string,
): Promise<boolean> {
  const logger = new Logger('Format pasted domain dir');

  const domainFolderPath = path
    .join(__dirname, '..', '..', 'domain')
    .replace('/dist', '');

  const domainInterfacePath = path
    .join(domainFolderPath, 'interfaces', `${domainName}.interface.ts`)
    .replace('/dist', '');

  let domainInterface;

  try {
    domainInterface = await fs.readFile(domainInterfacePath, {
      encoding: 'utf-8',
    });
  } catch (err) {
    logger.error(
      `\nCan't open ${domainFolderPath}.\n  Please paste the 'domain' directory from ${domainName} service`,
    );
    return false;
  }

  const props = {
    required: '',
    optional: '',
  };
  let imports = '';

  const requiredProps = domainInterface.replace(
    /(.+)(interface) (\w+RequiredProps) {([^}]+)}(.+)/s,
    '$4',
  );
  props.required = requiredProps
    .replace(/(.+: )([^;]+)/g, '$1$2Props = new $2Props()')
    .replace(/booleanProps = new booleanProps\(\)/g, 'boolean = false');

  imports += props.required
    .replace(/(\w+): ([^=]+)(.+)/g, `import { $2} from './${domainName}-$1';`)
    .replace(/import { boolean } from (.+)\n/g, '');

  const optionalProps = domainInterface.replace(
    /(.+)(interface) (\w+OptionalProps) {([^}]+)}(.+)/s,
    '$4',
  );
  props.optional = optionalProps
    .replace(/(.+: )([^;]+)/g, '$1$2Props = new $2Props()')
    .replace(/booleanProps = new booleanProps\(\)/g, 'boolean = false');

  imports += props.optional
    .replace(/(\w+)\?: ([^=]+)(.+)/g, `import { $2} from './${domainName}-$1';`)
    .replace(/import { boolean } from (.+)\n/g, '');

  const onlyOnce = new Set<string>();
  const toDeleteCounter: string[] = [];

  const fixedImportFile = imports.split('\n').map((oneImport) => {
    if (!oneImport.includes('import')) return '';
    const split = oneImport.split('./');
    const part = split[1].replace(/([A-Z])/g, '-$1').toLowerCase();
    const [check, ...rest] = part.split('-');
    let final = part;
    if (check === rest[0]) {
      final = rest.join('-');
    }

    const property = oneImport.replace(/(.+){ (\w+) }(.+)/, '$2');

    if (onlyOnce.has(property)) {
      toDeleteCounter.push(property);
      return '';
    }
    onlyOnce.add(property);

    return split[0] + './' + final + '\n';
  });

  imports = fixedImportFile.join('');

  toDeleteCounter.forEach((property) => {
    const regex = new RegExp(`(import { ${property} } from './)(.+)-(.+)`);
    imports = imports.replace(regex, `$1$2';`);
  });

  const files = await fs.readdir(domainFolderPath);

  let fileContent;

  const domainNewContentFolderPath = path
    .join(__dirname, '..', '..', 'domain-replaced')
    .replace('/dist', '');
  try {
    await fs.mkdir(domainNewContentFolderPath);
  } catch (err) {
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

  for (const fileName of files) {
    if (fileName.search(`${domainName}-`) !== -1) {
      const filePath = path.join(domainFolderPath, fileName);
      fileContent = await fs.readFile(filePath, { encoding: 'utf-8' });

      const regex = new RegExp(
        `(.+)interface I?(${fileNameToPascalCase(
          fileName,
        )}Props) ({([a-z]|[A-Z]|[0-9]|:|;|{|};|\\s|\\]|\\[|\\?|_)+}\n)(.+)`,
        's',
      );
      const fixedFileContent = fileContent.replace(regex, 'export class $2 $3');

      if (
        fixedFileContent === fileContent &&
        'export class' !== fileContent.slice(0, 'export class'.length)
      ) {
        logger.error(`Can't parse ${fileName}`);
        return false;
      }

      const template = (
        spaces4orMany: string | undefined,
        spaces2: string | undefined,
        property: string,
        optional: string,
        initValue: string,
        type = '',
      ) => {
        let assignSymbol: string;
        if (spaces4orMany) {
          assignSymbol = ':';
        } else {
          assignSymbol = ' =';
        }

        const base = `\n${spaces4orMany ?? ''}${spaces2 ?? ''}${property}${
          optional ?? ''
        }`;

        let assign = `${assignSymbol} ${initValue};`;
        if (assignSymbol === ':') {
          assign = `${assignSymbol} ${initValue},`;
        }

        if (type) {
          return `${base}: ${type} = ${initValue};`;
        }
        return `${base}${assign}`;
      };

      const initializedFileContent = fixedFileContent
        .replace(
          /\n(    |      |        )?(  )?(\w+)(\?)?: (\w+(\[\])?);/g,
          (match, spaces4orMany, spaces2, property, optional, type) => {
            switch (type) {
              case 'string':
                return template(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  `'some-string'`,
                );
              case 'number':
                return template(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  '1',
                );
              case 'boolean':
                return template(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  'false',
                );
              case 'Date':
                return template(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  'new Date()',
                );
              case 'any':
                return template(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  'undefined',
                  'any',
                );
              case 'string[]':
                return template(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  `['some-string']`,
                );
              case 'number[]':
                return template(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  `[1]`,
                );
              case 'boolean[]':
                return template(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  `[false]`,
                );
              default:
                return template(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  `'some-string'`,
                );
            }
          },
        )
        .replace(/: {/g, ' = {');

      await fs.writeFile(
        path.join(domainNewContentFolderPath, fileName),
        initializedFileContent,
        {
          encoding: 'utf-8',
        },
      );
    }
  }

  const dtoContent = `${imports}\nexport class ${capitalize(
    domainName,
  )}Props {  ${props.required}  ${props.optional}}\n`;

  await fs.writeFile(
    path.join(domainNewContentFolderPath, `${domainName}.ts`),
    dtoContent,
  );

  logger.log(`Pasted ${domainName} directory was formatted.`);
  return true;
}
