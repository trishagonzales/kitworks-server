import { Mapper } from '@core/Mapper';
import { ReconstructUserArg } from '../data-objects/ReconstructUserArg';
import { Gender, User } from '../domain/User';
import { UserDbModel } from '../repositories/models/userDbModels';
import { UserViewData } from '../view-objects/UserData';
import { Avatar } from '../domain/Avatar';

export class UserMap {
  static toDatabase(user: User): UserDbModel {
    return {
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio ?? null,
      gender: user.gender ?? null,
      dateCreated: user.dateCreated,
      email: user.email.value,
      password: user.password?.getHashedValue ?? null,
      googleToken: user.googleToken ?? null,
      avatarPublicId: user.avatar?.publicId ?? null,
      avatarPublicUrl: user.avatar?.publicUrl ?? null,
    };
  }

  static toDomain(model: UserDbModel): User {
    const arg = new ReconstructUserArg({
      id: model.id,
      name: model.name,
      username: model.username,
      bio: model.bio ?? undefined,
      gender: model.gender ? Gender[model.gender] : undefined,
      dateCreated: model.dateCreated,
      avatarPublicId: model.avatarPublicId ?? undefined,
      avatarPublicUrl: model.avatarPublicUrl ?? undefined,
      email: model.email,
      password: model.password ?? undefined,
      googleToken: model.googleToken ?? undefined,
    });
    return User.reconstruct(arg);
  }

  static toView(user: User): UserViewData {
    return new UserViewData({
      id: user.id,
      name: user.name,
      username: user.username,
      bio: user.bio,
      gender: user.gender,
      dateCreated: user.dateCreated,
      avatarUrl: user.avatar?.publicUrl,
      email: user.email.value,
    });
  }
}
