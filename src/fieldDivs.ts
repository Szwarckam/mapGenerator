import { CopyField, Position } from "./interfaces";
import htmlElements from "./data";
import Generator from "./genrate";

let extendStart: FieldDivElements | null = null;

export default class FieldDivElements {
  public x: number;
  public y: number;
  public clicked: boolean;
  public backgroundPositionY: string = "";
  public backgroundPositionX: string = "";
  public backgroundImage: string = "";
  div: HTMLDivElement;
  parentDiv: HTMLDivElement;
  constructor(posObj: Position, parentDiv: HTMLDivElement) {
    this.x = posObj.x;
    this.y = posObj.y;
    this.clicked = false;
    this.parentDiv = parentDiv;
    this.div = <HTMLDivElement>document.createElement("div");
    this.div.style.left = `${this.x * 50}px`;
    this.div.style.top = `${this.y * 50}px`;
    this.createDiv();
    this.addClickListener();
  }
  private createDiv(): void {
    this.parentDiv.append(this.div);
    this.div.classList.add("fields-div");
  }
  private addClickListener(): void {
    this.div.addEventListener("mousedown", (e: MouseEvent) => {
      console.log(e.button);
      if (e.button === 0) {
        if (!(e.ctrlKey || e.metaKey)) {
          for (const object of htmlElements.clickedField) {
            object.div.classList.remove("marked");
            object.clicked = false;
          }
          htmlElements.clickedField.length = 0;
          htmlElements.clickedField?.push(this);
        } else if ((e.ctrlKey || e.metaKey) && !this.clicked) {
          extendStart = this;
        } else if (htmlElements.paste) {
          // console.log("Przerwanie wklejania");
          for (const object of htmlElements.tempField) {
            object.backgroundPositionX = object.div.style.backgroundPositionX;
            object.backgroundPositionY = object.div.style.backgroundPositionY;
            object.backgroundImage = object.div.style.backgroundImage;
          }
          htmlElements.paste = false;
        }
      }
    });

    this.div.addEventListener(
      "mouseup",
      (e: MouseEvent) => {

        if (e.button === 0) {
          if (!(e.ctrlKey || e.metaKey)) {
            htmlElements.clickedField?.push(this);
            this.markField();
          } else if ((e.ctrlKey || e.metaKey) && this.clicked) {
            console.log(this);
            console.log("Usuwanie");
            htmlElements.clickedField = htmlElements.clickedField.filter((element: FieldDivElements) => {
              console.log({ pos: element.position, x: this.x, y: this.y });
              return element.position.x !== this.x || element.position.y !== this.y;
            });
            this.div.classList.remove("marked");
            this.clicked = false;
            console.log(htmlElements.clickedField);
          } else if ((e.ctrlKey || e.metaKey) && !this.clicked) {
            if (extendStart) {
              const arr: FieldDivElements[] = this.findArray(extendStart, this);
              for (const object of arr) {
                extendStart = null;
                object.div.classList.add("marked");
                object.clicked = true;
                htmlElements.clickedField?.push(object);
              }
            } else {
              htmlElements.clickedField?.push(this);
              this.clicked = true;
              this.div.classList.add("marked");
            }

            console.log("Poszerzanie");
            console.log(htmlElements.clickedField);
          }
        }


      },
      true
    );
    this.div.addEventListener(
      "mouseover",
      (e: MouseEvent) => {
        if (htmlElements.paste) {
          console.log("Paste");
          htmlElements.tempField.length = 0;
          const toClear: FieldDivElements[] = Generator.fieldDivs.filter((el) => el.clicked);
          for (const object of toClear) {
            object.div.style.backgroundImage = "";
            object.div.classList.remove("marked");
            object.clicked = true;
          }
          console.log(htmlElements.copied);
          console.log(htmlElements.clickedField);
          if (htmlElements.clickedField.length == 2) {
            const startField = this;
            const startCord = { x: startField.x, y: startField.y };
            console.log(startField);
            for (const object of htmlElements.copied) {
              const newX = startCord.x + (object.x - htmlElements.copied[0].x);
              const newY = startCord.y + (object.y - htmlElements.copied[0].y);

              const NewField = Generator.fieldDivs.find((el) => el.x === newX && el.y === newY);

              // console.log(NewField);

              if (NewField) {
                htmlElements.tempField.push(NewField);
                // if (object.backgroundImage == "") {
                NewField.div.style.backgroundImage = object.backgroundImage;
                // }

                NewField.div.style.backgroundPositionX = object.backgroundPositionX;
                NewField.div.style.backgroundPositionY = object.backgroundPositionY;
              }
            }
            console.log("Nowe pola");
            //this.saveHisory()
            console.log("Wklejanie");
          }
        } else {
        }
      },
      true
    );
    this.div.addEventListener("mouseout", (e: MouseEvent) => {
      if (htmlElements.paste) {
        for (const object of htmlElements.tempField) {
          object.div.classList.remove("marked");
          object.clicked = false;
          if (object.backgroundPositionY == "") {
            object.div.style.backgroundImage = "";
          } else {
            object.div.style.backgroundPositionX = object.backgroundPositionX;
            object.div.style.backgroundPositionY = object.backgroundPositionY;
            object.div.style.backgroundImage = object.backgroundImage;
          }
        }
      }
    });
  }

