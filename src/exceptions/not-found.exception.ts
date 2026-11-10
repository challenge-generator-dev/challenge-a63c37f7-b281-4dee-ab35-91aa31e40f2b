import { HttpException, HttpStatusCode } from './http.exception';

export interface NotFoundDetails {
  resource: string;
  identifier: string;
  identifierType: 'id' | 'name' | 'slug' | 'email' | 'username' | 'custom';
  suggestion?: string;
}

export class NotFoundException extends HttpException {
  public readonly resource: string;
  public readonly identifier: string;
  public readonly identifierType: NotFoundDetails['identifierType'];
  public readonly suggestion?: string;

  constructor(
    resource: string,
    identifier: string,
    identifierType: NotFoundDetails['identifierType'] = 'id',
    message?: string,
    suggestion?: string
  ) {
    const defaultMessage = `${resource} with ${identifierType} '${identifier}' not found`;
    const formattedMessage = HttpException.formatMessage(message || '', defaultMessage);
    super(formattedMessage, HttpStatusCode.NOT_FOUND, true);
    this.resource = resource;
    this.identifier = identifier;
    this.identifierType = identifierType;
    this.suggestion = suggestion;
  }

  public static forProduct(id: string): NotFoundException {
    return new NotFoundException('Product', id, 'id');
  }

  public static forProductByName(name: string): NotFoundException {
    return new NotFoundException('Product', name, 'name', undefined, 'Try using a different product name');
  }

  public static forResource(resource: string, identifier: string): NotFoundException {
    return new NotFoundException(resource, identifier, 'id');
  }

  public toJSON(): Record<string, unknown> {
    const base = super.toJSON();
    return {
      ...base,
      resource: this.resource,
      identifier: this.identifier,
      identifierType: this.identifierType,
      ...(this.suggestion && { suggestion: this.suggestion })
    };
  }

  public getDetails(): NotFoundDetails {
    return {
      resource: this.resource,
      identifier: this.identifier,
      identifierType: this.identifierType,
      ...(this.suggestion && { suggestion: this.suggestion })
    };
  }

  public static isNotFoundError(error: unknown): boolean {
    return error instanceof NotFoundException;
  }
}