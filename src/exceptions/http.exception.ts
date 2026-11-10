export enum HttpStatusCode {
  OK = 200,
  CREATED = 201,
  NO_CONTENT = 204,
  BAD_REQUEST = 400,
  UNAUTHORIZED = 401,
  FORBIDDEN = 403,
  NOT_FOUND = 404,
  CONFLICT = 409,
  UNPROCESSABLE_ENTITY = 422,
  INTERNAL_SERVER_ERROR = 500,
  SERVICE_UNAVAILABLE = 503
}

export abstract class HttpException extends Error {
  public readonly statusCode: HttpStatusCode;
  public readonly isOperational: boolean;
  public readonly timestamp: string;
  public readonly path?: string;

  constructor(
    message: string,
    statusCode: HttpStatusCode,
    isOperational: boolean = true,
    path?: string
  ) {
    super(message);
    this.name = this.constructor.name;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.timestamp = new Date().toISOString();
    this.path = path;
    Error.captureStackTrace(this, this.constructor);
  }

  public toJSON(): Record<string, unknown> {
    return {
      name: this.name,
      message: this.message,
      statusCode: this.statusCode,
      isOperational: this.isOperational,
      timestamp: this.timestamp,
      ...(this.path && { path: this.path })
    };
  }

  public getHttpResponse(): { status: number; body: Record<string, unknown> } {
    return {
      status: this.statusCode,
      body: this.toJSON()
    };
  }

  protected static validateStatusCode(statusCode: number): boolean {
    return statusCode >= 100 && statusCode < 600;
  }

  protected static formatMessage(message: string, defaultMessage: string): string {
    return message && message.trim().length > 0 ? message : defaultMessage;
  }
}