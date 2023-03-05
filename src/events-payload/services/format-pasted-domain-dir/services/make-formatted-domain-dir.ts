import * as fs from 'fs/promises';
import * as path from 'path';

export async function makeFormattedDomainDir(): Promise<string> {
  const domainNewContentDirPath = path
    .join(__dirname, '..', '..', '..', 'formatted-domain')
    .replace('/dist', '');

  try {
    await fs.mkdir(domainNewContentDirPath);
  } catch (err) {
    if (err.code === 'EEXIST') {
      await fs.rm(domainNewContentDirPath, { recursive: true, force: true });
      await fs.mkdir(domainNewContentDirPath);
    } else {
      throw err;
    }
  }

  return domainNewContentDirPath;
}
