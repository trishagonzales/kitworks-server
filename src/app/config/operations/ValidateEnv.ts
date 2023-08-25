import * as dotenv from 'dotenv';
import { Exception } from '@core/Exception';
import {
  EnvValidationSchema,
  EnvVariables,
} from '../data-objects/EnvVariables';

type Options = {
  readEnvFiles: boolean;
};

export class ValidateEnv {
  execute(options: Options): EnvVariables {
    const parsedEnv = options.readEnvFiles ? this._readEnvFiles() : process.env;
    const validatedEnv = this._validateEnv(parsedEnv);
    return validatedEnv;
  }

  private _readEnvFiles() {
    const { error, parsed } = dotenv.config({
      debug: true,
      path: './.env',
    });
    if (error) throw this._errorCannotReadEnvFiles(error);
    if (!parsed) throw this._errorEnvFilesAreEmpty();
    return parsed;
  }

  private _errorCannotReadEnvFiles(error: Error | undefined) {
    return Exception.startup({
      message: 'Problems parsing env files.',
      filename: 'ValidateEnv.ts',
      cause: error,
    });
  }

  private _errorEnvFilesAreEmpty() {
    return Exception.startup({
      message: 'Env files are empty after parsing.',
      filename: 'ValidateEnv.ts',
    });
  }

  private _validateEnv(parsedEnv: any) {
    const validationResult = EnvValidationSchema.safeParse({
      ...parsedEnv,
      PORT: parseInt(parsedEnv.PORT),
      DATABASE_PORT: parseInt(parsedEnv.DATABASE_PORT),
      CACHE_PORT: parseInt(parsedEnv.CACHE_PORT),
    });

    if (!validationResult.success)
      throw this._errorIncompleteEnvVariables(validationResult);
    return validationResult.data;
  }

  private _errorIncompleteEnvVariables(result: any) {
    return Exception.startup({
      message: 'Environment variables are either invalid or incomplete.',
      filename: 'ValidateEnv.ts',
      cause: result,
    });
  }
}
