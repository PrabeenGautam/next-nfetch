import httpClient from "../../src";

export async function getResponse() {
  httpClient("url", {
    data: "",
    headers: {
      "Accept-Charset": "demo",
      "Content-Type": "demo",
    },
  });
}
