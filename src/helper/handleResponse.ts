async function handleResponse(response: Response) {
  const contentType = response.headers.get("content-type");

  const isJSON = contentType && contentType.includes("application/json");

  if (isJSON) {
    return await response.json();
  }

  return await response.text();
}

export default handleResponse;
