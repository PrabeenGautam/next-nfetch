import { HttpHeaders } from "../enum";

export type HTTPMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "head"
  | "options"
  | "connect"
  | "trace";

export type HttpRequestHeaders = { [key in HttpHeaders]?: string } & {
  [key: string]: string;
};

export interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

export interface RequestCommonConfig {
  method?: HTTPMethod;
  headers?: HttpRequestHeaders;
  data?: any;
  params?: Record<string, any>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  timeout?: number;
  timeoutMessage?: string;
}

export interface RequestWithUrlConfig extends RequestCommonConfig {
  baseURL?: string;
  url?: string;
}

export interface RequestInterceptorOption {
  headers: Headers;
  cache: RequestCache;
  next: NextFetchRequestConfig;
}

export interface Interceptor {
  onFulfilled?: (config: RequestInterceptorOption) => any | Promise<any>;
  onRejected?: (error: any) => Promise<any>;
}

/* Response Types */
export interface HTTPSuccessResponse {
  data: any;
  headers: Record<string, string>;
  request: HttpRequest;
  status: number;
  statusText: string;
}

/* Error Class Options */
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
