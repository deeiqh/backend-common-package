import * as path from 'path';
import * as fs from 'fs/promises';
import { fileNameToPascalCase } from 'src/events-payload/utils/methods/file-name-to-pascal-case';
import { Logger } from '@nestjs/common';

export async function formatPastedDomainDir(
  domainName: string,
): Promise<boolean> {
  const domainFolderPath = path
    .join(__dirname, '..', '..', 'domain')
    .replace('/dist', '');

  const domainInterfacePath = path
    .join(domainFolderPath, 'interfaces', `${domainName}.interface.ts`)
    .replace('/dist', '');

  const domainInterface = await fs.readFile(domainInterfacePath, {
    encoding: 'utf-8',
  });

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

  files.forEach(async (fileName) => {
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
      // console.log(fixedFileContent);
      //r = new RegExp(`(.+)export interface UserBrokerApplicationDataProps {([a-z]|[A-Z]|[0-9]|:|;|{|};|\\s)+}\n(.+)`,'s')

      if (
        fixedFileContent === fileContent &&
        'export class' !== fileContent.slice(0, 'export class'.length)
      ) {
        const logger = new Logger('Format pasted domain dir');
        logger.error(`Can't parse ${fileName}`);
        return false;
      }
      return true;
      const template = (str: string, type = '') => {
        const base = ` = ${str};`;
        if (type) {
          return `: ${type}${base}`;
        }
        return base;
      };
      const initializedFileContent = fixedFileContent.replace(
        /: (\w+(\[\])?);/g,
        (f, g) => {
          switch (g) {
            case 'string':
              return template(`'some-string'`);
            case 'number':
              return template('1');
            case 'boolean':
              return template('false');
            case 'Date':
              return template('new Date()');
            case 'any':
              return template('undefined', 'any');
            case 'string[]':
              return template(`['some-string']`);
            case 'number[]':
              return template(`[1]`);
            case 'boolean[]':
              return template(`[false]`);
            default:
              return template(`'some-string'`);
          }
        },
      );

      // const fixObjects = initializedFileContent.repl;

      await fs.writeFile(
        path.join(domainNewContentFolderPath, fileName),
        initializedFileContent,
        {
          encoding: 'utf-8',
        },
      );
    }
  });

  return true;
}
