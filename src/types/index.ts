import {
  HTTPSuccessResponse,
  RequestInterceptor,
  RequestCommonConfig,
  RequestNoDataConfig,
  RequestNoDataWithURLConfig,
  RequestWithDataWithURLConfig,
  RequestWithDataConfig,
} from "./global";

// Config for input
export interface InstanceConfig extends RequestCommonConfig {
  baseURL: string;
}

export interface BaseRequestConfig extends RequestCommonConfig {
  url: string;
}

type RequestMethod<T, U> = (entry: string | T, config?: U) => Promise<HTTPSuccessResponse>;

// Sub Instance Types
export type RequestMethodConfig = {
  (entry: string | BaseRequestConfig, config?: RequestCommonConfig): Promise<HTTPSuccessResponse>;

  useRequestInterceptor: (interceptor: RequestInterceptor) => number;

  // method with no body
  get: RequestMethod<RequestNoDataWithURLConfig, RequestNoDataConfig>;
  delete: RequestMethod<RequestNoDataWithURLConfig, RequestNoDataConfig>;
  head: RequestMethod<RequestNoDataWithURLConfig, RequestNoDataConfig>;
  options: RequestMethod<RequestNoDataWithURLConfig, RequestNoDataConfig>;

  // method with body
  post: RequestMethod<RequestWithDataWithURLConfig, RequestWithDataConfig>;
  put: RequestMethod<RequestWithDataWithURLConfig, RequestWithDataConfig>;
  patch: RequestMethod<RequestWithDataWithURLConfig, RequestWithDataConfig>;
};

// Main Instance types
export interface HTTPClientBase extends RequestMethodConfig {
  create(config: InstanceConfig): RequestMethodConfig;
}
