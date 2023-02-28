interface IUserProps {
  id: string;
  status: string;
  email: string;
  password: Password;
  country: string;
  phone: string;
  language: string;
  name: string;
  lastName: string;
  addressOne: string;
  addressTwo: string;
  city: string;
  province: string;
  postalCode: string;
  employmentStatus: string;
  employerName: string;
  employerPosition: string;
  investmentExperience: string;
  investmentObjective: string;
  annualIncome: string;
  totalNetworth: string;
  sourceOfIncome: string;
  documents: Documents;
  dateOfBirth: Date;
  userBrokerApplicationData: UserBrokerApplicationData;
  isNotFamilyBrokerOwner: boolean;
  isNotFamilyBrokerWorker: boolean;
  isNotPoliticallyExposedPerson: boolean;
  isHapiAgreement: boolean;
  isDisclaimerLeadingProgram: boolean;
}
interface UserBrokerApplicationData {
  providerId: string;
  providerName: string;
  externalId: string;
  application: Application;
}
interface Application {
  givenName: string;
  familyName: string;
  legalName: string;
  streetAddress: string[];
  employer: string;
  city: string;
  postalCode: string;
}
interface Documents {
  frontDocument: string;
  backDocument: string;
  documentData: any;
}
interface Password {
  value: string;
  hashed: boolean;
}
