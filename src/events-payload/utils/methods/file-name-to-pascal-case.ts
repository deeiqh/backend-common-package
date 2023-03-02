export function fileNameToPascalCase(fileName: string) {
  return fileName
    .replace(/-[a-z]/g, (c) => c[1].toUpperCase())
    .replace(/^\w/, (c) => c.toUpperCase())
    .replace('.ts', '');
}
