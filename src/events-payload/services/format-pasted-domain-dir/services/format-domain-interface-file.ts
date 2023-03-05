import { DomainInterface } from '../types/domain-interface.type';
import { addProps } from './add-props';
import { fixImportPathAndRemoveDuplicates } from './fix-import-path-and-remove-duplicates';
import { getpropsRegex } from './get-props-regex';

export function formatDomainInterfaceFile(
  domainInterfaceContent: string,
  domainInterface: DomainInterface,
  domainName: string,
): void {
  domainInterface.imports += addProps(
    'required',
    domainInterfaceContent.replace(getpropsRegex('RequiredProps'), '$4'),
    domainInterface.props,
    domainName,
  );

  domainInterface.imports += addProps(
    'optional',
    domainInterfaceContent.replace(getpropsRegex('OptionalProps'), '$4'),
    domainInterface.props,
    domainName,
  );

  const onlyOneImport = new Set<string>();
  const repeatedImports: string[] = [];

  domainInterface.imports = fixImportPathAndRemoveDuplicates(
    domainInterface.imports,
    onlyOneImport,
    repeatedImports,
  ).join('');

  repeatedImports.forEach((property) => {
    const regex = new RegExp(`(import { ${property} } from './)(.+)-(.+)`);
    domainInterface.imports = domainInterface.imports.replace(regex, `$1$2';`);
  });
}
