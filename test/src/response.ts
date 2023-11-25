import httpClient from "next-nfetch";

export async function getResponse() {
  try {
    console.log(httpClient);
  } catch (error) {
    console.log(error);
  }
}
