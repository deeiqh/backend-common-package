export class UserDto {
  id?: string;
  status?: string;
  email?: string;
  password?: Password;
  country?: string;
  phone?: string;
  language?: string;
  name?: string;
  lastName?: string;
  addressOne?: string;
  addressTwo?: string;
  city?: string;
  province?: string;
  postalCode?: string;
  employmentStatus?: string;
  employerName?: string;
  employerPosition?: string;
  investmentExperience?: string;
  investmentObjective?: string;
  annualIncome?: string;
  totalNetworth?: string;
  sourceOfIncome?: string;
  documents?: Documents;
  dateOfBirth?: Date;
  userBrokerApplicationData?: UserBrokerApplicationData;
  isNotFamilyBrokerOwner?: boolean;
  isNotFamilyBrokerWorker?: boolean;
  isNotPoliticallyExposedPerson?: boolean;
  isHapiAgreement?: boolean;
  isDisclaimerLeadingProgram?: boolean;
}
export class UserBrokerApplicationData {
  providerId?: string;
  providerName?: string;
  externalId?: string;
  application?: Application;
}
export class Application {
  givenName?: string;
  familyName?: string;
  legalName?: string;
  streetAddress?: string[];
  employer?: string;
  city?: string;
  postalCode?: string;
}
export class Documents {
  frontDocument?: string;
  backDocument?: string;
  documentData?: any;
}
export class Password {
  value?: string;
  hashed?: boolean;
}
