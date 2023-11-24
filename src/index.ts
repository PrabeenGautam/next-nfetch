import defaults from "./default";
import { extend } from "./lib/utils";
import { HTTPClientBase, InstanceConfig, RequestMethodConfig } from "./types";
import HttpClient from "./core/HttpClient";
import mergeObjects from "./helper/mergeObject";
import { RequestCommonConfig } from "./types/global";

function createInstanceNoCreate(config: RequestCommonConfig): RequestMethodConfig {
  const instance = new HttpClient(config);
  const funcInstance = HttpClient.prototype.request.bind(instance) as any;

  // Copy class methods to function instance
  extend(HttpClient.prototype, funcInstance, instance);

  // Copy class properties to function instance
  extend(instance, funcInstance);

  return funcInstance;
}

// Create the default instance to be exported and add it to the prototype chain
// Make first instance only have create method
function createInstance(config: RequestCommonConfig) {
  const httpClient = createInstanceNoCreate(config) as HTTPClientBase;

  httpClient.create = function create(config: InstanceConfig) {
    const mergedConfig = mergeObjects(defaults, config);
    return createInstanceNoCreate(mergedConfig);
  };

  return httpClient;
}

const httpClient = createInstance(defaults);

export default httpClient;
