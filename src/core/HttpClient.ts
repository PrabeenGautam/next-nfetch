import { BaseConfig } from "../types";
import InterceptorManager from "./InterceptorManager";
import mergeObjects from "../helper/mergeObject";
import { Interceptor, RequestCommonConfig } from "../types/global";

class HttpClient {
  private defaults;
  private requestInterceptors: InterceptorManager;

  constructor(defaults: RequestCommonConfig) {
    this.defaults = defaults;
    this.requestInterceptors = new InterceptorManager();
  }

  request(entry: string | BaseConfig, config: RequestCommonConfig = {}) {
    const isString = typeof entry === "string";

    const instanceConfig = isString ? { ...config, url: entry } : entry;

    let requestConfig: BaseConfig = mergeObjects(this.defaults, instanceConfig);
  }

  useRequestInterceptor(interceptor: Interceptor) {
    return this.requestInterceptors.use(interceptor);
  }

  private executeRequestInterceptors(config: BaseConfig): Promise<BaseConfig> {
    return this.requestInterceptors.execute(config);
  }
}

export default HttpClient;
