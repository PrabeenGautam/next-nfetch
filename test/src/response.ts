import httpClient from "../../src";

export async function getResponse() {
  httpClient("/api/demo", {
    data: "",
    headers: {
      "Accept-Charset": "demo",
      "Content-Type": "demo",
    },
  });

  const instance = httpClient.create({
    baseURL: "http://www.localhost:8000/",
  });

  instance("/api/demo", {
    data: "",
    headers: {
      "Accept-Charset": "demo",
      "Content-Type": "demo",
    },
    params: {
      sort: 1,
      limit: 10,
      page: 2,
    },
    method: "post",
  });

  httpClient("https://www.andraware.com", {
    method: "get",
    data: { identifier: "demo" },
  });
}
