import bcrypt from 'bcryptjs';
import isStrongPassword from 'validator/lib/isStrongPassword';
import { Result } from '@core/Result';
import { BaseError } from '@core/BaseError';
import { ValueObject } from '@core/ValueObject';

export class Password extends ValueObject {
  private _hashedValue: string;

  private static readonly MIN_LENGTH = 8;
  private static readonly MIN_NUMBERS = 1;
  private static readonly MIN_UPPERCASE = 1;

  private constructor(hashedValue: string) {
    super();
    this._hashedValue = hashedValue;
  }

  static async create(password: string): Promise<Result<Password>> {
    const passwordIsValid = this._validate(password);
    if (passwordIsValid) {
      const hashedPassword = await this._hash(password);
      return Result.ok(new Password(hashedPassword));
    }

    return Result.fail(
      BaseError.invalidInput({
        message: `Password must contain atleast ${this.MIN_LENGTH} characters, ${this.MIN_NUMBERS} number and ${this.MIN_UPPERCASE} uppercase letter.`,
      }),
    );
  }

  private static _validate(password: string): boolean {
    return isStrongPassword(password, {
      minLength: this.MIN_LENGTH,
      minNumbers: this.MIN_NUMBERS,
      minUppercase: this.MIN_UPPERCASE,
    });
  }

  private static _hash(password: string): Promise<string> {
    return bcrypt.hash(password, bcrypt.genSaltSync(12));
  }

  static reconstruct(hashedPassword: string): Password {
    return new Password(hashedPassword);
  }

  verify(value: string): Promise<boolean> {
    return bcrypt.compare(value, this._hashedValue);
  }

  get getHashedValue(): string {
    return this._hashedValue;
  }
}
