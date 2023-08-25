import { z } from 'zod';
import { Result } from './Result';
import { BaseError } from './BaseError';

type ValidateFunction<Data> = () => z.SafeParseReturnType<Data, Data>;
type Return<Data> = Result<Data, BaseError>;

export class ValidateMap {
  static zodToResult<Data>(onValidate: ValidateFunction<Data>): Return<Data> {
    const validationResult = onValidate();
    if (validationResult.success) {
      return Result.ok(validationResult.data);
    }

    const errorMessage = ValidateMap.formatZodErrorMessage(validationResult);
    return Result.fail(
      BaseError.invalidInput({
        message: errorMessage,
      }),
    );
  }

  static formatZodErrorMessage<Data>(validationResult: z.SafeParseError<Data>) {
    return validationResult.error.format()._errors.join('. ');
  }
}
