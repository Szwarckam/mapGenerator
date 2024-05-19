import htmlElements from "./data";
import FieldDivElements from "./fieldDivs";
import Generator from "./genrate";
import { position } from "./interfaces";

let farthestElement: FieldDivElements = htmlElements.clickedField[0];
let newLine: boolean = false;
export default class ItemDivElements {
  private x: number;
  private y: number;
  div: HTMLDivElement;
  parentDiv: HTMLDivElement;
  constructor(posObj: position, parentDiv: HTMLDivElement) {
    this.x = posObj.x;
    this.y = posObj.y;
    this.parentDiv = parentDiv;
    this.div = <HTMLDivElement>document.createElement("div");
    this.div.style.left = `${this.x * 50}px`;
    this.div.style.top = `${this.y * 50}px`;
    this.createDiv();
    this.addClickListener();
  }
  private createDiv(): void {
    this.parentDiv.append(this.div);
    this.div.classList.add("items-div");
  }
  private addClickListener(): void {
    this.div.addEventListener("mousedown", () => {
      if (htmlElements.automat.checked) {
        console.log("Kliknięty");
        this.automat();
      } else if (!htmlElements.automat.checked) {
        htmlElements.clickedItem = this;
        if (htmlElements.clickedField.length > 0) {
          for (const object of htmlElements.clickedField) {
            object.div.style.backgroundImage = 'url("./src/img/sprite2.png")';
            object.div.style.backgroundPositionX = `-${this.x * 50}px`;
            object.div.style.backgroundPositionY = `-${this.y * 50}px`;
            // console.log(object.div.style.backgroundImage);
          }
        }
        console.log(htmlElements.clickedItem);
      }
    });
  }
  private automat(): void {
    if (farthestElement) {
    } else {
    }
    farthestElement = htmlElements.clickedField[0];
    if (htmlElements.clickedField.length > 1) {
      for (let i = 1; i < htmlElements.clickedField.length; i++) {
        let obecnyElement: FieldDivElements = htmlElements.clickedField[i];
        const weight = 1000;
        const actualWeightedPosition = obecnyElement.position.x + obecnyElement.position.y * weight;
        const farthestWeightedPosition = farthestElement.position.x + farthestElement.position.y * weight;

        if (actualWeightedPosition > farthestWeightedPosition) {
          farthestElement = obecnyElement;
        }
      }
      if (farthestElement.x == 27) {
        newLine = true;
      }
    }

    console.log(farthestElement);
    if (
      farthestElement.div.style.backgroundPositionX === `-${this.x * 50}px` &&
      farthestElement.div.style.backgroundPositionY == `-${this.y * 50}px`
    ) {
      console.log("Takie sam obrazek");
      console.log(farthestElement.position);
      farthestElement = <FieldDivElements>Generator.fieldDivs.find((element) => {
        console.log(element.position);

        return (
          element.position.x == (farthestElement.position.x + 1) % 28 &&
          element.position.y == farthestElement.position.y % 20
        );
      });
      console.log(farthestElement);
      for (const object of htmlElements.clickedField) {
        object.div.classList.remove("marked");
        object.clicked = false;
      }
      htmlElements.clickedField.length = 0;
      console.log(htmlElements.clickedField.length);

      if (newLine) {
        farthestElement = <FieldDivElements>Generator.fieldDivs.find((element) => {
          console.log(element.position);

          return (
            element.position.x == farthestElement.position.x % 28 &&
            element.position.y == (farthestElement.position.y + 1) % 20
          );
        });
        newLine = !newLine;
      }
      if (farthestElement.x == 27) {
        newLine = true;
      }
      farthestElement.clicked = true;
      farthestElement.div.classList.add("marked");

      farthestElement.div.style.backgroundImage = 'url("./src/img/sprite2.png")';
      farthestElement.div.style.backgroundPositionX = `-${this.x * 50}px`;
      farthestElement.div.style.backgroundPositionY = `-${this.y * 50}px`;

      htmlElements.clickedField.push(farthestElement);
    } else {
      console.log("Inny  obrazek");

      if (htmlElements.clickedField.length > 0) {
        for (const object of htmlElements.clickedField) {
          object.div.style.backgroundImage = 'url("./src/img/sprite2.png")';
          object.div.style.backgroundPositionX = `-${this.x * 50}px`;
          object.div.style.backgroundPositionY = `-${this.y * 50}px`;
          // console.log(object.div.style.backgroundImage);
        }
      }
    }
  }
  public get position(): position {
    return { x: this.x, y: this.y };
  }
}
