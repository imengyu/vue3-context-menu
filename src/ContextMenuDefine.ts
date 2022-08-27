import { VNode } from "vue";

export const MenuConstOptions = {
  defaultMinWidth: 100,
  defaultMaxWidth: 600,
  defaultStartZindex: 1,
}

export interface MenuOptions {
  items	:	MenuItem[],
  x: number,
  y: number,
  xOffset	?: number,
  yOffset ?: number,
  zIndex ?: number,
  customClass	?:	string,
  theme	?:	'dark'|'light',
  iconFontClass ?:	string,
  maxWidth ?: number,
  minWidth ?: number,
}
export interface MenuItem {
  label ?: string|VNode|((label: string) => VNode),
  icon ?: string|VNode|((icon: string) => VNode),
  disabled ?: boolean,
  adjustSubMenuPosition ?: boolean,
  clickableWhenHasChildren ?: boolean,
  clickClose ?: boolean,
  divided ?: boolean,
  customClass ?: string,
  maxWidth ?: number,
  minWidth ?: number,
  onClick ?: () => void,
  customRender ?: VNode|((item: MenuItem) => VNode),
  children ?: MenuItem[],
}

export interface ContextMenuPositionData {
  x: number;
  y: number;
}