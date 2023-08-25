import { v4 } from 'uuid';
import { User } from '@features/user/domain/User';

export class Access {
  static readonly DEFAULT_LIFESPAN_IN_MILLISECONDS = 1000 * 60 * 60; // 1 hour;

  private constructor(
    private arg: {
      cacheKey: string;
      cachePayload: AccessCachePayload;
    },
  ) {}

  static generate(user: User) {
    return new Access({
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
      date.valueOf() + Access.DEFAULT_LIFESPAN_IN_MILLISECONDS,
    );
    return date.valueOf();
  }

  static reconstruct(arg: ReconstructArg) {
    return new Access({
      cacheKey: arg.cacheKey,
      cachePayload: arg.cachePayload,
    });
  }

  get cacheKey() {
    return this.arg.cacheKey;
  }
  get cachePayload() {
    return this.arg.cachePayload;
  }
}

class ReconstructArg {
  constructor(
    public readonly cacheKey: string,
    public readonly cachePayload: AccessCachePayload,
  ) {}
}

export class AccessCachePayload {
  constructor(
    public readonly userId: string,
    public readonly expiresInMilliseconds: number,
  ) {}
}

export type AccessJwtPayload = {
  sub: string;
};
