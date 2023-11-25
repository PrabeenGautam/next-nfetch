import { BaseConfig } from "../types";
import InterceptorManager from "./InterceptorManager";
import mergeObjects from "../helper/mergeObject";
import { Interceptor, RequestCommonConfig, RequestWithUrlConfig } from "../types/global";
import getHeaders from "../helper/getHeaders";
import HttpError from "./HttpError";
import HttpResponse from "./HttpResponse";

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

      const requestObject = {
        data: requestConfig.data,
        method: requestConfig.method!,
        timeout: requestConfig.timeout!,
        url: "",
        headers: {},
      };

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

      requestObject.url = endpoint;
      requestObject.headers = getHeaders(requestOptions.headers);

      const timeoutId = setTimeout(() => {
        if (this.defaults.timeout) {
          controller.abort();
          reject(
            new HttpError({
              message: this.defaults.timeoutMessage || "Request Timeout",
              request: requestObject,
            })
          );
        }
      }, this.defaults.timeout);

      try {
        const response = await fetch(endpoint, {
          ...requestOptions,
          signal: controller.signal,
        });

        const resData = await response.json();

        if (response.ok) {
          resolve(
            new HttpResponse({
              data: resData,
              request: requestObject,
              response,
            })
          );
        }

        if (!response.ok) {
          reject(
            new HttpError({
              message: `Request failed with status ${response.status}`,
              request: requestObject,
              response: {
                data: resData,
                status: response.status,
                statusText: response.statusText,
              },
            })
          );
        }
      } catch (error) {
        const networkError = error instanceof TypeError && error.message === "Failed to fetch";

        if (networkError) {
          reject(
            new HttpError({
              message: `Network Error. Failed to fetch`,
              name: "TimeoutError",
              request: requestObject,
            })
          );
        }
        reject(error);
      } finally {
        clearTimeout(timeoutId);
      }
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
