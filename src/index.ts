import HttpClient from "./core/HttpClient";
import defaults from "./default";
import { InstanceConfig, RequestCommonConfig } from "./types";

function createInstance(config: RequestCommonConfig) {
  const httpClient = new HttpClient(defaults);

  // const instance = bind(Axios.prototype.request, context);

  httpClient.create = function create(instanceConfig: InstanceConfig) {};
  return httpClient;
}
