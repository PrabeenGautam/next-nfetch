import handleResponse from "../helper/handleResponse";

// @ts-ignore
async function fetchData(endpoint, requestOptions, controller) {
  try {
    const response = await fetch(endpoint, {
      ...requestOptions,
      signal: controller.signal,
    });

    const resData = await handleResponse(response);

    return { response, resData };
  } catch (error) {
    throw error;
  }
}

export default fetchData;
