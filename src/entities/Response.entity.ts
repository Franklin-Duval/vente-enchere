// Generic class for all responses from API

export class ResponseType<T> {
  success: boolean;
  message: string;
  result: T[];

  constructor(response: ResponseType<T>) {
    this.success = response.success;
    this.message = response.message;
    this.result = response.result;
  }
}

export class ResponseEntityType<T> {
  success: boolean;
  message: string;
  result: T;

  constructor(response: ResponseEntityType<T>) {
    this.success = response.success;
    this.message = response.message;
    this.result = response.result;
  }
}
