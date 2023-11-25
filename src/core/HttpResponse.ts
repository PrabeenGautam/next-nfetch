import getHeaders from "../helper/getHeaders";
import { HTTPRequestDetails } from "../types/global";

interface Options {
  data: any;
  response: Response;
  request: HTTPRequestDetails;
}

class HttpResponse {
  data: any;
  headers: Record<string, string>;
  request: HTTPRequestDetails;
  status: number;
  statusText: string;
  response: Response;

  constructor(options: Options) {
    this.data = options.data;
    this.headers = getHeaders(options.response.headers);
    this.request = options.request;
    this.response = options.response;
    this.status = options.response.status;
    this.statusText = options.response.statusText;
  }
}

export default HttpResponse;
