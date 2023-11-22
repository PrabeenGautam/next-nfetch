import { HTTPMethod } from "../types";
import getHeaders from "./getHeaders";

interface Options {
  data: any;
  response: Response;
  request: HttpRequest;
}

interface HttpRequest {
  data: { [key: string]: string } | undefined;
  headers: Record<string, string>;
  method: HTTPMethod;
  timeout: number;
  url: string;
}

class HttpResponse {
  data: any;
  headers: Record<string, string>;
  request: HttpRequest;
  status: number;
  statusText: string;

  constructor(options: Options) {
    this.data = options.data;
    this.headers = getHeaders(options.response.headers);
    this.request = options.request;

    this.status = options.response.status;
    this.statusText = options.response.statusText;
  }
}

export default HttpResponse;
