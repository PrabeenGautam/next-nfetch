import handleResponse from "../helper/handleResponse";

// @ts-ignore
async function fetchData(endpoint, requestOptions, controller) {
  const isPatch = requestOptions.method === "patch";
  try {
    const response = await fetch(endpoint, {
      ...requestOptions,
      method: isPatch ? "PATCH" : requestOptions.method,
      signal: controller.signal,
    });

    const resData = await handleResponse(response);

    return { response, resData };
  } catch (error) {
    throw error;
  }
}

export default fetchData;
