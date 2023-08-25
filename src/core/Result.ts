import { BaseError } from './BaseError';
import { Exception } from './Exception';

class ResultSuccess {
  constructor(public readonly isSuccess: true) {}
}
class ResultSuccessWithData<T> {
  constructor(public readonly isSuccess: true, public readonly data: T) {}
}
class ResultError<E> {
  constructor(public readonly isSuccess: false, public readonly error: E) {}
}

export class Result<Data, Error = BaseError> {
  private constructor(
    private arg:
      | ResultSuccess
      | ResultSuccessWithData<Data>
      | ResultError<Error>,
  ) {}

  static ok<T>(data?: T): Result<T, never>;
  static ok<T>(data: T): Result<T, never> {
    if (data) {
      return new Result<T, never>({
        isSuccess: true,
        data,
      });
    }
    return new Result<never, never>({
      isSuccess: true,
    });
  }

  static fail(error: BaseError): Result<never, BaseError> {
    return new Result<never, BaseError>({
      isSuccess: false,
      error,
    });
  }

  get data(): Data {
    if (this.arg instanceof ResultSuccessWithData) {
      return this.arg.data;
    }
    if (!this.arg.isSuccess) {
      throw this._errorWhenDataIsAccessedInFailedResult();
    }

    throw this._errorWhenDataIsAccessedInVoidData();
  }

  private _errorWhenDataIsAccessedInFailedResult() {
    return Exception.devLogic({
      message:
        'Result.data is empty when operation resulted to error. Access Result.error instead and handle error accordingly.',
      filename: 'Result.ts',
    });
  }

  private _errorWhenDataIsAccessedInVoidData() {
    return Exception.devLogic({
      message:
        'Result.data is empty when result.ok is called without passing a payload. Consider passing a payload in the function that returns the said result if you want to access result.data',
      filename: 'Result.ts',
    });
  }

  get error(): Error {
    if (!this.arg.isSuccess) {
      return this.arg.error;
    }
    throw this._errorIsEmptyInSuccessResult();
  }

  private _errorIsEmptyInSuccessResult() {
    return Exception.devLogic({
      message: 'Error is empty in a success result. Access data instead.',
      filename: 'Result.ts',
    });
  }

  get isSuccess() {
    return this.arg.isSuccess;
  }

  get isFail() {
    return !this.arg.isSuccess;
  }

  static combine<T extends Result<unknown>[]>(resultList: T) {
    const failedResults = resultList.filter((result) => result.isFail);
    const thereAreFailedResults = Boolean(failedResults.length);

    if (thereAreFailedResults) {
      const combinedErrorMessages = failedResults
        .map((res) => res.error)
        .join(' ');
      return new Result({
        isSuccess: false,
        error: BaseError.invalidInput({ message: combinedErrorMessages }),
      });
    }

    const allDataPayloads = resultList.map((res) => res.data);
    return new Result({ isSuccess: true, data: allDataPayloads });
  }
}
