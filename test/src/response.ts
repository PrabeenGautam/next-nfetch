import httpClient from "next-nfetch";

export async function getResponse() {
  try {
    await httpClient.get("https://jsonplaceholder.typicode.com/todos/1/1").then(console.log);
  } catch (error) {
    console.log(error);
  }
}
