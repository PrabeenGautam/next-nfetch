import { RequestCommonConfig } from "../types/global";

export const commonHeaders = {
  "Content-Type": "application/json",
  Accept: "application/json, text/plain, */*",
};

const defaults: RequestCommonConfig = {
  data: undefined,
  method: "get",
  timeout: 0,
  timeoutMessage: "Request Timeout. Failed to fetch",
  params: {},
  headers: commonHeaders,
  next: {
    tags: [],
  },
};

export default defaults;
