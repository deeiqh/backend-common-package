import { addProps } from './add-props';
import { fixImportPathAndRemoveDuplicates } from './fix-import-path-and-remove-duplicates';
import { getpropsRegex } from './get-props-regex';

export function formatImports(
  domainInterface: string,
  domainProps: Record<string, string>,
  domainName: string,
): string {
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
