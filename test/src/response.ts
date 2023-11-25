import httpClient from "../../src";

export async function getResponse() {
  const instance = httpClient.create({
    baseURL: "http://www.localhost:8000/",
    timeout: 1000,
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

  try {
    await instance("/api/demo", {
      headers: {
        "Accept-Charset": "demo",
        "Content-Type": "demo",
      },
      method: "post",
      data: {
        name: "demo",
      },
    });
  } catch (error) {
    console.log(error);
  }
}
