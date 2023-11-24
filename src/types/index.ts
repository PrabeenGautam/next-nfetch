import { HTTPSuccessResponse, Interceptor, RequestCommonConfig } from "./global";

// Config for input
export interface InstanceConfig extends RequestCommonConfig {
  baseURL: string;
}

export interface BaseConfig extends RequestCommonConfig {
  url: string;
}

// Sub Instance Types
export type RequestMethodConfig = {
  (entry: string | BaseConfig, config?: RequestCommonConfig): Promise<HTTPSuccessResponse>;
  useRequestInterceptor(interceptor: Interceptor): number;
};

// Main Instance types
export interface HTTPClientBase extends RequestMethodConfig {
  create(config: InstanceConfig): RequestMethodConfig;
}
