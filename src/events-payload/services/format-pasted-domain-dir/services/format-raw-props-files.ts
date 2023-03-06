import { Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import { linePropFormatTemplate } from './line-prop-format-template';
import { fileNameToPascalCase } from 'src/events-payload/utils/file-name-to-pascal-case';
import { restartDomainDtoFactory } from '../../restart-domain-dto-factory';

export async function formatRawPropsFiles(
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

      let propFileContent: string;
      const withPropsInterface = new RegExp(
        `(.*)interface I?(${fileNameToPascalCase(
          propFileName,
        )}Props) ({([a-z]|[A-Z]|[0-9]|:|;|{|};|\\s|\\]|\\[|\\?|_)*}\n)(.*)`,
        's',
      );
      if (!withPropsInterface.exec(propFileContentRaw)) {
        const withoutPropsInterface = new RegExp(
          `(.*)export class (${fileNameToPascalCase(
            propFileName,
          )}) ({\.+\\w+: \\w+;)(.+)`,
          's',
        );
        propFileContent = propFileContentRaw.replace(
          withoutPropsInterface,
          'export class $2Props $3\n}\n',
        );
      } else {
        propFileContent = propFileContentRaw.replace(
          withPropsInterface,
          'export class $2 $3',
        );
      }

      if (
        (propFileContent === propFileContentRaw &&
          'export class' !==
            propFileContentRaw.slice(0, 'export class'.length)) ||
        propFileName.replace(/(\w+)-(.*)/s, '$1') !== domainName
      ) {
        restartDomainDtoFactory();
        logger.error(`Can't parse ${propFileName}. Fix it please then restart`);
        return false;
      }

      const fixedPropFileContent = propFileContent
        .replace(
          /\n(    |      |        )?(  )?(\w+)(\?)?: (\w+(\[\])?);/g,
          (match, spaces4orMany, spaces2, property, optional, type) => {
            type = type.replace(/(\w+)Enum/, 'string');

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
                  'undefined',
                  'any',
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
