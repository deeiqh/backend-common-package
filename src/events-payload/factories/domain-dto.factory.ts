import { formatPastedDomainDir } from './methods/format-pasted-domain-dir';
import { generatedDomainDtoFactory } from './generated-domain-dto.factory';

export async function domainDtoFactory(
  domainNameRaw: string,
): Promise<boolean> {
  return (
    domainNameRaw !== '' &&
    (await formatPastedDomainDir(domainNameRaw.toLowerCase())) &&
    //await generateDomainDtoFactory(domainName);

    (await generatedDomainDtoFactory())
  );
}
