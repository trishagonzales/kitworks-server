import { Result } from '@core/Result';
import { BaseError } from './BaseError';

export interface Usecase<Input, Output> {
  execute(
    input: Input,
  ): Promise<Result<Output>> | Promise<Result<never, BaseError>>;
  // | Result<Output, never>
  // | Result<never, Error>;
}
