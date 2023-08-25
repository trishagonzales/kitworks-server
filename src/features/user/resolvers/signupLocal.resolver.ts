import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { Request } from '@nestjs/common';
import { SignupInput } from './input/signup.input';
import { SignupLocalUsecase } from '../usecases/signupLocal.usecase';

@Resolver()
export class SignupLocalResolver {
  constructor(private signupLocalUsecase: SignupLocalUsecase) {}

  @Mutation()
  async signupLocal(
    @Args('input') input: SignupInput,
    @Request() req: Express.Request,
  ) {
    const result = await this.signupLocalUsecase.execute({
      email: input.email,
      password: input.password,
    });
    if (result.isFail) throw result.error;

    const { refreshToken, accessToken } = result.data.authTokens;
    req.session.sub = refreshToken;

    return accessToken;
  }
}
