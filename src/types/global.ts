import { HTTPMethod, HttpHeaders } from "../enum";

export type HttpRequestHeaders = { [key in HttpHeaders]?: string } & {
  [key: string]: string;
};

export interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

export type RequestCommonConfig = {
  method?: HTTPMethod;
  headers?: HttpRequestHeaders;
  data?: any;
  params?: Record<string, any>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  timeout?: number;
  timeoutMessage?: string;
};

export interface Interceptor {
  onFulfilled?: (config: any) => Promise<any>;
  onRejected?: (error: any) => Promise<any>;
}

/* Response Types */
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
