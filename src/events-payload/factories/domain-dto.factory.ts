import { formatPastedDomainDir } from './methods/format-pasted-domain-dir';
import { generateDomainDtoFactory } from './methods/generate-domain-dto-factory';

export async function domainDtoFactory(domainNameRaw: string): Promise<void> {
  const domainName = domainNameRaw.toLowerCase();

  await formatPastedDomainDir(domainName);

  const domainDtoFactory = await generateDomainDtoFactory(domainName);
  domainDtoFactory();
}
