import HttpError from "./helper/HttpError";
import HttpResponse from "./helper/HttpResponse";
import getHeaders from "./helper/getHeaders";
import {
  CommonRequestOption,
  ConstructorProps,
  DataRequestOption,
  RequestInterceptor,
  RequestInterceptorOption,
  RequestOptions,
} from "./types";

export class HttpClient {
  private static instance: HttpClient;
  private baseURL: string;
  private timeout: number;
  private requestInterceptors: RequestInterceptor[] = [];

  private constructor(baseURL: string, timeout: number) {
    // Support base URL without trailing slash
    this.baseURL = baseURL.endsWith("/")
      ? baseURL.slice(0, baseURL.length - 1)
      : baseURL;

    // If 0. there won't be a timeout
    this.timeout = timeout;
  }

  static getInstance({ baseURL, timeout = 0 }: ConstructorProps) {
    if (!HttpClient.instance) {
      HttpClient.instance = new HttpClient(baseURL, timeout);
    }
    return HttpClient.instance;
  }

  useRequestInterceptor(interceptor: RequestInterceptor) {
    this.requestInterceptors.push(interceptor);
  }

  private async executeRequestInterceptors(config: RequestInterceptorOption) {
    return this.requestInterceptors.reduce(async (acc, interceptor) => {
      const processedConfig = await acc;
      return interceptor.onFulfilled
        ? interceptor.onFulfilled(processedConfig)
        : processedConfig;
    }, Promise.resolve(config));
  }

  private buildUrl(url: string, params?: any): string {
    const queryParams = new URLSearchParams(params).toString();
    const slashURL = url.startsWith("/") ? url : "/" + url;

    const apiEndpoint = this.baseURL + slashURL;

    return `${apiEndpoint}${queryParams ? `?${queryParams}` : ""}`;
  }

  private buildHeaders(headers?: { [key: string]: string }): Headers {
    const defaultHeaders = {
      "Content-Type": "application/json",
      Accept: "application/json, text/plain, */*",
    };

    return new Headers({ ...defaultHeaders, ...headers });
  }

  async request(url: string, options: RequestOptions = {}): Promise<any> {
    return new Promise(async (fulfilled, rejected) => {
      const {
        method = "get",
        headers = {},
        data = undefined,
        params,
        cache = "no-store",
      } = options;

      const controller = new AbortController();

      const requestURL = this.buildUrl(url, params);
      const requestHeaders = this.buildHeaders(headers);

      const requestOptions = {
        method,
        headers: requestHeaders,
        cache,
        body: data ? JSON.stringify(data) : data,
      };

      if (["get", "head"].includes(method.toLowerCase())) {
        delete (requestOptions as any).body;
      }

      const processedOptions = await this.executeRequestInterceptors(
        requestOptions
      );

      const requestConfig = {
        data,
        headers: getHeaders(processedOptions.headers),
        method,
        timeout: this.timeout,
        url: requestURL,
      };

      const timeoutId = setTimeout(() => {
        if (this.timeout) {
          controller.abort();
          rejected(
            new HttpError({
              message: "Request timeout",
              request: requestConfig,
            })
          );
        }
      }, this.timeout);

      try {
        const response = await fetch(requestURL, {
          ...processedOptions,
          signal: controller.signal,
        });

        const resData = await response.json();

        if (response.ok) {
          fulfilled(
            new HttpResponse({
              data: resData,
              request: requestConfig,
              response,
            })
          );
        } else {
          rejected(
            new HttpError({
              message: `Request failed with status ${response.status}`,
              request: requestConfig,
              response: {
                data: resData,
                status: response.status,
                statusText: response.statusText,
              },
            })
          );
        }
      } catch (error) {
        const networkError =
          error instanceof TypeError && error.message === "Failed to fetch";

        if (networkError) {
          rejected(
            new HttpError({
              message: `Network Error. Failed to fetch`,
              name: "TimeoutError",
              request: requestConfig,
            })
          );
        }
        rejected(error);
      } finally {
        clearTimeout(timeoutId);
      }
    });
  }

  get(url: string, options?: CommonRequestOption): Promise<any> {
    return this.request(url, { ...options, method: "get" });
  }

  post(url: string, options?: DataRequestOption): Promise<any> {
    return this.request(url, { ...options, method: "post" });
  }

  put(url: string, options?: DataRequestOption): Promise<any> {
    return this.request(url, { ...options, method: "put" });
  }

  patch(url: string, options?: DataRequestOption): Promise<any> {
    return this.request(url, { ...options, method: "patch" });
  }

  delete(url: string, options?: DataRequestOption): Promise<any> {
    return this.request(url, { ...options, method: "delete" });
  }
}

export default HttpClient;
