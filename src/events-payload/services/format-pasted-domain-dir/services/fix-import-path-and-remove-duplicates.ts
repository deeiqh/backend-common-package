export function fixImportPathAndRemoveDuplicates(
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
