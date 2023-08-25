import { NestFactory } from '@nestjs/core';
import { RootModule } from './root.module';
import { ConfigProvider } from '@app/config/config.provider';

async function main() {
  const app = await NestFactory.create(RootModule);
  const config = app.get(ConfigProvider);
  await app.listen(config.app.port);
}

main();
