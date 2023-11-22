import "./style.css";
import typescriptLogo from "./typescript.svg";
import { getResponse } from "./response.ts";

getResponse();

document.querySelector<HTMLDivElement>("#app")!.innerHTML = `
  <div>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>
    <h1>next-nfetch</h1>
    <p class="read-the-docs">
      Check response file about the usage
    </p>
  </div>
`;
