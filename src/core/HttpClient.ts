import { RequestCommonConfig, BaseConfig, Interceptor } from "../types";
import InterceptorManager from "./InterceptorManager";
import defaults from "../default";
import mergeObjects from "../helper/mergeObject";

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

    let requestConfig: BaseConfig = mergeObjects(defaults, instanceConfig);

    console.log(requestConfig);
  }

  useRequestInterceptor(interceptor: Interceptor) {
    return this.requestInterceptors.use(interceptor);
  }

  private executeRequestInterceptors(config: BaseConfig): Promise<BaseConfig> {
    return this.requestInterceptors.execute(config);
  }
}

export default HttpClient;
