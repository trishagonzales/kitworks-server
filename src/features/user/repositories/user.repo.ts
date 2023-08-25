import { Injectable } from '@nestjs/common';
import { Repo } from '@core/Repo';
import { DatabaseProvider } from '@app/db/db.provider';
import { UserDbModel } from './models/userDbModels';
import { User } from '../domain/User';
import { UserMap } from '../mappers/user.map';

@Injectable()
export class UserRepo extends Repo {
  constructor(private db: DatabaseProvider) {
    super();
  }

  async save(user: User) {
    const userModel = UserMap.toDatabase(user);
    await this.db.user.upsert({
      where: {
        id: userModel.id,
      },
      create: userModel,
      update: userModel,
    });
  }

  async isExist(id: string) {
    const user = await this.db.user.findUnique({ where: { id } });
    return !!user;
  }

  async isExistByEmail(email: string) {
    const user = await this.db.user.findUnique({ where: { email } });
    return !!user;
  }

  async deleteOne(id: string) {
    await this.db.user.delete({ where: { id } });
  }

  async getOne(id: string): Promise<UserDbModel | null> {
    return await this.db.user.findUnique({ where: { id } });
  }
}
