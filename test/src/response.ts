import httpClient from "../../src";

export async function getResponse() {
  const instance = httpClient.create({
    baseURL: "https://jsonplaceholder.typicode.com/",
  });

  instance.useRequestInterceptor({
    onFulfilled: (config) => {
      config.headers.set("Authorization", "demo");
      return config;
    },
    onRejected: (error) => {
      return Promise.reject(error);
    },
  });

  try {
    const response = await httpClient("/posts");

    console.log(response);
  } catch (error) {
    console.log(error);
  }
}
