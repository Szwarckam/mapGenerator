// import Canvas from "./canvas";
import ItemDivElements from "./itemDivs";
import FieldDivElements from "./fieldDivs";
import { Generator } from "./interfaces";
// import htmlElements from "./data";
/**
 *  Obiekt Generacji
 */
const generator: Generator = {
  //canvas: <Canvas>new Canvas({ height: 1000, width: 1400 }),
  itemDivs: <ItemDivElements[]>[],
  fieldDivs: <FieldDivElements[]>[],
  genItems(x: number, y: number, div: HTMLDivElement): void {
    console.log(div.id);
    // if (!this.divs[div.id]) {
    // this.divs[div.id] = [];
    // }
    for (let i = 0; i < x; i++) {
      for (let j = 0; j < y; j++) {
        if (div.id == "items") {
          const newDiv = new ItemDivElements({ x: i, y: j }, div);
          this.itemDivs.push(newDiv);
        } else {
          const newDiv = new FieldDivElements({ x: i, y: j }, div);
          this.fieldDivs.push(newDiv);
        }
      }
    }
    // console.log(this.divs);
  },
};

// canvasArr.push(newCanvas);

export default generator;
