function getHeaders(headers: Headers) {
  const headersObject: Record<string, string> = {};

  headers.forEach((value, name) => {
    headersObject[name] = value;
  });

  return headersObject;
}

export default getHeaders;
