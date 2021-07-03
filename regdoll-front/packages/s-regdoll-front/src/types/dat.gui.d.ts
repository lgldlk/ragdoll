/*
 * @Descripttion:
 * @Author: lgldlk
 * @Date: 2021-07-02 21:19:25
 * @Editors: lgldlk
 * @LastEditTime: 2021-07-02 22:03:41
 */


export interface DatGUIParams {
  /**
   * Handles DatGUI's element placement for you.
   * @default true
   */
  autoPlace?: boolean;
  /**
   * If true, starts closed.
   * @default false
   */
  closed?: boolean;
  /**
   * If true, close/open button shows on top of the DatGUI.
   * @default false
   */
  closeOnTop?: boolean;
  /**
   * If true, DatGUI is closed by the "h" keypress.
   * @default false
   */
  hideable?: boolean;
  /**
   * JSON object representing the saved state of this DatGUI.
   */
  load?: any;
  /**
   * The name of this DatGUI.
   */
  name?: string;
  /**
   * The identifier for a set of saved values.
   */
  preset?: string;
  /**
   * The width of DatGUI element.
   */
  width?: number;
}

declare class DatGUI {
  static CLASS_AUTO_PLACE: string
  static CLASS_AUTO_PLACE_CONTAINER: string
  static CLASS_MAIN: string
  static CLASS_CONTROLLER_ROW: string
  static CLASS_TOO_TALL: string
  static CLASS_CLOSED: string
  static CLASS_CLOSE_BUTTON: string
  static CLASS_CLOSE_TOP: string
  static CLASS_CLOSE_BOTTOM: string
  static CLASS_DRAG: string
  static DEFAULT_WIDTH: number
  static TEXT_CLOSED: string
  static TEXT_OPEN: string

  constructor(option?: DatGUIParams);

  __controllers: DatGUIController[];
  __folders: { [folderName: string]: DatGUI };
  domElement: HTMLElement;

  add(target: Object, propName: string, showName: string, min?: number, max?: number, step?: number): DatGUIController;
  add(target: Object, propName: string, showName: string, status: boolean): DatGUIController;
  add(target: Object, propName: string, showName: string, items: string[]): DatGUIController;
  add(target: Object, propName: string, showName: string, items: number[]): DatGUIController;
  add(target: Object, propName: string, showName: string, items: Object): DatGUIController;

  addColor(target: Object, showName: string, propName: string): DatGUIController;

  remove(controller: DatGUIController): void;
  destroy(): void;

  addFolder(propName: string): DatGUI;
  removeFolder(subFolder: DatGUI): void;

  open(): void;
  close(): void;
  hide(): void;
  show(): void;

  remember(target: Object, ...additionalTargets: Object[]): void;
  getRoot(): DatGUI;

  getSaveObject(): Object;
  save(): void;
  saveAs(presetName: string): void;
  revert(gui: DatGUI): void;

  listen(controller: DatGUIController): void;
  updateDisplay(): void;

  // gui properties in dat/gui/DatGUI.js
  readonly parent: DatGUI;
  readonly scrollable: boolean;
  readonly autoPlace: boolean;
  preset: string;
  width: number;
  name: string;
  closed: boolean;
  readonly load: Object;
  useLocalStorage: boolean;
}

export class DatGUIController {
  domElement: HTMLElement;
  object: Object;
  property: string;

  constructor(object: Object, property: string);

  options(option: any): DatGUIController;
  name(name: string): DatGUIController;

  listen(): DatGUIController;
  remove(): DatGUIController;

  onChange(fnc: (value?: any) => void): DatGUIController;
  onFinishChange(fnc: (value?: any) => void): DatGUIController;

  setValue(value: any): DatGUIController;
  getValue(): any;

  updateDisplay(): DatGUIController;
  isModified(): boolean;

  // NumberController
  min(n: number): DatGUIController;
  max(n: number): DatGUIController;
  step(n: number): DatGUIController;

  // FunctionController
  fire(): DatGUIController;
}
