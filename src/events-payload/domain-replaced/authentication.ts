  import { AuthenticationEmailProps } from './authentication-email';
  import { AuthenticationUserIdProps } from './authentication-user-id';
  import { AuthenticationPasswordProps } from './authentication-password';
  import { AuthenticationSessionProps } from './authentication-session';

export class AuthenticationProps {  
  email: AuthenticationEmailProps = new AuthenticationEmailProps();
  userId: AuthenticationUserIdProps = new AuthenticationUserIdProps();
  password: AuthenticationPasswordProps = new AuthenticationPasswordProps();
  session?: AuthenticationSessionProps = new AuthenticationSessionProps();
  isRetricted = false;
  }
