import { formatPastedDomainDir } from './format-pasted-domain-dir';
import { generateDomainDtoFactory } from './generate-domain-dto-factory';
import { domainDtoFactory } from '../domain-dto.factory';

export async function generateDomainDto(
  domainNameRaw: string,
): Promise<boolean> {
  const domainName = domainNameRaw.toLowerCase();

  return (
    domainName !== '' &&
    (await formatPastedDomainDir(domainName)) &&
    (await generateDomainDtoFactory(domainName)) &&
    (await domainDtoFactory())
  );
}
