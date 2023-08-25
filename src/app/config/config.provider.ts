import { Global, Injectable } from '@nestjs/common';
import { ValidateEnv } from './operations/ValidateEnv';
import { ConfigProps } from './data-objects/ConfigProps';
import { GenerateConfig } from './operations/GenerateConfig';

@Global()
@Injectable()
export class ConfigProvider {
  private _config: ConfigProps;

  constructor() {
    const env = new ValidateEnv().execute({ readEnvFiles: false });
    this._config = new GenerateConfig().execute(env);
  }

  get app() {
    return this._config.app;
  }
  get auth() {
    return this._config.auth;
  }
  get fileStorage() {
    return this._config.fileStorage;
  }
  get mail() {
    return this._config.mail;
  }
  get db() {
    return this._config.db;
  }
  get cache() {
    return this._config.cache;
  }
  get isProduction(): boolean {
    return this.app.nodeEnv === 'production';
  }
}
