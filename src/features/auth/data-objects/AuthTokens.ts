export class AuthTokens {
  constructor(
    public readonly refreshToken: string,
    public readonly accessToken: string,
  ) {}
}
