import { Interceptor, RequestCommonConfig } from "./global";

// Config for input
export interface InstanceConfig extends RequestCommonConfig {
  baseURL: string;
}

export interface BaseConfig extends RequestCommonConfig {
  url: string;
}

// Class Creator types
export type RequestMethodConfig = {
  (entry: string | BaseConfig, config?: RequestCommonConfig): void;

  useRequestInterceptor(interceptor: Interceptor): number;
};

export interface HTTPClientBase extends RequestMethodConfig {
  create(config: InstanceConfig): RequestMethodConfig;
}
