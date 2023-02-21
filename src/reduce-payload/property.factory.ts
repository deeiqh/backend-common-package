export function propertyFactory(type: string): any {
  switch (type) {
    case 'string':
      return 'some-string';
    case 'number':
      return 1;
    case 'boolean':
      return false;
    default:
      return null;
  }
}
