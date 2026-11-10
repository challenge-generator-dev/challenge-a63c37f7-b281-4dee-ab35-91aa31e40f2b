import { HttpException, HttpStatusCode } from './http.exception';

export interface ValidationError {
  field: string;
  message: string;
  value?: unknown;
}

export interface ValidationExceptionDetails {
  errors: ValidationError[];
  errorCount: number;
}

export class ValidationException extends HttpException {
  public readonly errors: ValidationError[];
  public readonly errorCount: number;

  constructor(
    message: string = 'Validation failed',
    errors: ValidationError[] = [],
    statusCode: HttpStatusCode = HttpStatusCode.UNPROCESSABLE_ENTITY
  ) {
    const formattedMessage = HttpException.formatMessage(message, 'Validation failed');
    super(formattedMessage, statusCode, true);
    this.name = 'ValidationException';
    this.errors = errors;
    this.errorCount = errors.length;
  }

  public get details(): ValidationExceptionDetails {
    return {
      errors: this.errors,
      errorCount: this.errorCount
    };
  }

  public static fromSingleError(field: string, errorMessage: string, value?: unknown): ValidationException {
    return new ValidationException(
      'Validation failed',
      [{ field, message: errorMessage, value }]
    );
  }

  public static fromMultipleErrors(errors: ValidationError[]): ValidationException {
    return new ValidationException(
      `Validation failed: ${errors.length} error(s) found`,
      errors
    );
  }

  public static fromExpressValidatorErrors(validationErrors: Array<{ path: string; msg: string }>): ValidationException {
    const formattedErrors: ValidationError[] = validationErrors.map(error => ({
      field: error.path,
      message: error.msg
    }));
    return ValidationException.fromMultipleErrors(formattedErrors);
  }

  public hasError(field: string): boolean {
    return this.errors.some(error => error.field === field);
  }

  public getError(field: string): ValidationError | undefined {
    return this.errors.find(error => error.field === field);
  }

  public getFieldErrors(): string[] {
    return this.errors.map(error => `${error.field}: ${error.message}`);
  }

  public getErrorMessages(): string[] {
    return this.errors.map(error => error.message);
  }

  public getFields(): string[] {
    return this.errors.map(error => error.field);
  }

  public getDetails(): ValidationExceptionDetails {
    return {
      errors: this.errors,
      errorCount: this.errorCount
    };
  }

  public toJSON(): Record<string, unknown> {
    return {
      ...super.toJSON(),
      errors: this.errors,
      errorCount: this.errorCount
    };
  }
}