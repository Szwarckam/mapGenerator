// import FieldDivElements from "./fieldDivs";
import { HtmlElementContainer } from "./interfaces";
/**
 *  Przetrzymuje znaczniki z html-a.
 */
const htmlElements: HtmlElementContainer = {
  fieldDiv: <HTMLDivElement>document.querySelector("#field"),
  itemsDiv: <HTMLDivElement>document.querySelector("#items"),
  automat: <HTMLInputElement>document.querySelector("#automat"),
  contextMenu: <HTMLDivElement>document.querySelector("#contextMenu"),
};

export default htmlElements;
