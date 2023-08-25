import z from 'zod';
import { ValueObject } from '@core/ValueObject';
import { Result } from '@core/Result';
import { ValidateMap } from '@core/ValidateMap';

export class Email extends ValueObject {
  private _value: string;

  private constructor(email: string) {
    super();
    this._value = email;
  }

  /**
   * Use this to validate email input and create email object for newly created account/user.
   * @returns result with email object as its data payload
   */

  static create(email: string): Result<Email> {
    const validationResult = Email.validate(email);
    if (validationResult.isSuccess) {
      return Result.ok(new Email(email));
    }
    return Result.fail(validationResult.error);
  }

  /**
   * Validate email only without creating a value object
   * @returns result with email string as its data payload
   */

  static validate(email: string): Result<string> {
    return ValidateMap.zodToResult(() =>
      z.string().email({ message: 'Not a valid email' }).safeParse(email),
    );
  }

  /**
   * Use this to reconstruct email value object queried from database. This function does not validate the input since it presume email is already validated before persisting to database.
   * @returns result with email object as its data payload
   */

  static reconstruct(email: string): Email {
    return new Email(email);
  }

  /**
   * @returns result with email object as its data payload
   */

  update(newEmail: string): Result<Email> {
    const validationResult = Email.validate(newEmail);
    if (validationResult.isSuccess) {
      this._updateEmailValue(newEmail);
      return Result.ok(this);
    }
    return Result.fail(validationResult.error);
  }

  private _updateEmailValue(newEmail: string): void {
    this._value = newEmail;
  }

  get value(): string {
    return this._value;
  }
}
