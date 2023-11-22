import { HttpErrorOptions, HttpRequest, HttpResponse } from "../types";

class HttpError {
  message: string;
  request?: HttpRequest;
  response?: HttpResponse;
  name: "HttpError" | "TimeoutError";
  stack?: any;

  constructor({
    message,
    request,
    response,
    name = "HttpError",
  }: HttpErrorOptions) {
    Error.call(this);

    this.message = message;
    this.request = request;
    this.response = response;
    this.name = name;

    // Ensure the correct prototype chain is maintained
    const hasStackTrace = (Error as any)["captureStackTrace"] != null;

    if (hasStackTrace) {
      (Error as any)["captureStackTrace"](this, this.constructor);
    } else {
      this.stack = new Error().stack;
    }
  }
}

export default HttpError;
