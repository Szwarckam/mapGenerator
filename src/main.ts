// console.log(arr);
// htmlElements.itemsDiv.style.backgroundImage = 'url("./img/sprite2.png")';

import htmlElements from "./data";
import FieldDivElements from "./fieldDivs";
import Generator from "./genrate";
import { position } from "./interfaces";

function init(): void {
  const resizableDiv: HTMLDivElement = <HTMLDivElement>document.querySelector("#resizableDiv");
  Generator.genItems(8, 16, htmlElements.itemsDiv);
  Generator.genItems(28, 20, htmlElements.fieldDiv);
  document.addEventListener("mousedown", (e: MouseEvent) => {
    resizableDiv.style.display = "block";
    resizableDiv.style.position = "absolute";
    resizableDiv.style.width = "0px";
    resizableDiv.style.height = "0px";
    resizableDiv.style.backgroundColor = "rgba(36, 36, 36, 0.2)";
    resizableDiv.style.left = `${e.clientX}px`;
    resizableDiv.style.top = `${e.clientY}px`;
    resizableDiv.dataset.positionX = `${e.clientX}`;
    resizableDiv.dataset.positionY = `${e.clientY}`;
    document.body.append(resizableDiv);
  });
  document.addEventListener("mousemove", (e: MouseEvent) => {
    const ogX: number = parseInt(resizableDiv.dataset.positionX!);
    const ogY: number = parseInt(resizableDiv.dataset.positionY!);
    resizableDiv.style.width = `${e.clientX - ogX}px`;
    resizableDiv.style.height = `${e.clientY - ogY}px`;
    if (e.clientX < ogX) {
      resizableDiv.style.left = `${e.clientX}px`;
      resizableDiv.style.width = `${ogX - e.clientX}px`;
    }
    if (e.clientY < ogY) {
      resizableDiv.style.top = `${e.clientY}px`;
      resizableDiv.style.height = `${ogY - e.clientY}px`;
    }
  });
  document.addEventListener("mouseup", (e: MouseEvent) => {
    resizableDiv.style.display = "none";
  });
}

document.addEventListener("keydown", (e: KeyboardEvent) => {
  if (e.code == "Delete") {
    console.log("Usuwanie");
    for (const object of htmlElements.clickedField) {
      object.div.style.backgroundImage = "";
      object.clicked = true;
      object.div.classList.add("marked");
    }
  } else if (e.ctrlKey && e.code == "KeyC") {
    console.log("Kopiowanie");
    htmlElements.copied = [...htmlElements.clickedField];
    console.log(htmlElements.copied);
  } else if (e.ctrlKey && e.code == "KeyV") {
    if (htmlElements.copied.length > 0) {
      htmlElements.paste = true;
    }
  }
});

init();
