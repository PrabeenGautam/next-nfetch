import { HTTPMethod } from "../enum";
import { RequestCommonConfig } from "../types/global";

export const commonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json, text/plain, */*",
};

const defaults: RequestCommonConfig = {
  cache: "no-cache",
  data: undefined,
  method: HTTPMethod.GET,
  timeout: 0,
  timeoutMessage: "Network Error. Failed to fetch",
  params: {},
  headers: commonHeaders,
};

export default defaults;
