import { domainDtoFactory } from '../factories/domain-dto.factory';
import { formatPastedDomainDir } from './format-pasted-domain-dir/format-pasted-domain-dir';
import { generateDomainDtoFactory } from './generate-domain-dto-factory';

export async function generateDomainDto(
  domainNameRaw?: string,
): Promise<boolean> {
  if (!domainNameRaw) {
    return false;
  }

  const domainName = domainNameRaw.toLowerCase();

  return (
    (await formatPastedDomainDir(domainName)) &&
    (await generateDomainDtoFactory(domainName)) &&
    (await domainDtoFactory())
  );
}
