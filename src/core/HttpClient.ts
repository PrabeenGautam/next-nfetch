import { BaseConfig } from "../types";
import InterceptorManager from "./InterceptorManager";
import mergeObjects from "../helper/mergeObject";
import { Interceptor, RequestCommonConfig, RequestWithUrlConfig } from "../types/global";
import getHeaders from "../helper/getHeaders";

class HttpClient {
  private defaults: RequestWithUrlConfig;
  private requestInterceptors: InterceptorManager;

  constructor(defaults: RequestCommonConfig) {
    this.defaults = defaults;
    this.requestInterceptors = new InterceptorManager();
  }

  request(entry: string | BaseConfig, config: RequestCommonConfig = {}) {
    return new Promise(async (resolve, reject) => {
      const isString = typeof entry === "string";
      const instanceConfig = isString ? { ...config, url: entry } : entry;

      let requestConfig = mergeObjects(this.defaults, instanceConfig) as BaseConfig;

      const requestHeaders = this.buildHeaders(requestConfig.headers);

      const requestOptions = {
        cache: requestConfig.cache,
        method: requestConfig.method,
        next: requestConfig.next,
        headers: requestHeaders,
        body: requestConfig.data ? JSON.stringify(requestConfig.data) : requestConfig.data,
      };

      if (["get", "head"].includes(requestOptions.method!.toLowerCase())) {
        delete (requestOptions as any).body;
      }

      await this.executeRequestInterceptors(requestOptions);

      const endpoint = this.buildUrl(requestConfig.url, requestConfig.params);
      const controller = new AbortController();
    });
  }

  useRequestInterceptor(interceptor: Interceptor) {
    return this.requestInterceptors.use(interceptor);
  }

  private executeRequestInterceptors(config: any) {
    return this.requestInterceptors.execute(config);
  }

  private buildUrl(url: string, params?: any): string {
    const queryParams = new URLSearchParams(params).toString();
    let baseURL = this.defaults.baseURL || "";

    if (baseURL && baseURL[baseURL.length - 1] === "/") {
      baseURL = baseURL.slice(0, -1);
    }

    const path = url[0] === "/" ? url.slice(1) : url;
    const finalQueryParams = queryParams.length > 0 ? "?" + queryParams : "";

    if (!baseURL && url.startsWith("http")) {
      return `${path}${finalQueryParams}`;
    }

    return `${baseURL}/${path}${finalQueryParams}`;
  }

  private buildHeaders(headers: any): any {
    return new Headers(headers);
  }
}

export default HttpClient;
