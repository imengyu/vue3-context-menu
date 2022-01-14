import { App } from "vue";

declare module 'vue3-context-menu' {
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
}
export declare interface MenuItem {
  /**
   * The label of menu.
   */
  label ?: string,
  /**
   * The icon for menu item.
   */
  icon ?: string,
  /**
   * Disable menu item?
   */
  disabled ?: boolean,
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
   * Submenu items.
   */
  children ?: MenuItem[],
}

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    /**
     * Show a ContextMenu .
     * @param options The options of this ContextMenu
     */
    $contextmenu: (options : MenuOptions) => void;
  }
}

declare const Plugin: {
  install: (app: App<Element>) => void
  /**
   * Show a ContextMenu in page, same as `this.$contextmenu`
   * @param options The options of ContextMenu
   */
  showContextMenu(options : MenuOptions) : void;
};

export default Plugin;
