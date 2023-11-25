import { BaseRequestConfig } from "../types";
import InterceptorManager from "./InterceptorManager";
import mergeObjects from "../helper/mergeObject";
import getHeaders from "../helper/getHeaders";
import HttpError from "./HttpError";
import HttpResponse from "./HttpResponse";
import fetchData from "./fetchData";
import {
  HTTPMethod,
  RequestInterceptor,
  RequestCommonConfig,
  RequestWithUrlConfig,
  RequestNoDataWithURLConfig,
  RequestWithDataWithURLConfig,
} from "../types/global";

class HttpClient {
  private defaults: RequestWithUrlConfig;
  private requestInterceptors: InterceptorManager;

  constructor(defaults: RequestCommonConfig) {
    this.defaults = defaults;
    this.requestInterceptors = new InterceptorManager();
  }

  request(entry: URL | BaseRequestConfig, config: RequestCommonConfig = {}) {
    return new Promise(async (resolve, reject) => {
      const isString = typeof entry === "string";
      const instanceConfig = isString ? { ...config, url: entry } : entry;

      let requestConfig = mergeObjects(this.defaults, instanceConfig) as BaseRequestConfig;

      const requestObject = {
        data: requestConfig.data,
        method: requestConfig.method!,
        timeout: requestConfig.timeout!,
        url: "",
        headers: {},
        cache: requestConfig.cache!,
        next: requestConfig.next!,
      };

      const requestHeaders = this.buildHeaders(requestConfig.headers);

      const requestOptions = {
        cache: requestConfig.cache,
        method: requestConfig.method,
        next: requestConfig.next,
        headers: requestHeaders,
        body: requestConfig.data ? JSON.stringify(requestConfig.data) : requestConfig.data,
      };

      if (["get", "head", "options"].includes(requestOptions.method!.toLowerCase())) {
        delete (requestOptions as any).body;
      }

      const endpoint = this.buildUrl(requestConfig.url, requestConfig.params);
      requestObject.url = endpoint;

      const controller = new AbortController();

      const timeout = requestConfig.timeout || this.defaults.timeout;
      const timeoutMessage = requestConfig.timeoutMessage || this.defaults.timeoutMessage;

      const timeoutId = setTimeout(() => {
        if (timeout) {
          controller.abort();
          reject(
            new HttpError({
              message: timeoutMessage || "Request Timeout",
              request: requestObject,
            })
          );
        }
      }, timeout);

      try {
        await this.executeRequestInterceptors(requestOptions);
        requestObject.headers = getHeaders(requestOptions.headers);

        const { resData, response } = await fetchData(endpoint, requestOptions, controller);

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

  useRequestInterceptor(interceptor: RequestInterceptor) {
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

// method with no body
["delete", "get", "head", "options"].forEach((m) => {
  // @ts-ignore
  HttpClient.prototype[m] = function (entry: URL | RequestNoDataWithURLConfig, config?: any = {}) {
    const isString = typeof entry === "string";
    const method = m as HTTPMethod;

    if (isString) {
      return this.request(entry, { ...config, method });
    } else {
      return this.request({ ...entry, method });
    }
  };
});

// method with body
["post", "put", "patch"].forEach((m) => {
  // @ts-ignore
  HttpClient.prototype[m] = function (entry: URL | RequestWithDataWithURLConfig, config?: any) {
    const isString = typeof entry === "string";
    const method = m as HTTPMethod;

    if (isString) {
      return this.request(entry, { ...config, method });
    } else {
      return this.request({ ...entry, method });
    }
  };
});

export default HttpClient;
