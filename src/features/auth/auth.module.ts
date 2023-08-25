import { ConfigProvider } from '@app/config/config.provider';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthProvider } from './auth.provider';
import { Access } from './data-objects/Access';
import { AppModule } from '@app/app.module';

@Module({
  providers: [AuthProvider],
  imports: [
    AppModule,
    JwtModule.registerAsync({
      inject: [ConfigProvider],
      useFactory: async (config: ConfigProvider) => {
        return {
          secret: config.auth.jwtSecret,
          signOptions: {
            expiresIn: Access.DEFAULT_LIFESPAN_IN_MILLISECONDS / 1000,
          },
        };
      },
    }),
  ],
  exports: [AuthProvider],
})
export class AuthModule {}
