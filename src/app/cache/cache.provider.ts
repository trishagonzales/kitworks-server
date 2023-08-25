import { Injectable } from '@nestjs/common';
import { BaseError } from '@core/BaseError';
import { Result } from '@core/Result';
import { Exception } from '@core/Exception';
import { CacheItem } from './data-objects/CacheItem';
import { RedisService } from './services/redis.service';
import {
  Refresh,
  RefreshCachePayload,
} from '@features/auth/data-objects/Refresh';
import { Access, AccessCachePayload } from '@features/auth/data-objects/Access';
import { ReconstructUserArg } from '@features/user/data-objects/ReconstructUserArg';
import { User } from '@features/user/domain/User';

@Injectable()
export class CacheProvider {
  constructor(private redis: RedisService) {}

  async set<T>(item: CacheItem<T>) {
    const result = await this.redis.set(item.key, item.payloadJsonString);
    if (result === 'OK') return Result.ok();

    return Result.fail(
      BaseError.unexpected({
        consoleMessage: 'Problem in setting an item to cache.',
      }),
    );
  }

  async getRefresh(key: string) {
    const result = await this.redis.get(key);
    const doesNotExistInCache = result === null;
    if (doesNotExistInCache) return Result.fail(BaseError.notFound());

    const parsed = JSON.parse(result);
    if (parsed instanceof RefreshCachePayload) {
      const refresh = Refresh.reconstruct({
        cacheKey: key,
        cachePayload: parsed,
      });
      return Result.ok(refresh);
    } else {
      throw this._errorQueriedPayloadNotInValidShape();
    }
  }

  async getAccess(key: string) {
    const result = await this.redis.get(key);
    const doesNotExistInCache = result === null;
    if (doesNotExistInCache) return Result.fail(BaseError.notFound());

    const parsed = JSON.parse(result);
    if (parsed instanceof AccessCachePayload) {
      const access = Access.reconstruct({
        cacheKey: key,
        cachePayload: parsed,
      });
      return Result.ok(access);
    }

    throw this._errorQueriedPayloadNotInValidShape();
  }

  async getUser(key: string) {
    const result = await this.redis.get(key);
    const doesNotExistInCache = result === null;
    if (doesNotExistInCache) return Result.fail(BaseError.notFound());

    const parsed = JSON.parse(result);
    if (parsed instanceof ReconstructUserArg) {
      const user = User.reconstruct(parsed);
      return Result.ok(user);
    }

    throw this._errorQueriedPayloadNotInValidShape();
  }

  private _errorQueriedPayloadNotInValidShape() {
    return Exception.devLogic({
      message:
        'Queried payload from cache is not in valid shape. Make sure setting and parsing payload is in the same shape or structure.',
      filename: 'cache.provider.ts',
    });
  }

  async invalidate(key: string) {
    await this.redis.delete(key);
  }
}
