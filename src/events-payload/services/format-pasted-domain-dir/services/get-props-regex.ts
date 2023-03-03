export function getpropsRegex(propsType: string): RegExp {
  return new RegExp(`(.*)(interface) (\\w+${propsType}) {([^}]*)}(.*)`, 's');
}
