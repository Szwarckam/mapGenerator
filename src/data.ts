// import FieldDivElements from "./fieldDivs";
import { HtmlElementContainer } from "./interfaces";

const htmlElements: HtmlElementContainer = {
  fieldDiv: <HTMLDivElement>document.querySelector("#field"),
  itemsDiv: <HTMLDivElement>document.querySelector("#items"),
  clickedField: [],
  clickedItem: null,
  copied: [],
  history: [[]],
  automat: <HTMLInputElement>document.querySelector("#automat"),
  paste: false,
  tempField: [],
};

export default htmlElements;