  private findArray(item0: FieldDivElements, item1: FieldDivElements): FieldDivElements[] {
    const minX: number = Math.min(item0.position.x, item1.position.x);
    const maxX: number = Math.max(item0.position.x, item1.position.x);
    const minY: number = Math.min(item0.position.y, item1.position.y);
    const maxY: number = Math.max(item0.position.y, item1.position.y);

    const arr: FieldDivElements[] = Generator.fieldDivs.filter((element) => {
      return (
        element.position.x >= minX &&
        element.position.x <= maxX &&
        element.position.y >= minY &&
        element.position.y <= maxY
      );
    });
    return arr;
  }
  private markField(): void {
    if (htmlElements.paste) {
      console.log("Przerwanie wklejania");
      for (const object of htmlElements.tempField) {
        object.backgroundPositionX = object.div.style.backgroundPositionX;
        object.backgroundPositionY = object.div.style.backgroundPositionY;
        object.backgroundImage = object.div.style.backgroundImage;
      }
      this.saveHisory(htmlElements.tempField)
      htmlElements.paste = false;
      htmlElements.tempField.length = 0;
      htmlElements.clickedField.length = 0;

    } else {
      if (
        htmlElements.clickedField[0].position.x !== htmlElements.clickedField[1].position.x ||
        htmlElements.clickedField[0].position.y !== htmlElements.clickedField[1].position.y
      ) {
        const elementsInBounds = this.findArray(htmlElements.clickedField[0], htmlElements.clickedField[1]);
        console.log(elementsInBounds);

        htmlElements.clickedField = elementsInBounds;
        for (const object of htmlElements.clickedField) {
          object.div.classList.add("marked");
          object.clicked = true;
        }
      } else {
        htmlElements.clickedField[0].div.classList.add("marked");
        htmlElements.clickedField[0].clicked = true;
        console.log("Klikniętą ten sam");
        console.log(htmlElements.clickedField[0]);
      }
      // this.saveHisory()
    }
  }
  saveHisory(arr: CopyField[]): void {
    if (arr.length > 1) {
      console.log("Zapisywanie historii");

      const tempHistory: CopyField[] = []
      for (const object of arr) {
        const copiedData: CopyField = {
          x: object.x,
          y: object.y,
          backgroundPositionX: object.backgroundPositionX,
          backgroundPositionY: object.backgroundPositionY,
          backgroundImage: object.backgroundImage,
        };
        tempHistory.push(copiedData);
      }
      htmlElements.history.push(tempHistory)
      console.log("[DEBBUGER] HISTORIA:");

      console.log(htmlElements.history);

    }
  }

  public get position(): Position {
    return { x: this.x, y: this.y };
  }
}
