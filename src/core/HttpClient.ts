import { RequestCommonConfig, InstanceConfig } from "../types";

class HttpClient {
  private defaults;

  constructor(defaults: RequestCommonConfig) {
    this.defaults = defaults;
  }

  create(instanceConfig: InstanceConfig) {}
}

export default HttpClient;
