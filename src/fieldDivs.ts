import { Position } from "./interfaces";
import generator from "./genrate";
import fieldInfo from "./divInfo";
import handlerManager from "./handlers";

/**
 *  Tworzy klasę obiektu dla pola rozstawaiania.
 */
export default class FieldDivElements {
  /**
   *  Współrzędna X
   */
  public x: number;
  /**
   *  Współrzędna Y
   */
  public y: number;
  /**
   *  Informacja czy jest kliknięty
   */
  public clicked: boolean;
  /**
   *  Pozycja tła X
   */

  public backgroundPositionY: string = "";

  /**
   *  Pozycja tła Y
   */

  public backgroundPositionX: string = "";
  /**
   *  Obrazek tła
   */
  public backgroundImage: string = "";
  /**
   *  Div odpowiadający tej klasie
   */
  div: HTMLDivElement;
  /**
   *  Rodzic diva odpowiadający tej klasie
   */
  parentDiv: HTMLDivElement;
  /**
   * Inicjalizuje obsługę diva.
   * @param posObj Oiekt zawierający współrzędne
   * @param parentDiv Rodzic diva
   */
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
  /**
   *  Tworzy div i dodaje go do rodzica
   */
  private createDiv(): void {
    this.parentDiv.append(this.div);
    this.div.classList.add("fields-div");
  }
  /**
   *  Obsługa eventListenerów
   */
  private addClickListener(): void {
    this.div.addEventListener("mousedown", (e: MouseEvent) => {
      fieldInfo.mouseDown = true;
      if (e.button === 0) {
        if (!(e.ctrlKey || e.metaKey)) {
          for (const object of fieldInfo.clickedField) {
            object.div.classList.remove("marked");
            object.clicked = false;
          }
          fieldInfo.clickedField.length = 0;
          fieldInfo.clickedField.push(this);
        } else if (e.ctrlKey || e.metaKey) {
          fieldInfo.extendStart = this;
        }
      }
    });
    this.div.addEventListener("mousemove", (e: MouseEvent) => {
      // console.log(this);
      console.log(fieldInfo.paste);

      if (fieldInfo.paste) {
        fieldInfo.tempField.length = 0;
        const toClear = generator.fieldDivs.filter((el) => el.clicked);
        for (const object of toClear) {
          // object.div.style.backgroundImage = "";
          object.div.classList.remove("marked");
          object.clicked = true;
        }

        const startField = this;
        const startCord = { x: startField.x, y: startField.y };
        for (const object of fieldInfo.copied) {
          const newX = startCord.x + (object.x - fieldInfo.copied[0].x);
          const newY = startCord.y + (object.y - fieldInfo.copied[0].y);
          const NewField = generator.fieldDivs.find((el) => el.x === newX && el.y === newY);

          if (NewField) {
            fieldInfo.tempField.push(NewField);
            NewField.div.style.backgroundImage = object.backgroundImage;
            NewField.div.classList.add("temp-marked");
            NewField.div.style.backgroundPositionX = object.backgroundPositionX;
            NewField.div.style.backgroundPositionY = object.backgroundPositionY;
          }
        }
      }
    });
    this.div.addEventListener(
      "mouseup",
      (e: MouseEvent) => {
        fieldInfo.mouseDown = false;
        // console.log(fieldInfo.extendStart);

        if (e.button === 0) {
          if (!(e.ctrlKey || e.metaKey)) {
            fieldInfo.clickedField.push(this);
            this.markField();
            if (fieldInfo.extendStart) {
              for (const object of generator.fieldDivs) {
                object.clicked = false;
                object.div.classList.remove("marked");
                fieldInfo.extendStart = null;
              }
            }
          } else if (e.ctrlKey || e.metaKey) {
            if (fieldInfo.extendStart) {
              console.log(this);
              console.log(fieldInfo.clickedField.find((el) => el.clicked !== false));
              if (!fieldInfo.extendStart.clicked || !this.clicked) {
                console.log("Poszerz wewnątrz");
                console.log(fieldInfo.extendStart);
                // console.log(this);

                const arr = this.findArray(fieldInfo.extendStart, this);
                for (const object of arr) {
                  object.div.classList.add("marked");
                  object.clicked = true;
                  if (!fieldInfo.clickedField.find((el) => el.x == object.x && el.y == object.y)) {
                    fieldInfo.clickedField.push(object);
                  }
                }
                fieldInfo.extendStart = null;
              } else if ((e.ctrlKey || e.metaKey) && this.clicked) {
                if (fieldInfo.extendStart.x == this.x && fieldInfo.extendStart.y == this.y) {
                  console.log("usuwanie");

                  fieldInfo.clickedField = fieldInfo.clickedField.filter((element) => {
                    return element.x !== this.x || element.y !== this.y;
                  });
                  this.div.classList.remove("marked");
                  this.clicked = false;
                }

                // } else if ((e.ctrlKey || e.metaKey) && this.clicked && !fieldInfo.extendStart) {
                //   fieldInfo.clickedField = fieldInfo.clickedField.filter((element) => {
                //     return element.x !== this.x || element.y !== this.y;
                //   });
                //   console.log("Usuwanie");

                //   this.div.classList.remove("marked");
                //   this.clicked = false;
              }
            }
          }
        }
      },
      true
    );

    this.div.addEventListener(
      "mouseover",
      (e: MouseEvent): void => {
        // console.log(e);
        if (fieldInfo.mouseDown) {
          if (fieldInfo.extendStart) {
            const elementsInBounds = this.findArray(fieldInfo.extendStart, this);
            // console.log(elementsInBounds);

            // fieldInfo.clickedField = elementsInBounds;
            for (const object of elementsInBounds) {
              object.div.classList.add("marked");
              // object.clicked = true;
            }
          } else {
            const elementsInBounds = this.findArray(fieldInfo.clickedField[0], this);
            // console.log(elementsInBounds);

            // fieldInfo.clickedField = elementsInBounds;
            for (const object of elementsInBounds) {
              object.div.classList.add("marked");
              // object.clicked = true;
            }
          }
        }
      },
      true
    );

    this.div.addEventListener("mouseout", () => {
      // console.log(e);
      // const toClear = generator.fieldDivs.filter((el) => el == true);
      if (fieldInfo.mouseDown) {
        for (const object of generator.fieldDivs) {
          // object.div.style.backgroundImage = "";
          if (!object.clicked) {
            object.div.classList.remove("marked");
          }

          // object.clicked = true;
        }
      }

      if (fieldInfo.paste) {
        for (const object of fieldInfo.tempField) {
          object.div.classList.remove("temp-marked");
          object.clicked = false;
          // if (object.backgroundImage == "") {
          //   object.div.style.backgroundImage = "";
          // } else {
          object.div.style.backgroundPositionX = object.backgroundPositionX;
          object.div.style.backgroundPositionY = object.backgroundPositionY;
          object.div.style.backgroundImage = object.backgroundImage;
          // }
        }
      }
    });
  }
  /**
   *  Wyszukuje listy w podanych przedziałach
   */
  private findArray(item0: FieldDivElements, item1: FieldDivElements): FieldDivElements[] {
    const minX = Math.min(item0.x, item1.x);
    const maxX = Math.max(item0.x, item1.x);
    const minY = Math.min(item0.y, item1.y);
    const maxY = Math.max(item0.y, item1.y);
    return generator.fieldDivs.filter(
      (element) => element.x >= minX && element.x <= maxX && element.y >= minY && element.y <= maxY
    );
  }
  /**
   *  Zaznacza graficznie pola
   */
  private markField(): void {
    if (fieldInfo.paste) {
      for (const object of fieldInfo.tempField) {
        object.div.classList.remove("temp-marked");
        object.backgroundPositionX = object.div.style.backgroundPositionX;
        object.backgroundPositionY = object.div.style.backgroundPositionY;
        object.backgroundImage = object.div.style.backgroundImage;
      }
      handlerManager.saveHistory();
      // console.log("MarkField", fieldInfo.tempField);

      fieldInfo.paste = false;
      fieldInfo.tempField.length = 0;
      fieldInfo.clickedField.length = 0;
    } else {
      if (fieldInfo.clickedField.length > 1) {
        if (
          fieldInfo.clickedField[0].x !== fieldInfo.clickedField[1].x ||
          fieldInfo.clickedField[0].y !== fieldInfo.clickedField[1].y
        ) {
          const elementsInBounds = this.findArray(fieldInfo.clickedField[0], fieldInfo.clickedField[1]);
          fieldInfo.clickedField = elementsInBounds;
          for (const object of fieldInfo.clickedField) {
            object.div.classList.add("marked");
            object.clicked = true;
          }
        } else {
          fieldInfo.clickedField[0].div.classList.add("marked");
          fieldInfo.clickedField[0].clicked = true;
        }
      }
    }
  }
}
