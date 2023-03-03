export class AuthenticationDto {
  email?: string;
  userId?: string;
  password?: Password;
  session?: Session;
  isRetricted?: boolean;
}
export class Session {
  userId?: string;
  session?: string;
  refreshToken?: string;
}
export class Password {
  value?: string;
  hashed?: boolean;
}
