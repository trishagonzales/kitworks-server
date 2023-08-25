import { Global, Module } from '@nestjs/common';
import { DatabaseProvider } from './db/db.provider';
import { ConfigProvider } from './config/config.provider';
import { SessionProvider } from './api/session/SessionProvider';
import { CacheProvider } from './cache/cache.provider';
import { GlobalExceptionFilter } from './api/filters/exception.filter';
import { RedisService } from './cache/services/redis.service';

@Global()
@Module({
  providers: [
    ConfigProvider,
    {
      provide: DatabaseProvider,
      useFactory: (config: ConfigProvider) =>
        new DatabaseProvider({
          datasources: { db: { url: config.db.url } },
        }),
      inject: [ConfigProvider],
    },
    RedisService,
    SessionProvider,
    CacheProvider,
    {
      provide: 'APP_FILTER',
      useClass: GlobalExceptionFilter,
    },
  ],
  exports: [ConfigProvider, DatabaseProvider, CacheProvider],
})
export class AppModule {}
