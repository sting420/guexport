import ReactDOM from "react-dom";
import { ExportButton } from "./exportButton";

console.log("We're inside");

function injectExportButton(node: HTMLElement, link: string) {
  const img = chrome.runtime.getURL("rsc/icon.png");
  const comp = new ExportButton({ link, img });
  const container = document.createElement("div");
  node.appendChild(container);
  ReactDOM.render(comp.render(), container);
}

const aElements = document.getElementsByTagName("a");

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
for (let a of <any>aElements) {
  if (a.href.includes("iCalendar")) {
    const parent = a.parentElement;
    if (parent && parent.tagName === "TD") {
      injectExportButton(parent, a.href);
    }
  }
}
