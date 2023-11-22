export interface ConstructorProps {
  baseURL: string;
  timeout?: number;
}

export type HTTPMethod = "get" | "post" | "patch" | "put" | "delete" | "head";

export interface RequestInterceptor {
  onFulfilled?: (
    config: RequestInterceptorOption
  ) => RequestInterceptorOption | Promise<RequestInterceptorOption>;
  onRejected?: (error: any) => any;
}

export interface RequestOptions {
  method?: HTTPMethod;
  headers?: { [key: string]: string };
  data?: { [key: string]: string };
  params?: { [key: string]: string | number };
  cache?: RequestCache;
}

export interface RequestInterceptorOption {
  method: HTTPMethod;
  headers: Headers;
  body: string | undefined;
  cache: RequestCache;
}

export interface HttpRequest {
  data: { [key: string]: string } | undefined;
  headers: Record<string, string>;
  method: HTTPMethod;
  timeout: number;
  url: string;
}

export interface HttpResponse {
  data: any;
  status: number;
  statusText: string;
}

export interface HttpErrorOptions {
  message: string;
  request?: HttpRequest;
  response?: HttpResponse;
  name?: "HttpError" | "TimeoutError";
}
