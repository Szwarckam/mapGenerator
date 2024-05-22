import htmlElements from "./data";
import fieldInfo from "./divInfo";
import FieldDivElements from "./fieldDivs";
import generator from "./genrate";
import handlerManager from "./handlers";
import { Position } from "./interfaces";
import divSize from "./size";
/**
 *  Najdalszy div do automatu
 */
let farthestElement: FieldDivElements = fieldInfo.clickedField[0];
/**
 *  Informacja o nowej lini dla automatu
 */
let newLine: boolean = false;

export default class ItemDivElements {
  /**
   *  Współrzędna X
   */
  public x: number;
  /**
   *  Współrzędna Y
   */
  public y: number;
  /**
   *  Div odpowiadający tej klasie
   */
  div: HTMLDivElement;
  /**
   *  Rodzic diva odpowiadający tej klasie
   */
  parentDiv: HTMLDivElement;

  constructor(posObj: Position, parentDiv: HTMLDivElement) {
    this.x = posObj.x;
    this.y = posObj.y;
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
    this.div.classList.add("items-div");
  }
  /**
   *  Obsługa eventListenerów
   */
  private addClickListener(): void {
    this.div.addEventListener("mousedown", () => {
      if (htmlElements.automat.checked) {
        // console.log("Kliknięty");
        this.automat();
      } else {
        this.handleClick();
      }
    });
  }

  private handleClick(): void {
    fieldInfo.clickedItem = this;
    if (fieldInfo.clickedField.length > 0) {
      this.updateClickedFields();
    }

    // console.log(fieldInfo.clickedItem);
  }
  /**
   *  Zmienia graficzne zaznaczone pola
   */
  private updateClickedFields(): void {
    for (const object of fieldInfo.clickedField) {
      object.div.style.backgroundImage = 'url("./src/img/sprite2.png")';
      object.div.style.backgroundPositionX = `-${this.x * 50}px`;
      object.div.style.backgroundPositionY = `-${this.y * 50}px`;
      object.backgroundPositionX = `-${this.x * 50}px`;
      object.backgroundPositionY = `-${this.y * 50}px`;
      object.backgroundImage = object.div.style.backgroundImage;
    }
    handlerManager.saveHistory();
  }
  /**
   *  Automat - automatycznie przechodzi do następnej komórki
   */
  private automat(): void {
    ItemDivElements.findFarthestElement();
    ItemDivElements.checkNewLine();

    // console.log(farthestElement);
    if (this.isSameImage(farthestElement)) {
      this.findNextFarthestElement();
      ItemDivElements.clearClickedFields();
      ItemDivElements.updateNewLine();
      this.markFarthestElement();
      this.updateClickedFields();
    } else {
      // console.log("Inny obrazek");
      this.updateClickedFields();
    }
  }
  /**
   *  Wyszukuje najdalszego obiektu względem początku planszy (Punkt: 0,0)
   */
  static findFarthestElement(): void {
    farthestElement = fieldInfo.clickedField[0];
    if (fieldInfo.clickedField.length > 1) {
      for (let i = 1; i < fieldInfo.clickedField.length; i++) {
        let obecnyElement: FieldDivElements = fieldInfo.clickedField[i];
        const weight = 1000;
        const actualWeightedPosition = obecnyElement.x + obecnyElement.y * weight;
        const farthestWeightedPosition = farthestElement.x + farthestElement.y * weight;

        if (actualWeightedPosition > farthestWeightedPosition) {
          farthestElement = obecnyElement;
        }
      }
    }
  }
  /**
   *  Sprawdza czy jest to nowa linia
   */
  private static checkNewLine(): void {
    if (farthestElement.x == divSize.fieldDivWidth - 1) {
      newLine = true;
    }
  }
  /**
   *  Kontroluje czy następna komórka ma to samo zdjęcie jake automat powinien ustawić
   */
  private isSameImage(element: FieldDivElements): boolean {
    return (
      element.div.style.backgroundPositionX === `-${this.x * 50}px` &&
      element.div.style.backgroundPositionY == `-${this.y * 50}px`
    );
  }
  /**
   *  Wyszukuje następny najdalszegy obiekt względem początku planszy (Punkt: 0,0)
   */
  private findNextFarthestElement(): void {
    farthestElement = <FieldDivElements>generator.fieldDivs.find((element) => {
      return (
        element.x == (farthestElement.x + 1) % divSize.fieldDivWidth &&
        element.y == farthestElement.y % divSize.fieldDivHeight
      );
    });
  }
  /**
   *  Czyści graficznie pola
   */
  private static clearClickedFields(): void {
    for (const object of fieldInfo.clickedField) {
      object.div.classList.remove("marked");
      object.clicked = false;
    }
    fieldInfo.clickedField.length = 0;
  }
  /**
   *  Wyszukuje następny najdalszegy obiekt względem początku planszy (Punkt: 0,0)
   */
  private static updateNewLine(): void {
    if (newLine) {
      farthestElement = <FieldDivElements>generator.fieldDivs.find((element): boolean => {
        return (
          element.x == farthestElement.x % divSize.fieldDivWidth &&
          element.y == (farthestElement.y + 1) % divSize.fieldDivHeight
        );
      });
      // console.log("Nowa linia", farthestElement);
      newLine = !newLine;
    }
    if (farthestElement.x == divSize.fieldDivWidth - 1) {
      newLine = true;
    }
  }
  /**
   *  Zaznacza graficznie element, który automat ma zmienić
   */
  private markFarthestElement(): void {
    farthestElement.clicked = true;
    farthestElement.div.classList.add("marked");
    farthestElement.div.style.backgroundImage = 'url("./src/img/sprite2.png")';
    farthestElement.div.style.backgroundPositionX = `-${this.x * 50}px`;
    farthestElement.div.style.backgroundPositionY = `-${this.y * 50}px`;
    fieldInfo.clickedField.push(farthestElement);
  }
}
