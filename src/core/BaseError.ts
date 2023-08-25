type Codes =
  | 'INVALID_INPUT'
  | 'LOGIN_REQUIRED'
  | 'FORBIDDEN'
  | 'NOT_FOUND'
  | 'ALREADY_EXISTED'
  | 'UNEXPECTED';

type Options = {
  message: string;
};

export class BaseError {
  readonly code: Codes;
  readonly message: string;

  private constructor(code: Codes, options: Options) {
    this.code = code;
    this.message = options.message;
  }

  static invalidInput(options?: Options) {
    return new BaseError('INVALID_INPUT', {
      message: options ? options.message : 'Invalid input',
    });
  }

  static loginRequired(options?: Options) {
    return new BaseError('LOGIN_REQUIRED', {
      message: options ? options.message : 'Login required',
    });
  }

  static forbidden(options?: Options) {
    return new BaseError('FORBIDDEN', {
      message: options ? options.message : 'Access denied',
    });
  }

  static notFound(options?: Options) {
    return new BaseError('NOT_FOUND', {
      message: options ? options.message : 'Not found',
    });
  }

  static alreadyExisted(options?: Options) {
    return new BaseError('ALREADY_EXISTED', {
      message: options ? options.message : 'Already existed',
    });
  }

  static unexpected(options?: { consoleMessage: string; cause?: unknown }) {
    console.trace(`
      [Unexpected Error]\n
      \tmessage: ${options?.consoleMessage}\n
      \tcause: ${options?.cause}\n
    `);

    return new BaseError('UNEXPECTED', {
      message: 'Unexpected error occurred',
    });
  }
}
