import FieldDivElements from "./fieldDivs";
import ItemDivElements from "./itemDivs";

export interface HtmlElementContainer {
  /**
   *  Div pola rozstawnia.
   */
  fieldDiv: HTMLDivElement;
  /**
   *  Div pola z przedmiotami.
   */
  itemsDiv: HTMLDivElement;
  /**
   *  Input typu checkbox, załącza automat.
   */
  automat: HTMLInputElement;
  /**
   *  Div menu kontekstowe.
   */
  contextMenu: HTMLDivElement;
}

/**
 *  Przetrzymuje informacje operacyjne.
 */
export interface FieldInfo {
  /**
   *  Przetrzymuje kliknięte obiekty klasy FieldDivElements.
   */
  clickedField: FieldDivElements[];
  /**
   *  Przetrzymuje obiekt klasy ItemDivElements, który jest odpowiada aktualnie klikniętemu przedmiotowi bądź przyjmuje wartośc null jeżeli nic nie jest kliknięte.
   */
  clickedItem: null | ItemDivElements;
  /**
   *  Przetrzymuje obiekty klasy CopyField, które odpowidają skopiowanym elementom
   */
  copied: CopyField[];
  /**
   *  Przetrzymuje historię aplikacji
   */
  history: [CopyField[]];
  /**
   *  Przetrzymuje informajcę czy aktualnie jest przeprowadzana operacja wklejania
   */
  paste: boolean;
  /**
   *  Przetrzymuje informajcę o polach na na których można postawić skopiowaną treść
   */
  tempField: FieldDivElements[];
}
/**
 *  Interfejs przetrzymuje pozycję w układzie Kartezjańskim
 */
export interface Position {
  /**
   *  Współrzędna X
   */
  x: number;
  /**
   *  Współrzędna Y
   */
  y: number;
}
/**
 *  Interfejs przetrzymuje wymiary
 */
export interface Size {
  /**
   *  Wysokość
   */
  height: number;
  /**
   *  Szerokość
   */
  width: number;
}
/**
 *  Przetrzymuje uproszczonego FieldDivElements, dla ułatwienia operacji na nich np: zapisu itp.
 */
export interface CopyField extends Position {
  /**
   *  Pozycja tła X
   */
  backgroundPositionX: string;
  /**
   *  Pozycja tła Y
   */
  backgroundPositionY: string;
  /**
   *  Obrazek tła
   */
  backgroundImage: string;
}
/**
 *  Wymiary divów kluczowych dla projektu
 */
export interface DivSize {
  /**
   * Wysokość pola do rozstawiania.
   */
  fieldDivHeight: number;
  /**
   * Szerokość pola do rozstawiania.
   */
  fieldDivWidth: number;
  /**
   * Szerokość pola z przedmiotamie.
   */
  itemsDivWidth: number;
  /**
   * Wysokość pola z przedmiotamie.
   */
  itemsDivHeight: number;
}

/**
 *  Interjes menedżera obsługi zdarzeń.
 */
export interface HandlerMan {
  /**
   * Pozycja aktualnego stanu w historii.
   */
  statePosiotion: number;
  isFirst: boolean;
  /**
   * Ukrywa element zmieniający rozmiar.
   * @param resizableDiv Div do ukrycia.
   */
  hideResizableDiv(resizableDiv: HTMLDivElement): void;
  /**
   * Inicjalizuje obsługę diva.
   * @param resizableDiv Div, który będzie poddawany zmianom.
   */
  initializeResizableDiv(resizableDiv: HTMLDivElement): void;
  /**
   * Konfiguruje element zmieniający rozmiar.
   * @param e Obiekt zdarzenia myszy.
   * @param resizableDiv Div do ustawienia.
   */
  setupResizableDiv(e: MouseEvent, resizableDiv: HTMLDivElement): void;
  /**
   * Zmienia rozmiar elementu.
   * @param e Obiekt zdarzenia myszy.
   * @param resizableDiv Div poddawany zmianie rozmiaru.
   */
  resizeDiv(e: MouseEvent, resizableDiv: HTMLDivElement): void;
  /**
   * Obsługuje zdarzenie usuwania.
   */
  handleDelete(): void;
  /**
   * Obsługuje zdarzenie kopiowania.
   */
  handleCopy(): void;
  /**
   * Obsługuje zdarzenie wycięcia.
   */
  handleCut(): void;
  /**
   * Obsługuje zdarzenie wklejania.
   */
  handlePaste(): void;
  /**
   * Obsługuje zdarzenie cofania.
   */
  handleUndo(): void;
  /**
   * Obsługuje zdarzenie przywrócenia.
   */
  handleRedo(): void;
  /**
   * Przywraca aplikacje do stanu przekazanego.
   * @param state Stan aplikacji.
   */
  restoreState(state: CopyField[]): void;
  /**
   * Zapisuje historię stanów aplikacji.
   */
  saveHistory(): void;
  /**
   * Obsługuje zdarzenie stanu aplikacji do  pliku: save.json.
   */
  handleSave(): void;
  /**
   * Obsługuje odczytywanie zapisanej konfiguracji aplikacji.
   * @param e Obiekt zdarzenia zmiany wartości inputa .
   */
  handleRead(e: Event): void;
}

/**
 * Interfejs generatora.
 */
export interface Generator {
  /**
   *  Przetrzumuje ItemDivElements.
   */
  itemDivs: ItemDivElements[];
  /**
   *  Przetrzumuje IFieldDivElements.
   */
  fieldDivs: FieldDivElements[];
  /**
   *  Generuje Przedmioty.
   * @param x  Współczędna X
   * @param y  Współczędna Y
   * @param div  Div rodzica
   */
  genItems(x: number, y: number, div: HTMLDivElement): void;
}
