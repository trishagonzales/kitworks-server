import {
  UnauthorizedException,
  BadRequestException,
  ForbiddenException,
  NotFoundException,
  ConflictException,
  InternalServerErrorException,
  HttpException,
} from '@nestjs/common';
import { BaseError } from '@core/BaseError';
import { Result } from '@core/Result';

export class ExceptionMap {
  static toView(exception: unknown): HttpException {
    if (exception instanceof Result) {
      return ExceptionMap._baseErrorToView(exception.error);
    }
    if (exception instanceof BaseError) {
      return ExceptionMap._baseErrorToView(exception);
    }
    return new InternalServerErrorException();
  }

  private static _baseErrorToView(error: BaseError) {
    switch (error.code) {
      case 'INVALID_INPUT':
        return new BadRequestException();
      case 'LOGIN_REQUIRED':
        return new UnauthorizedException();
      case 'FORBIDDEN':
        return new ForbiddenException();
      case 'NOT_FOUND':
        return new NotFoundException();
      case 'ALREADY_EXISTED':
        return new ConflictException();
      case 'UNEXPECTED':
        return new InternalServerErrorException({});
      default:
        return new InternalServerErrorException();
    }
  }
}
