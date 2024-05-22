import htmlElements from "./data";
import fieldInfo from "./divInfo";
import generator from "./genrate";
import { CopyField, HandlerMan } from "./interfaces";
/**
 *  Menedżera obsługi zdarzeń.
 */
const handlerManager: HandlerMan = {
  statePosiotion: 0,

  initializeResizableDiv(resizableDiv: HTMLDivElement): void {
    htmlElements.fieldDiv.addEventListener("mousedown", (e: MouseEvent) => {
      this.setupResizableDiv(e, resizableDiv);
    });
    htmlElements.fieldDiv.addEventListener("mousemove", (e: MouseEvent) => {
      this.resizeDiv(e, resizableDiv);
    });
    htmlElements.fieldDiv.addEventListener("mouseup", () => {
      this.hideResizableDiv(resizableDiv);
    });
  },

  hideResizableDiv(resizableDiv: HTMLDivElement): void {
    resizableDiv.style.display = "none";
  },

  setupResizableDiv(e: MouseEvent, resizableDiv: HTMLDivElement): void {
    if (e.button == 0) {
      resizableDiv.style.display = "block";
      resizableDiv.style.position = "absolute";
      resizableDiv.style.width = "0px";
      resizableDiv.style.height = "0px";
      resizableDiv.style.backgroundColor = "rgba(98, 0, 255, 0.2)";
      resizableDiv.style.left = `${e.pageX}px`;
      resizableDiv.style.top = `${e.pageY}px`;
      resizableDiv.dataset.positionX = `${e.pageX}`;
      resizableDiv.dataset.positionY = `${e.pageY}`;
      document.body.append(resizableDiv);
    }
  },

  resizeDiv(e: MouseEvent, resizableDiv: HTMLDivElement): void {
    const ogX: number = parseInt(resizableDiv.dataset.positionX!);
    const ogY: number = parseInt(resizableDiv.dataset.positionY!);
    resizableDiv.style.width = `${e.pageX - ogX}px`;
    resizableDiv.style.height = `${e.pageY - ogY}px`;
    if (e.pageX < ogX) {
      resizableDiv.style.left = `${e.pageX}px`;
      resizableDiv.style.width = `${ogX - e.pageX}px`;
    }
    if (e.pageY < ogY) {
      resizableDiv.style.top = `${e.pageY}px`;
      resizableDiv.style.height = `${ogY - e.pageY}px`;
    }
  },

  handleDelete(): void {
    if (fieldInfo.clickedField.length > 0) {
      for (const object of fieldInfo.clickedField) {
        object.div.style.backgroundImage = "";
        object.backgroundImage = "";
        object.backgroundPositionX = "";
        object.backgroundPositionY = "";
        object.clicked = true;
        object.div.classList.add("marked");
      }
    }
    this.saveHistory();
  },

  handleCopy(): void {
    fieldInfo.copied.length = 0;
    fieldInfo.tempField.length = 0;
    for (const object of fieldInfo.clickedField) {
      const copiedData: CopyField = {
        x: object.x,
        y: object.y,
        backgroundPositionX: object.backgroundPositionX,
        backgroundPositionY: object.backgroundPositionY,
        backgroundImage: object.backgroundImage,
      };
      fieldInfo.copied.push(copiedData);
    }
  },

  handleCut(): void {
    if (fieldInfo.clickedField.length > 0) {
      fieldInfo.copied.length = 0;
      fieldInfo.tempField.length = 0;
      const clearDivs: CopyField[] = [];
      for (const object of fieldInfo.clickedField) {
        const copiedData: CopyField = {
          x: object.x,
          y: object.y,
          backgroundPositionX: object.backgroundPositionX,
          backgroundPositionY: object.backgroundPositionY,
          backgroundImage: object.backgroundImage,
        };
        fieldInfo.copied.push(copiedData);
        object.backgroundPositionX = "";
        object.backgroundPositionY = "";
        object.backgroundImage = "";
        object.div.style.backgroundImage = "";
        object.div.style.backgroundPositionX = "";
        const clearDiv: CopyField = {
          x: object.x,
          y: object.y,
          backgroundPositionX: "",
          backgroundPositionY: "",
          backgroundImage: "",
        };
        clearDivs.push(clearDiv);
      }
    }
    this.saveHistory();
  },

  handlePaste(): void {
    if (fieldInfo.copied.length > 0) {
      fieldInfo.paste = true;
    }
  },

  handleUndo(): void {
    if (fieldInfo.history.length > 0) {
      this.statePosiotion = this.statePosiotion - 1 == 0 ? this.statePosiotion : --this.statePosiotion;
      const lastState = fieldInfo.history[this.statePosiotion];
      // console.log({ Undo: lastState, pos: this.statePosiotion });
      if (lastState) {
        this.restoreState(lastState);
      }
    }
  },

  handleRedo(): void {
    if (fieldInfo.history.length > 0) {
      this.statePosiotion =
        this.statePosiotion + 1 > fieldInfo.history.length - 1 ? this.statePosiotion : ++this.statePosiotion;
      const nextState = fieldInfo.history[this.statePosiotion];
      // console.log({ Redo: nextState, pos: this.statePosiotion });
      // debugger
      if (nextState) {
        this.restoreState(nextState);
      }
    }
  },

  restoreState(state: CopyField[]): void {
    for (const div of document.querySelectorAll(".fields-div")) {
      div.classList.remove("marked");
    }
    for (const object of state) {
      const field = generator.fieldDivs.find((el) => el.x === object.x && el.y === object.y);
      // console.log(field);
      // debugger
      if (field) {
        field.backgroundPositionX = object.backgroundPositionX;
        field.backgroundPositionY = object.backgroundPositionY;
        field.backgroundImage = object.backgroundImage;
        field.div.style.backgroundPositionX = object.backgroundPositionX;
        field.div.style.backgroundPositionY = object.backgroundPositionY;
        field.div.style.backgroundImage = object.backgroundImage;
      }
    }
  },

  saveHistory(): void {
    // console.log(handlerManager.statePosiotion !== fieldInfo.history.length - 1);

    if (handlerManager.statePosiotion !== fieldInfo.history.length - 1) {
      // console.log("W środku historii", handlerManager.statePosiotion);
      fieldInfo.history.splice(handlerManager.statePosiotion + 1);
      // console.log(fieldInfo.history);
    }
    // console.log("Zapisywanie historii");
    const tempHistory: CopyField[] = generator.fieldDivs.map((object) => ({
      x: object.x,
      y: object.y,
      backgroundPositionX: object.backgroundPositionX,
      backgroundPositionY: object.backgroundPositionY,
      backgroundImage: object.backgroundImage,
    }));
    if (fieldInfo.history) {
      fieldInfo.history.push(tempHistory);
      // console.log("[DEBBUGER] HISTORIA:");
      // console.log(fieldInfo.history);
      // debugger
      handlerManager.statePosiotion++;
      // console.log(handlerManager.statePosiotion);
    }
  },

  handleSave(): void {
    const daneJSON: string = JSON.stringify(fieldInfo.history, null, 2);
    const blob: Blob = new Blob([daneJSON], { type: "application/json" });

    const linkDoPobrania: HTMLAnchorElement = document.createElement("a");
    linkDoPobrania.href = URL.createObjectURL(blob);
    linkDoPobrania.download = "save.json";

    linkDoPobrania.click();

    URL.revokeObjectURL(linkDoPobrania.href);
  },

  handleRead(e: Event): void {
    const input = e.target as HTMLInputElement;
    const file = input.files![0];
    // console.log(file);

    const reader = new FileReader();

    reader.readAsText(file);

    reader.onload = function () {
      if (reader.result) {
        const arr = JSON.parse(reader.result as string);
        // console.log("Tablica:", arr);
        fieldInfo.history = arr;
        // console.log(history);
        handlerManager.statePosiotion = fieldInfo.history.length - 1;
        handlerManager.restoreState(fieldInfo.history[handlerManager.statePosiotion]);
      }
    };

    reader.onerror = function (error) {
      console.error("Błąd podczas wczytywania pliku:", error);
    };
  },
};

export default handlerManager;
