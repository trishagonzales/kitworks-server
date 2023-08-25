import { z } from 'zod';
import { ValueObject } from '@core/ValueObject';
import { Result } from '@core/Result';
import { BaseError } from '@core/BaseError';
import { ValidateMap } from '@core/ValidateMap';
import { CreateAvatarArg } from '../data-objects/CreateAvatarArg';

type AvatarProps = {
  publicId: string;
  publicUrl: string;
};

export class Avatar extends ValueObject {
  private _publicId: string;
  private _publicUrl: string;

  private constructor(arg: AvatarProps) {
    super();
    this._publicId = arg.publicId;
    this._publicUrl = arg.publicUrl;
  }

  static create(arg: CreateAvatarArg) {
    const validationResult = z
      .object({
        publicId: z.string(),
        publicUrl: z.string().url(),
      })
      .safeParse(arg);
    if (validationResult.success) return Result.ok(new Avatar(arg));

    const errorMessage = ValidateMap.formatZodErrorMessage(validationResult);
    return Result.fail(
      BaseError.invalidInput({
        message: errorMessage,
      }),
    );
  }

  static reconstruct(arg: AvatarProps) {
    return new Avatar({
      publicId: arg.publicId,
      publicUrl: arg.publicUrl,
    });
  }

  get publicId(): string {
    return this._publicId;
  }
  get publicUrl(): string {
    return this._publicUrl;
  }
}
