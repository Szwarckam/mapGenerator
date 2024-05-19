import FieldDivElements from "./fieldDivs";
import ItemDivElements from "./itemDivs";

export interface htmlElementContainer {
  fieldDiv: HTMLDivElement;
  itemsDiv: HTMLDivElement;
  clickedField: FieldDivElements[];
  clickedItem: null | ItemDivElements;
  automat: HTMLInputElement;
  copied: FieldDivElements[];
  paste: boolean;
  tempField: FieldDivElements[];
}

export interface position {
  x: number;
  y: number;
}

export interface size {
  height: number;
  width: number;
}
