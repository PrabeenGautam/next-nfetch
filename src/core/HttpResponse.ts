import getHeaders from "../helper/getHeaders";
import { HttpRequest } from "../types/global";

interface Options {
  data: any;
  response: Response;
  request: HttpRequest;
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
