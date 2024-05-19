import FieldDivElements from "./fieldDivs";
import { htmlElementContainer } from "./interfaces";

const htmlElements: htmlElementContainer = {
  fieldDiv: <HTMLDivElement>document.querySelector("#field"),
  itemsDiv: <HTMLDivElement>document.querySelector("#items"),
  clickedField: [],
  clickedItem: null,
  copied: [],
  automat: <HTMLInputElement>document.querySelector("#automat"),
  paste: false,
  tempField: [],
};

export default htmlElements;
