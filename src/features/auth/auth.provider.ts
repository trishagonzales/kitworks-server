import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Result } from '@core/Result';
import { User } from '@features/user/domain/User';
import { CacheProvider } from '@app/cache/cache.provider';
import { Refresh } from './data-objects/Refresh';
import { Access, AccessJwtPayload } from './data-objects/Access';
import { AuthTokens } from './data-objects/AuthTokens';
import { CacheItem } from '@app/cache/data-objects/CacheItem';

@Injectable()
export class AuthProvider {
  constructor(private jwtService: JwtService, private cache: CacheProvider) {}

  async login(user: User): Promise<AuthTokens> {
    const refresh = Refresh.generate(user);
    const access = Access.generate(user);
    await this.cache.set(
      new CacheItem({
        key: refresh.cacheKey,
        payload: refresh.cachePayload,
      }),
    );
    await this.cache.set(
      new CacheItem({
        key: access.cacheKey,
        payload: access.cachePayload,
      }),
    );

    const jwtPayload: AccessJwtPayload = {
      sub: access.cacheKey,
    };
    const jwtToken = await this.jwtService.signAsync(jwtPayload);

    return {
      refreshToken: refresh.cacheKey,
      accessToken: jwtToken,
    };
  }

  async authenticate(accessToken: string): Promise<Result<User>> {
    const { sub } = await this.jwtService.verifyAsync<AccessJwtPayload>(
      accessToken,
    );

    const accessOrError = await this.cache.getAccess(sub);
    if (accessOrError.isFail) return Result.fail(accessOrError.error);

    const userId = accessOrError.data.cachePayload.userId;
    const userOrError = await this.cache.getUser(userId);
    if (userOrError.isFail) return Result.fail(userOrError.error);

    return userOrError;
  }

  async logout(refresh: Refresh) {
    await this.cache.invalidate(refresh.cacheKey);
  }
}
