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

  const domainFolderInterfacePath = path
    .join(domainFolderPath, 'interfaces', `${domainName}.interface.ts`)
    .replace('/dist', '');

  let domainInterfaceContent: string;
  try {
    domainInterfaceContent = await fs.readFile(domainFolderInterfacePath, {
      encoding: 'utf-8',
    });
  } catch (err) {
    logger.error(
      `\nCan't open ${domainFolderPath}.\n  Please paste the 'domain' directory from ${domainName} service`,
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
    if (err.code !== 'EEXIST') {
      throw err;
    }
  }

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

  const dtoContent = `${imports}\nexport class ${capitalize(
    domainName,
  )}Props {  ${domainProps.required}  ${domainProps.optional}}\n`;

  await fs.writeFile(
    path.join(domainNewContentFolderPath, `${domainName}.ts`),
    dtoContent,
  );

  logger.log(`Pasted ${domainName} directory was formatted.`);
  return true;
}

///////////////////
///////////////////
///////////////////
///////////////////
///////////////////
///////////////////
///////////////////

function getpropsRegex(propsType: string) {
  return new RegExp(`(.+)(interface) (\\w+${propsType}) {([^}]+)}(.+)`, 's');
}

function addProps(
  propsType: string,
  propsValue: string,
  domainProps: Record<string, string>,
  domainName: string,
) {
  domainProps[propsType] = propsValue
    .replace(/(.+: )([^;]+)/g, '$1$2Props = new $2Props()')
    .replace(/booleanProps = new booleanProps\(\)/g, 'boolean = false');

  return domainProps[propsType]
    .replace(
      /(\w+)(\??): ([^=]+)(.+)/g,
      (match: string, property: string, optional: string, type: string) =>
        `import { ${type}} from './${domainName}-${property}';`,
    )
    .replace(/import { boolean } from (.+)\n/g, '');
}

function formatImports(
  domainInterface: string,
  domainProps: Record<string, string>,
  domainName: string,
) {
  let imports = '';

  imports += addProps(
    'required',
    domainInterface.replace(getpropsRegex('RequiredProps'), '$4'),
    domainProps,
    domainName,
  );

  imports += addProps(
    'optional',
    domainInterface.replace(getpropsRegex('OptionalProps'), '$4'),
    domainProps,
    domainName,
  );

  const onlyOneImport = new Set<string>();
  const repeatedImports: string[] = [];

  imports = fixImportPathAndRemoveDuplicates(
    imports,
    onlyOneImport,
    repeatedImports,
  ).join('');

  repeatedImports.forEach((property) => {
    const regex = new RegExp(`(import { ${property} } from './)(.+)-(.+)`);
    imports = imports.replace(regex, `$1$2';`);
  });

  return imports;
}

function fixImportPathAndRemoveDuplicates(
  imports: string,
  onlyOneImport: Set<string>,
  repeatedImports: string[],
): string[] {
  return imports.split('\n').map((oneImport) => {
    if (!oneImport.includes('import')) return '';

    const split = oneImport.split('./');
    const part = split[1].replace(/([A-Z])/g, '-$1').toLowerCase();
    const [check, ...rest] = part.split('-');

    let final = part;

    if (check === rest[0]) {
      final = rest.join('-');
    }

    const property = oneImport.replace(/(.+){ (\w+) }(.+)/, '$2');

    if (onlyOneImport.has(property)) {
      repeatedImports.push(property);
      return '';
    }

    onlyOneImport.add(property);

    return split[0] + './' + final + '\n';
  });
}

async function formatPropsFiles(
  domainFolderFiles: string[],
  domainName: string,
  domainFolderPath: string,
  logger: Logger,
  domainNewContentFolderPath: string,
): Promise<boolean> {
  for (const propFileName of domainFolderFiles) {
    if (propFileName.search(`${domainName}-`) !== -1) {
      const propFilePath = path.join(domainFolderPath, propFileName);

      const propFileContentRaw = await fs.readFile(propFilePath, {
        encoding: 'utf-8',
      });

      const regex = new RegExp(
        `(.+)interface I?(${fileNameToPascalCase(
          propFileName,
        )}Props) ({([a-z]|[A-Z]|[0-9]|:|;|{|};|\\s|\\]|\\[|\\?|_)+}\n)(.+)`,
        's',
      );

      const propFileContent = propFileContentRaw.replace(
        regex,
        'export class $2 $3',
      );

      if (
        propFileContent === propFileContentRaw &&
        propFileContentRaw.slice(0, 'export class'.length) !== 'export class'
      ) {
        logger.error(`Can't parse ${propFileName}`);
        return false;
      }

      const linePropFormatTemplate = (
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

      const fixedPropFileContent = propFileContent
        .replace(
          /\n(    |      |        )?(  )?(\w+)(\?)?: (\w+(\[\])?);/g,
          (match, spaces4orMany, spaces2, property, optional, type) => {
            switch (type) {
              case 'string':
                return linePropFormatTemplate(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  `'some-string'`,
                );
              case 'number':
                return linePropFormatTemplate(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  '1',
                );
              case 'boolean':
                return linePropFormatTemplate(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  'false',
                );
              case 'Date':
                return linePropFormatTemplate(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  'new Date()',
                );
              case 'any':
                return linePropFormatTemplate(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  'undefined',
                  'any',
                );
              case 'string[]':
                return linePropFormatTemplate(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  `['some-string']`,
                );
              case 'number[]':
                return linePropFormatTemplate(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  `[1]`,
                );
              case 'boolean[]':
                return linePropFormatTemplate(
                  spaces4orMany,
                  spaces2,
                  property,
                  optional,
                  `[false]`,
                );
              default:
                return linePropFormatTemplate(
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
        path.join(domainNewContentFolderPath, propFileName),
        fixedPropFileContent,
        {
          encoding: 'utf-8',
        },
      );
    }
  }

  return true;
}
