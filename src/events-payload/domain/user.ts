import { UserAddressProps } from './user-address';
import { UserAnnualIncomeProps } from './user-annual-income';
import { UserBrokerApplicationDataProps } from './user-broker-application-data';
import { UserCityProps } from './user-city';
import { UserCountryProps } from './user-country';
import { UserDateOfBirthProps } from './user-date-of-birth';
import { UserDocumentsProps } from './user-documents';
import { UserEmailProps } from './user-email';
import { UserEmployerNameProps } from './user-employer-name';
import { UserEmployerPositionProps } from './user-employer-position';
import { UserEmploymentStatusProps } from './user-employment-status';
import { UserIdProps } from './user-id';
import { UserInvestmentExperienceProps } from './user-investment-experience';
import { UserInvestmentObjectiveProps } from './user-investment-objective';
import { UserLanguageProps } from './user-language';
import { UserLastNameProps } from './user-last-name';
import { UserNameProps } from './user-name';
import { UserPasswordProps } from './user-password';
import { UserPhoneProps } from './user-phone';
import { UserPostalCodeProps } from './user-postal-code';
import { UserProvinceProps } from './user-province';
import { UserSourceOfIncomeProps } from './user-source-of-income';
import { UserStatusProps } from './user-status';
import { UserTotalNetWorthProps } from './user-total-networth';

export class UserRequiredProps {
  id: UserIdProps = new UserIdProps();
  status: UserStatusProps = new UserStatusProps();
  email: UserEmailProps = new UserEmailProps();
  password: UserPasswordProps = new UserPasswordProps();
  country: UserCountryProps = new UserCountryProps();
  phone: UserPhoneProps = new UserPhoneProps();
  language: UserLanguageProps = new UserLanguageProps();
}

export class UserOptionalProps extends UserRequiredProps {
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
  totalNetworth?: UserTotalNetWorthProps = new UserTotalNetWorthProps();
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

export class UserProps extends UserOptionalProps {}
