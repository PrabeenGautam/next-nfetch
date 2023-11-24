import { HTTPMethod, HttpHeaders } from "../enum";

type HttpRequestHeaders = { [key in HttpHeaders]?: string } & {
  [key: string]: string;
};

interface NextFetchRequestConfig {
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

export interface InstanceConfig extends RequestCommonConfig {
  baseURL: string;
}

export interface BaseConfig extends RequestCommonConfig {
  url: string;
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
