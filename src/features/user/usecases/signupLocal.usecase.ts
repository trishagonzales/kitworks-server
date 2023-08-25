import { Injectable } from '@nestjs/common';
import { Usecase } from 'src/core/Usecase';
import { UserViewData } from '../view-objects/UserData';
import { CreateUserArg } from '../data-objects/CreateUserArg';
import { User } from '../domain/User';
import { UserRepo } from '../repositories/user.repo';
import { AuthProvider } from '@features/auth/auth.provider';
import { Result } from '@core/Result';
import { AuthTokens } from '@features/auth/data-objects/AuthTokens';
import { UserMap } from '../mappers/user.map';

type Input = {
  email: string;
  password: string;
};
type Output = {
  userData: UserViewData;
  authTokens: AuthTokens;
};

@Injectable()
export class SignupLocalUsecase implements Usecase<Input, Output> {
  constructor(private userRepo: UserRepo, private auth: AuthProvider) {}

  async execute(input: Input) {
    const arg = new CreateUserArg({
      email: input.email,
      password: input.password,
    });
    const userOrError = await User.create(arg);
    if (userOrError.isFail) return Result.fail(userOrError.error);

    const user = userOrError.data;
    await this.userRepo.save(user);
    const authTokens = await this.auth.login(user);

    return Result.ok({
      userData: new UserViewData(UserMap.toView(user)),
      authTokens,
    });
  }
}
