export class ApplicationDto {
  id?: string;
  userId?: string;
  status?: string;
  apexStatus?: string;
  data?: any;
  broker?: Broker;
  accountNumber?: string;
  investigations?: Investigations;
  isActive?: boolean;
}
export class Investigations {
  state?: string;
  requestId?: string;
  accountNumber?: string;
  source?: string;
  sourceId?: string;
  detail?: any;
  evidenceFiles?: any;
  appealDescription?: any;
}
export class Broker {
  id?: string;
  providerId?: string;
  name?: string;
  signature?: string;
  token?: string;
}
