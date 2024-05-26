import { FieldInfo } from "./interfaces";

const fieldInfo: FieldInfo = {
  extendStart: null,
  mouseDown: false,
  newLine: false,
  clickedField: [],
  clickedItem: null,
  copied: [],
  history: [[]],
  paste: false,
  tempField: [],
};

export default fieldInfo;
