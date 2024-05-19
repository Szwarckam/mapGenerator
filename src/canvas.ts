import path from "./img/sprite2.png";
import htmlElements from "./data";
import { size } from "./interfaces";

export default class Canvas {
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  constructor(size: size) {
    // this.div = document.createElement("div");
    // this.div.classList.add("items-canvas");
    this.canvas = document.createElement("canvas");
    this.canvas.width = size.width;
    this.canvas.height = size.height;

    this.ctx = <CanvasRenderingContext2D>this.canvas.getContext("2d");
    //this.createCanvas();
    htmlElements.fieldDiv.append(this.canvas);
  }

  // private createCanvas(): void {
  //   console.log("Malowanie canvasa");
  //   this.canvas.width = 50;
  //   this.canvas.height = 50;
  //   console.log(this.sprite);

  //   this.div.appendChild(this.canvas);
  //   this.ctx.drawImage(this.sprite, this.x, this.y, this.canvas.width, this.canvas.height);
  // }
}
