import RedisStore from 'connect-redis';
import session from 'express-session';
import { Injectable } from '@nestjs/common';
import { RedisService } from '@app/cache/services/redis.service';
import { Refresh } from '@features/auth/data-objects/Refresh';
import { ConfigProvider } from '@app/config/config.provider';

@Injectable()
export class SessionProvider {
  constructor(private redis: RedisService, private config: ConfigProvider) {}

  initializeSession() {
    return session({
      name: 'sub',
      secret: this.config.auth.sessionSecret,
      store: this._createSessionStore(),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: this.config.isProduction,
        signed: this.config.isProduction,
        maxAge: Refresh.DEFAULT_LIFESPAN_IN_MILLISECONDS,
      },
    });
  }

  private _createSessionStore() {
    return new RedisStore({
      client: this.redis.client,
    });
  }
}
