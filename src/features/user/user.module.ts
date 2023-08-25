import { Module } from '@nestjs/common';
// import * as resolvers from './resolvers';
// import * as usecases from './usecases';
import { UserRepo } from './repositories/user.repo';
import { SignupLocalUsecase } from './usecases/signupLocal.usecase';
import { SignupLocalResolver } from './resolvers';
import { AppModule } from '@app/app.module';
import { AuthModule } from '@features/auth/auth.module';

@Module({
  imports: [AppModule, AuthModule],
  providers: [UserRepo, SignupLocalUsecase, SignupLocalResolver],
})
export class UserModule {}
