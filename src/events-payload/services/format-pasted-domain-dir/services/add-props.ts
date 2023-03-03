export function addProps(
  propsType: string,
  propsValue: string,
  domainProps: Record<string, string>,
  domainName: string,
): string {
  domainProps[propsType] = propsValue
    .replace(/(.+: )([^;]+)/g, '$1$2Props = new $2Props()')
    .replace(/: booleanProps = new booleanProps\(\)/g, ' = false');

  return domainProps[propsType]
    .replace(
      /(\w+)(\??): ([^=]+)(.+)/g,
      (match: string, property: string, optional: string, type: string) =>
        `import { ${type}} from './${domainName}-${property}';`,
    )
    .replace(/import { boolean } from (.+)\n/g, '');
}
