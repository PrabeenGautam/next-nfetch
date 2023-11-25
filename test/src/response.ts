import httpClient from "../../src";

export async function getResponse() {
  try {
    const response = await httpClient.get({
      url: "https://jsonplaceholder.typicode.com/todos/1",
    });
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}
