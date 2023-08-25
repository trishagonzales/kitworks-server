import { ConfigProps } from '../data-objects/ConfigProps';
import { EnvVariables } from '../data-objects/EnvVariables';

export class GenerateConfig {
  execute(env: EnvVariables): ConfigProps {
    const db = {
      scheme: env.DATABASE_SCHEME,
      user: env.DATABASE_USER,
      password: env.DATABASE_PASSWORD,
      host: env.DATABASE_HOST,
      port: env.DATABASE_PORT,
      name: env.DATABASE_NAME,
    };
    const dbUrl = `${db.scheme}://${db.user}:${db.password}@${db.host}:${db.port}/${db.name}`;

    const cache = {
      scheme: env.CACHE_SCHEME,
      host: env.CACHE_HOST,
      port: env.CACHE_PORT,
    };
    const cacheUrl = `${cache.scheme}://${cache.host}:${cache.port}`;

    return new ConfigProps({
      app: {
        nodeEnv: env.NODE_ENV,
        host: env.HOST,
        port: env.PORT,
      },
      auth: {
        sessionSecret: env.SESSION_SECRET,
        jwtSecret: env.JWT_SECRET,
        googleClientId: env.GOOGLE_CLIENT_ID,
        googleClientSecret: env.GOOGLE_CLIENT_SECRET,
      },
      fileStorage: {
        name: env.CLOUDINARY_NAME,
        apiKey: env.CLOUDINARY_API_KEY,
        apiSecret: env.CLOUDINARY_API_SECRET,
      },
      mail: {
        apiKey: env.SENDGRID_API_KEY,
      },
      db: {
        url: dbUrl,
      },
      cache: {
        url: cacheUrl,
      },
    });
  }
}
