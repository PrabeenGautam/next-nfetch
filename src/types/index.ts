import { HTTPMethod, HttpHeaders } from "../enum";

type HttpRequestHeaders = { [key in HttpHeaders]?: string } & {
  [key: string]: string;
};

interface NextFetchRequestConfig {
  revalidate?: number | false;
  tags?: string[];
}

export type HTTPRequestConfig = {
  method?: HTTPMethod;
  headers?: HttpRequestHeaders;
  data?: any;
  params?: Record<string, any>;
  cache?: RequestCache;
  next?: NextFetchRequestConfig;
  timeout?: number;
  timeoutMessage?: string;
};

export interface HTTPInstanceConfig extends HTTPRequestConfig {
  baseURL: string;
}
