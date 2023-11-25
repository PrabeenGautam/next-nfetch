import httpClient from "../../src";

export async function getResponse() {
  const instance = httpClient.create({
    baseURL: "http://www.localhost:8000/",
  });

  instance.useRequestInterceptor({
    onFulfilled: (config) => {
      config.headers.set("Authorization", "demo");
      return config;
    },
    onRejected: (error) => {
      console.log("onRejected", error);
      return Promise.reject(error);
    },
  });

  instance("/api/demo", {
    headers: {
      "Accept-Charset": "demo",
      "Content-Type": "demo",
    },
    method: "post",
  });
}
