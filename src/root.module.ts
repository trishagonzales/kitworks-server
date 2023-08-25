import { AppModule } from '@app/app.module';
import { FeatureModule } from '@features/feature.module';
import { Module } from '@nestjs/common';

@Module({
  imports: [AppModule, FeatureModule],
})
export class RootModule {}
