export enum NodeEnv {
  Production = 'production',
  Development = 'development',
  Test = 'test',
}

interface Props {
  app: {
    nodeEnv: NodeEnv;
    host: string;
    port: number;
  };
  auth: {
    sessionSecret: string;
    jwtSecret: string;
    googleClientId: string;
    googleClientSecret: string;
  };
  fileStorage: {
    name: string;
    apiKey: string;
    apiSecret: string;
  };
  mail: {
    apiKey: string;
  };
  db: {
    url: string;
  };
  cache: {
    url: string;
  };
}

export class ConfigProps implements Props {
  constructor(private props: Props) {}

  get app() {
    return this.props.app;
  }
  get auth() {
    return this.props.auth;
  }
  get fileStorage() {
    return this.props.fileStorage;
  }
  get mail() {
    return this.props.mail;
  }
  get db() {
    return this.props.db;
  }
  get cache() {
    return this.props.cache;
  }
}
