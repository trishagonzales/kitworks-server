import { v4 } from 'uuid';
import { BaseError } from '@core/BaseError';
import { Result } from '@core/Result';
import { User } from '@features/user/domain/User';

export class Refresh {
  static readonly DEFAULT_LIFESPAN_IN_MILLISECONDS = 1000 * 60 * 60 * 12; // 12 hours;

  private constructor(
    private arg: {
      cacheKey: string;
      cachePayload: RefreshCachePayload;
    },
  ) {}

  static generate(user: User) {
    return new Refresh({
      cacheKey: this._generateToken(),
      cachePayload: {
        userId: user.id,
        expiresInMilliseconds: this._setExpirationDate(),
      },
    });
  }

  private static _generateToken() {
    return v4();
  }

  private static _setExpirationDate() {
    const date = new Date();
    date.setMilliseconds(
      date.valueOf() + Refresh.DEFAULT_LIFESPAN_IN_MILLISECONDS,
    );
    return date.valueOf();
  }

  static reconstruct(arg: ReconstructArg) {
    return new Refresh({
      cacheKey: arg.cacheKey,
      cachePayload: arg.cachePayload,
    });
  }

  get cacheKey(): string {
    return this.arg.cacheKey;
  }
  get cachePayload(): RefreshCachePayload {
    return this.arg.cachePayload;
  }
}

class ReconstructArg {
  constructor(
    public readonly cacheKey: string,
    public readonly cachePayload: RefreshCachePayload,
  ) {}
}
// class ReconstructArg {
//   constructor(
//     public readonly cacheKey: string,
//     public readonly cachePayloadInJsonStringFormat: string,
//   ) {}
// }

export class RefreshCachePayload {
  constructor(
    public readonly userId: string,
    public readonly expiresInMilliseconds: number,
  ) {}
}
