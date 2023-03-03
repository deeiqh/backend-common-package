import { UserIdProps } from './user-id';
import { UserStatusProps } from './user-status';
import { UserEmailProps } from './user-email';
import { UserPasswordProps } from './user-password';
import { UserCountryProps } from './user-country';
import { UserPhoneProps } from './user-phone';
import { UserLanguageProps } from './user-language';
import { UserNameProps } from './user-name';
import { UserLastNameProps } from './user-last-name';
import { UserAddressProps } from './user-address';
import { UserCityProps } from './user-city';
import { UserProvinceProps } from './user-province';
import { UserPostalCodeProps } from './user-postal-code';
import { UserEmploymentStatusProps } from './user-employment-status';
import { UserEmployerNameProps } from './user-employer-name';
import { UserEmployerPositionProps } from './user-employer-position';
import { UserInvestmentExperienceProps } from './user-investment-experience';
import { UserInvestmentObjectiveProps } from './user-investment-objective';
import { UserAnnualIncomeProps } from './user-annual-income';
import { UserTotalNetworthProps } from './user-total-networth';
import { UserSourceOfIncomeProps } from './user-source-of-income';
import { UserDocumentsProps } from './user-documents';
import { UserDateOfBirthProps } from './user-date-of-birth';
import { UserBrokerApplicationDataProps } from './user-broker-application-data';

export class UserProps {
  id: UserIdProps = new UserIdProps();
  status: UserStatusProps = new UserStatusProps();
  email: UserEmailProps = new UserEmailProps();
  password: UserPasswordProps = new UserPasswordProps();
  country: UserCountryProps = new UserCountryProps();
  phone: UserPhoneProps = new UserPhoneProps();
  language: UserLanguageProps = new UserLanguageProps();

  name?: UserNameProps = new UserNameProps();
  lastName?: UserLastNameProps = new UserLastNameProps();
  addressOne?: UserAddressProps = new UserAddressProps();
  addressTwo?: UserAddressProps = new UserAddressProps();
  city?: UserCityProps = new UserCityProps();
  province?: UserProvinceProps = new UserProvinceProps();
  postalCode?: UserPostalCodeProps = new UserPostalCodeProps();
  employmentStatus?: UserEmploymentStatusProps =
    new UserEmploymentStatusProps();
  employerName?: UserEmployerNameProps = new UserEmployerNameProps();
  employerPosition?: UserEmployerPositionProps =
    new UserEmployerPositionProps();
  investmentExperience?: UserInvestmentExperienceProps =
    new UserInvestmentExperienceProps();
  investmentObjective?: UserInvestmentObjectiveProps =
    new UserInvestmentObjectiveProps();
  annualIncome?: UserAnnualIncomeProps = new UserAnnualIncomeProps();
  totalNetworth?: UserTotalNetworthProps = new UserTotalNetworthProps();
  sourceOfIncome?: UserSourceOfIncomeProps = new UserSourceOfIncomeProps();
  documents?: UserDocumentsProps = new UserDocumentsProps();
  dateOfBirth?: UserDateOfBirthProps = new UserDateOfBirthProps();
  userBrokerApplicationData?: UserBrokerApplicationDataProps =
    new UserBrokerApplicationDataProps();
  isNotFamilyBrokerOwner?: boolean = false;
  isNotFamilyBrokerWorker?: boolean = false;
  isNotPoliticallyExposedPerson?: boolean = false;
  isHapiAgreement?: boolean = false;
  isDisclaimerLeadingProgram?: boolean = false;
}
