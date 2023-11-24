import { Interceptor } from "../types";

class InterceptorManager {
  private interceptors: (Interceptor | null)[] = [];

  use(interceptor: Interceptor) {
    this.interceptors.push(interceptor);
    return this.interceptors.length - 1; // Return the index for removal later
  }

  eject(id: number) {
    if (this.interceptors[id]) {
      this.interceptors[id] = null;
    }
  }

  clear() {
    if (this.interceptors.length > 0) {
      this.interceptors = [];
    }
  }

  async execute(config: any) {
    let chain: Promise<any> = Promise.resolve(config);

    this.interceptors.forEach((interceptor) => {
      if (interceptor !== null) {
        chain = chain.then(
          (conf) => interceptor.onFulfilled && interceptor.onFulfilled(conf),
          (error) => interceptor.onRejected && interceptor.onRejected(error)
        );
      }
    });

    return chain;
  }
}

export default InterceptorManager;
