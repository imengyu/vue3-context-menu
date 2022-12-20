import { SVGAttributes, VNode } from "vue";

export const MenuConstOptions = {
  defaultMinWidth: 100,
  defaultMaxWidth: 600,
  defaultZindex: 100,
  defaultAdjustPadding: 10,
}
export interface ContextMenuInstance {
  closeMenu(): void;
}
export interface MenuOptions {
  items	?:	MenuItem[];
  x: number;
  y: number;
  xOffset	?: number;
  yOffset ?: number;
  zIndex ?: number;
  customClass	?:	string;
  theme	?:	'dark'|'light';
  iconFontClass ?:	string;
  maxWidth ?: number;
  minWidth ?: number;
  closeWhenScroll ?: boolean;
  adjustPadding?: number,
  getContainer ?: HTMLElement | (() => HTMLElement);
}
export interface MenuItem {
  label ?: string|VNode|((label: string) => VNode),
  icon ?: string|VNode|((icon: string) => VNode),
  iconFontClass ?: string,
  svgIcon ?: string,
  svgProps ?: SVGAttributes,
  disabled ?: boolean,
  hidden ?: boolean,
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