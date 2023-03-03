export function linePropFormatTemplate(
  spaces4orMany: string | undefined,
  spaces2: string | undefined,
  property: string,
  optional: string,
  initValue: string,
  type = '',
): string {
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
}
