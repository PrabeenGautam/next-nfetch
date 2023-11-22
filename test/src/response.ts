import { HttpClient } from "next-nfetch";

const instance = HttpClient.getInstance({
  baseURL: "http://localhost:8000/api",
  timeout: 10000, // 10 sec
});

instance.useRequestInterceptor({
  onFulfilled(config) {
    // way to intercept request methods
    config.headers.set("Authorization", "Bearer token");
    return config;
  },

  onRejected(error) {
    return Promise.reject(error);
  },
});

export async function getResponse() {
  try {
    const res = await instance.request("auth/login/verify", {
      method: "post",
      data: { identifier: "prabingautam0123" },
    });

    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
