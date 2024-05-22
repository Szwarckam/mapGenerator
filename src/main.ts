import htmlElements from "./data";
// import FieldDivElements from "./fieldDivs";
import generator from "./genrate";
import divSize from "./size";
import handlerManager from "./handlers";
/**
 * Funkcja ustale listeneray dla akcji np: kopiowania, wklejania
 */
function setupEventListeners(): void {
  document.addEventListener("keydown", (e: KeyboardEvent): void => {
    htmlElements.contextMenu.style.display = "none";
    if (e.code == "Delete") {
      handlerManager.handleDelete();
      // debugger
    } else if ((e.ctrlKey || e.metaKey) && e.code == "KeyC") {
      handlerManager.handleCopy();
      // debugger
    } else if ((e.ctrlKey || e.metaKey) && e.code == "KeyX") {
      handlerManager.handleCut();
      // debugger
    } else if ((e.ctrlKey || e.metaKey) && e.code == "KeyV") {
      handlerManager.handlePaste();
      // debugger
    } else if ((e.ctrlKey || e.metaKey) && e.code == "KeyZ") {
      handlerManager.handleUndo();
      // debugger
    } else if ((e.ctrlKey || e.metaKey) && e.code == "KeyY") {
      handlerManager.handleRedo();
      // debugger
    } else if ((e.ctrlKey || e.metaKey) && e.code == "KeyS") {
      // console.log("Zapisywanie mapy");

      e.preventDefault();
      handlerManager.handleSave();
      // debugger
    } else if ((e.ctrlKey || e.metaKey) && e.code == "KeyL") {
      e.preventDefault();
      const input = <HTMLInputElement>document.querySelector("#input");
      input.addEventListener("change", handlerManager.handleRead);
      input.click();
      // debugger
    }
  });
  htmlElements.fieldDiv.addEventListener("click", (): void => {
    htmlElements.contextMenu.style.display = "none";
  });
  document.addEventListener("contextmenu", (e: MouseEvent): void => {
    // console.log("ContextMenu");
    e.preventDefault();

    htmlElements.contextMenu.style.display = htmlElements.contextMenu.style.display == "block" ? "none" : "block";
    htmlElements.contextMenu.style.top = `${e.pageY}px`;
    htmlElements.contextMenu.style.left = `${e.pageX}px`;
    // console.log(e);
  });
  htmlElements.contextMenu.addEventListener("click", (e: MouseEvent) => {
    const target = <HTMLDivElement>e.target;
    if (target) {
      // console.log(target.id);
      switch (target.id) {
        case "undo":
          handlerManager.handleUndo();
          break;
        case "redo":
          handlerManager.handleRedo();
          break;
        case "cut":
          handlerManager.handleCut();
          break;
        case "copy":
          handlerManager.handleCopy();
          break;
        case "paste":
          handlerManager.handlePaste();
          break;
        case "delete":
          handlerManager.handleDelete();
          break;
        case "saveToFile":
          handlerManager.handleSave();
          break;
        case "LoadFromFile":
          const input = <HTMLInputElement>document.querySelector("#input");
          input.addEventListener("change", handlerManager.handleRead);
          input.click();
          break;
      }
      htmlElements.contextMenu.style.display = "none";
    }
  });
}
/**
 *  Inicjuje całą aplikacje
 */
function init(): void {
  const resizableDiv: HTMLDivElement = <HTMLDivElement>document.querySelector("#resizableDiv");
  generator.genItems(divSize.itemsDivWidth, divSize.itemsDivHeight, htmlElements.itemsDiv);
  generator.genItems(divSize.fieldDivWidth, divSize.fieldDivHeight, htmlElements.fieldDiv);
  handlerManager.saveHistory();
  handlerManager.initializeResizableDiv(resizableDiv);

  setupEventListeners();
}

init();
