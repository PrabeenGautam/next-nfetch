import { HttpHeaders } from "../enum";

export type HTTPMethod = "get" | "post" | "put" | "delete" | "patch" | "head" | "options";

export type HTTPRequestDetailsHeaders = { [key in HttpHeaders]?: string } & {
  [key: string]: string;
};

export interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

export type CommonRequestConfig = {
  headers?: HTTPRequestDetailsHeaders;
  params?: Record<string, any>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  timeout?: number;
  timeoutMessage?: string;
};

export interface RequestNoDataConfig extends CommonRequestConfig {}
export interface RequestWithDataConfig extends CommonRequestConfig {
  data?: any;
}

export interface RequestNoDataWithURLConfig extends RequestNoDataConfig {
  url: string;
}

export interface RequestWithDataWithURLConfig extends RequestWithDataConfig {
  url: string;
}

export interface RequestCommonConfig extends CommonRequestConfig {
  method?: HTTPMethod;
  data?: any;
}

export interface RequestWithUrlConfig extends RequestCommonConfig {
  baseURL?: string;
  url?: string;
}

export interface RequestInterceptorOptions {
  headers: Headers;
  cache: RequestCache;
  next: NextFetchRequestConfig;
}

export interface RequestInterceptor {
  onFulfilled?: (config: RequestInterceptorOptions) => any | Promise<any>;
  onRejected?: (error: any) => Promise<any>;
}

/* Response Types */
export interface HTTPSuccessResponse {
  data: any;
  headers: Record<string, string>;
  request: HTTPRequestDetails;
  response: Response;
  status: number;
  statusText: string;
}

/* Error Class Options */
export interface HTTPRequestDetails {
  data: { [key: string]: string } | undefined;
  headers: Record<string, string>;
  method: HTTPMethod;
  timeout: number;
  url: string;
}

export interface HTTPResponseDetails {
  data: any;
  status: number;
  statusText: string;
}
