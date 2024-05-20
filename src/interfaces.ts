import FieldDivElements from "./fieldDivs";
import ItemDivElements from "./itemDivs";

export interface HtmlElementContainer {
  fieldDiv: HTMLDivElement;
  itemsDiv: HTMLDivElement;
  clickedField: FieldDivElements[];
  clickedItem: null | ItemDivElements;
  automat: HTMLInputElement;
  copied: CopyField[];
  history: [CopyField[]];
  paste: boolean;
  tempField: FieldDivElements[];
}

export interface Position {
  x: number;
  y: number;
}

export interface Size {
  height: number;
  width: number;
}

export interface CopyField extends Position {
  backgroundPositionX: string;
  backgroundPositionY: string;
  backgroundImage: string;
}
