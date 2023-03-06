export class AuthenticationDto {
  authenticationId?: string;
  token?: string;
  provider?: string;
  credential?: string;
  isActive?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
