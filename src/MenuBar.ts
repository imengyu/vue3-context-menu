import { MenuOptions } from "./ContextMenuDefine";

export interface MenuBarOptions extends Omit<MenuOptions, 'x'|'y'|'getContainer'> {
  /**
   * Set whether the current menu bar is collapsed, default is false.
   */
  mini?: boolean;
}