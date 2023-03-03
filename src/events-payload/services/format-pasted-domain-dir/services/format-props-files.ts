import { Logger } from '@nestjs/common';
import * as path from 'path';
import * as fs from 'fs/promises';
import { linePropFormatTemplate } from './line-prop-format-template';
import { fileNameToPascalCase } from 'src/events-payload/utils/file-name-to-pascal-case';

export async function formatPropsFiles(
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
        logger.error(`Can't parse ${propFileName}. Fix it please then restart`);
        return false;
      }

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
