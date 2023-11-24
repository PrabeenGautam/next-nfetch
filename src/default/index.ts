import { HTTPMethod } from "../enum";
import { RequestCommonConfig } from "../types";

const defaults: RequestCommonConfig = {
  cache: "no-cache",
  data: undefined,
  method: HTTPMethod.GET,
  timeout: 0,
  timeoutMessage: "Timeout Error. Failed to fetch",
  params: {},
  headers: {},
};

export default defaults;
