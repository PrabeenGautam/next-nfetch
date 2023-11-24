import HttpClient from "./core/HttpClient";
import defaults from "./default";
import mergeObjects from "./helper/mergeObject";
import {
  InstanceConfig,
  RequestCommonConfig,
  HTTPRequestConfig,
} from "./types";

function createInstance(config: RequestCommonConfig) {
  const httpClient = new HttpClient(config);
  const instance = HttpClient.prototype.request.bind(
    httpClient
  ) as HTTPRequestConfig;

  instance["create"] = function create(instanceConfig: InstanceConfig) {
    const mergedConfig = mergeObjects(defaults, instanceConfig);
    return createInstance(mergedConfig);
  };

  return instance;
}

const httpClient = createInstance(defaults);

export default httpClient;
