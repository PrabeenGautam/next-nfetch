import {
  HTTPSuccessResponse,
  RequestInterceptor,
  RequestCommonConfig,
  RequestNoDataConfig,
  RequestNoDataWithURLConfig,
} from "./global";

// Config for input
export interface InstanceConfig extends RequestCommonConfig {
  baseURL: string;
}

export interface BaseRequestConfig extends RequestCommonConfig {
  url: string;
}

// Sub Instance Types
export type RequestMethodConfig = {
  (entry: string | BaseRequestConfig, config?: RequestCommonConfig): Promise<HTTPSuccessResponse>;
  useRequestInterceptor(interceptor: RequestInterceptor): number;

  get(
    entry: string | RequestNoDataWithURLConfig,
    config?: RequestNoDataConfig
  ): Promise<HTTPSuccessResponse>;

  delete(
    entry: string | RequestNoDataWithURLConfig,
    config?: RequestNoDataConfig
  ): Promise<HTTPSuccessResponse>;
};

// Main Instance types
export interface HTTPClientBase extends RequestMethodConfig {
  create(config: InstanceConfig): RequestMethodConfig;
}
