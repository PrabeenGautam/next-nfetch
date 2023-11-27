<br/>
<p align="center">
  <h3 align="center">Simple HTTP Client</h3>

  <p align="center">
    Http client for browser and node js
    <br/>
    <br/>
    <a href="https://github.com/PrabeenGautam/next-nfetch/issues">Report Bug</a>
    .
    <a href="https://github.com/PrabeenGautam/next-nfetch/issues">Request Feature</a>
  </p>
</p>

<div align="center">

![Contributors](https://img.shields.io/github/contributors/PrabeenGautam/next-nfetch?color=dark-green) ![Issues](https://img.shields.io/github/issues/PrabeenGautam/next-nfetch) ![License](https://img.shields.io/github/license/PrabeenGautam/next-nfetch)

</div>

### Features

- Make http requests from browser and node js
- Intercept request
- Formatted Response and Error configuration
- Support Nextjs cache and revalidate

## Built With

Typescript and built in browser fetch

## Installing

### Package manager

Using npm:

```bash
$ npm install next-nfetch@latest
```

Once the package is installed, you can import the library using `import` or `require` approach:

```js
import httpClient from "next-nfetch";
```

Or

```js
const httpClient = require('next-nfetch');
```

### Usage

You can directly call a function as default exported is a function. There are lots of methods attach to the base function such as get, post, put, etc. 

Function Can ba called as:

```js
const response = httpClient("url", options) // or
const response = httpClient({
  ...options, // Available options are listed below
  url
})
```

| options | types | default | required
|----------------|------------------------------------------------------------------------|----------------------------------------------|----|
| url            | string        |                                       | yes                                 
| method         | string        | get                                   | no
| headers        | Headers       |                                       | no
| params         | Object        | { }                                   | no
| next           | Object        | { }     | no
| data           | any           | undefined                             | no                            
| timeout        | number        | 0                                     | no                                         
| cache          | RequestCache  | no-cache                              | no
| timeoutMessage | string        | Request Timeout. Failed to fetch      | no   


#### Methods with no data attributes
> get, delete, options and head

#### Methods with data attributes
> post. put and patch

### Specific methods

```js
const response  = await httpClient.get("url", options);
const response  = await httpClient.delete("url", options);

const response  = await httpClient.post("url", options);
const response  = await httpClient.patch("url", options);
```

and so on

### Response format
#### API Success Response

```js
{
  data: any; // obtained data from api endpoint
  headers: Record<string, string>; // response headers
  request: HTTPRequestDetails; // request configuration
  response: Response; // actual response send by fetch request
  status: number; // http status code
  statusText: string;
}
```

#### API Error Response

```js
{
  message: string; // error message
  request?: HTTPRequestDetails; // request configuration
  response?: HTTPResponseDetails; // error response details
  name: "HttpError" | "TimeoutError";
  stack?: any; // stack trace where error occurs
}
```

### Creating an instance

You can create a new instance of next-nfetch with a custom config.

```js
const instance = httpClient.create({
  baseURL: "https://some-domain.com/api/",
  timeout: 1000,
});
```

### Requesting from httpclient

```js
try {
  const res = await instance.get("/users/1", options);
  console.log(res);
  
} catch (error) {
  console.log(error);
}
```

### Creating an request interceptors

You can create a request interceptor of next-nfetch with a custom config.

```js
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
```

## Roadmap

See the [open issues](https://github.com/PrabeenGautam/next-nfetch/issues) for a list of proposed features (and known issues).

## Contributing

Contributions are what make the open source community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

- If you have suggestions for adding or removing projects, feel free to [open an issue](https://github.com/PrabeenGautam/next-nfetch/issues/new) to discuss it, or directly create a pull request after you edit the _README.md_ file with necessary changes.
- Please make sure you check your spelling and grammar.
- Create individual PR for each suggestion.

### Creating A Pull Request

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See [LICENSE](https://github.com/PrabeenGautam/next-nfetch/blob/main/LICENSE) for more information.

## Authors

- **Prabin Gautam** - _Comp Sci Student_ - [Prabin Gautam](https://github.com/PrabeenGautam/)
