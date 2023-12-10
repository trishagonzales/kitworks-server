import { ConfigProvider } from '@app/config/config.provider';
import { Injectable } from '@nestjs/common';
import { Redis } from 'ioredis';

@Injectable()
export class RedisService {
  private _client: Redis;

  constructor(private config: ConfigProvider) {
    this._client = new Redis(this.config.cache.url);
  }

  async set(key: string, payload: string) {
    return this._client.set(key, payload);
  }

  async get(key: string) {
    return this._client.get(key);
  }

  async delete(key: string) {
    return this._client.del(key);
  }

  get client() {
    return this._client;
  }
}
