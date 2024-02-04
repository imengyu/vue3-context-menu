import type { MenuOptions, MenuPopDirection } from "./ContextMenuDefine";

export interface MenuBarOptions extends Omit<MenuOptions, 'x'|'y'|'getContainer'> {
  /**
   * Set whether the current menu bar is collapsed, default is false.
   */
  mini?: boolean;
  /**
   * Set the mian menu pop-up direction relative to coordinates. (With collapsed state)
   * 
   * Default is `'bl'`
   * 
   * @default 'bl'
   */
  barPopDirection ?: MenuPopDirection,
}