import { App, Slot, VNode } from "vue";

declare module 'vue3-context-menu' {
}

/**
 * ContextMenu Component ref interface, 
 * You can use `(this.$refs.myMenu as ContextMenuInstance)` or `const mymenu = ref<ContextMenuInstance>()`
 */
export interface ContextMenuInstance {
  /**
   * Close this menu
   */
  closeMenu(): void;
}

export declare interface MenuOptions {
  /**
   * The items for this menu.
   */
  items	:	MenuItem[],
  /**
   * Menu display x position.
   */
  x: number,
  /**
   * Menu display y position.
   */
  y: number,
  /**
  * X-coordinate offset of submenu and parent menu.
  */
  xOffset	?: number,
  /**
  * Y-coordinate offset of submenu and parent menu.
  */
  yOffset ?: number,
  /**
   * The z-index of this menu.
   */
  zIndex ?: number,
  /**
   * Custom menu class.
   */
  customClass	?:	string,
  /**
   * Custom icon library font class name.
   */
  iconFontClass ?:	string,
  /**
   * Maximum width of main menu (in pixels)
   */
  maxWidth ?: number,
  /**
   * Minimum width of main menu (pixels)
   */
  minWidth ?: number,
  /**
   * Theme of the menu. Default is light.
   */
  theme ?: 'light'|'dark';
  /**
   * Close when user scroll mouse ? Default is true.
   */
  closeWhenScroll ?: boolean;
}
export declare interface MenuItem {
  /**
   * The label of menu.
   */
  label ?: string|VNode|((label: string) => VNode),
  /**
   * The icon for menu item.
   */
  icon ?: string|VNode|((icon: string) => VNode),
  /**
   * Disable menu item?
   */
  disabled ?: boolean,
  /**
   * Specifies should submenu adjust it position 
   * when the menu exceeds the screen. The default is true
   */
  adjustSubMenuPosition ?: boolean,
  /**
   * When there are subitems in this item, is it allowed to trigger its own click event? Default is false
   */
  clickableWhenHasChildren ?: boolean,
  /**
   * Should close menu when Click this menu item ?
   */
  clickClose ?: boolean,
  /**
   * Is this menu item separated from the menu item below?
   */
  divided ?: boolean,
  /**
   * Custom submenu class
   */
  customClass ?: string,
  /**
   * Submenu maximum width (in pixels).
   */
  maxWidth ?: number,
  /**
   * Submenu minimum width (in pixels).
   */
  minWidth ?: number,
  /**
   * Menu item click event handler.
   */
  onClick ?: () => void,
  /**
   * A custom render callback that allows you to customize the rendering of the current item.
   */
  customRender ?: VNode|((item: MenuItemRenderData) => VNode),
  /**
   * Submenu items.
   */
  children ?: MenuItem[],
}

export declare interface MenuItemRenderData extends Omit<MenuItem, 'children'|'customRender'|'onClick'> {
  /**
   * Global theme
   */
  theme: 'light'|'dark',
  /**
   * Click event callback of custom element, which is used for menu internal event
   */
  onClick: () => void,
  /**
   * MouseEnter event callback of custom element, which is used for menu internal event
   */
  onMouseEnter: () => void,
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * Show a ContextMenu .
     * @param options The options of this ContextMenu
     * @param customSlots You can provide some custom slots to customize the rendering style of the menu. These slots are the same as the slots of component ContextMenu.
     * @returns Menu instance 
     */
    $contextmenu: (options : MenuOptions, customSlots?: Record<string, Slot>) => ContextMenuInstance;
  }
}

declare const Plugin: {
  install: (app: App<Element>) => void
  /**
   * Show a ContextMenu in page, same as `this.$contextmenu`
   * @param options The options of ContextMenu
   * @param customSlots You can provide some custom slots to customize the rendering style of the menu. These slots are the same as the slots of component ContextMenu.
   * @returns Menu instance 
   */
  showContextMenu(options : MenuOptions, customSlots?: Record<string, Slot>) : ContextMenuInstance;
  /**
   * Close the currently open menu
   */
  closeContextMenu() : void;
};

export default Plugin;
