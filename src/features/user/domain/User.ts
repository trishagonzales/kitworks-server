import Entity from '@core/Entity';
import { Result } from '@core/Result';
import { Exception } from '@core/Exception';
import { Email } from './Email';
import { Password } from './Password';
import { Avatar } from './Avatar';
import { CreateUserArg } from '../data-objects/CreateUserArg';
import { ReconstructUserArg } from '../data-objects/ReconstructUserArg';

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  NOT_SPECIFIED = 'NOT_SPECIFIED',
}

type RequiredProps = {
  id: string;
  username: string;
  name: string;
  dateCreated: Date;
  email: Email;
};
type OptionalProps = {
  bio?: string;
  gender?: Gender;
  avatar?: Avatar;
  password?: Password;
  googleToken?: string;
};
type UserProps = RequiredProps & OptionalProps;

export class User extends Entity<UserProps> {
  private constructor(props: UserProps) {
    super(props);

    const noAuthMethodExist = !props.password && !props.googleToken;
    if (!noAuthMethodExist)
      throw Exception.devLogic({
        message: 'Atleast one auth method (password, google) should exist.',
        filename: 'User.ts',
      });
  }

  static async create(arg: CreateUserArg) {
    const emailOrError = Email.create(arg.email);
    const passwordOrError = await Password.create(arg.password);

    const combinedResults = Result.combine([emailOrError, passwordOrError]);
    if (combinedResults.isFail) return Result.fail(combinedResults.error);

    const email = emailOrError.data;
    const password = passwordOrError.data;
    const defaultNameAndUsername = email.value.split('@')[0];

    return Result.ok(
      new User({
        id: this.generateId(),
        email: email,
        password: password,
        username: defaultNameAndUsername,
        name: defaultNameAndUsername,
        dateCreated: new Date(),
      }),
    );
  }

  static reconstruct(arg: ReconstructUserArg) {
    const avatar =
      arg.avatarPublicId && arg.avatarPublicUrl
        ? Avatar.reconstruct({
            publicId: arg.avatarPublicId,
            publicUrl: arg.avatarPublicUrl,
          })
        : undefined;
    const email = Email.reconstruct(arg.email);
    const password = arg.password
      ? Password.reconstruct(arg.password)
      : undefined;

    return new User({
      id: arg.id,
      username: arg.username,
      name: arg.name,
      dateCreated: arg.dateCreated,
      bio: arg.bio,
      gender: arg.gender,
      avatar,
      email,
      password,
      googleToken: arg.googleToken,
    });
  }

  get username() {
    return this._props.username;
  }
  get name() {
    return this._props.name;
  }
  get dateCreated() {
    return this._props.dateCreated;
  }
  get email() {
    return this._props.email;
  }
  get bio() {
    return this._props.bio;
  }
  get gender() {
    return this._props.gender;
  }
  get avatar() {
    return this._props.avatar;
  }
  get password() {
    return this._props.password;
  }
  get googleToken() {
    return this._props.googleToken;
  }
}
