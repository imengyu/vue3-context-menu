import { h, ref, render } from "vue";
import type { App, Slot } from "vue";
import type { ContextMenuInstance } from "./ContextMenuDefine";
import type { MenuOptions } from "./ContextMenuDefine";
import { checkOpenedContextMenu, closeContextMenu } from "./ContextMenuMutex";
import { genContainer, transformMenuPosition } from "./ContextMenuUtils";
import ContextMenuConstructor from './ContextMenu.vue'
import ContextSubMenuWrapperConstructor from './ContextSubMenuWrapper.vue'
import ContextSubMenuConstructor from './ContextSubMenu.vue'
import ContextMenuItemConstructor from './ContextMenuItem.vue'
import ContextMenuGroupConstructor from './ContextMenuGroup.vue'
import ContextMenuSeparatorConstructor from './ContextMenuSeparator.vue'

function initInstance(
  options: MenuOptions, 
  container: HTMLElement, 
  isNew: boolean, 
  customSlots?: Record<string, Slot>,
) {
  const show = ref(true);
  const vnode = h(ContextSubMenuWrapperConstructor, { 
    options: options,
    show: show,
    container: container,
    isFullScreenContainer: !isNew,
    onCloseAnimFinished: () => {
      render(null, container);
    },
    onClose: (item: undefined) => {
      options.onClose?.(item);
      show.value = false;
    },
  }, customSlots);
  render(vnode, container);
  return vnode.component;
}

//Show global contextmenu
function $contextmenu(options : MenuOptions, customSlots?: Record<string, Slot>) {
  const container = genContainer(options);
  const component = initInstance(options, container.container, container.isNew, customSlots);
  return (component as unknown as Record<string, unknown>).exposed as ContextMenuInstance;
}

export default {
  /**
   * For Vue install
   * @param app 
   */
  install(app: App<Element>) : void {
    app.config.globalProperties.$contextmenu = $contextmenu;
    app.component('ContextMenu', ContextMenuConstructor);
    app.component('ContextMenuItem', ContextMenuItemConstructor);
    app.component('ContextMenuGroup', ContextMenuGroupConstructor);
    app.component('ContextMenuSperator', ContextMenuSeparatorConstructor);
    app.component('ContextMenuSeparator', ContextMenuSeparatorConstructor);
    app.component('ContextSubMenu', ContextSubMenuConstructor);
  },
  /**
   * Show a ContextMenu in page, same as `this.$contextmenu`
   * 
   * For example:
   * 
   * ```ts
   * onContextMenu(e : MouseEvent) {
   *   //prevent the browser's default menu
   *   e.preventDefault();
   *   //show your menu
   *   ContextMenu.showContextMenu({
   *     x: e.x,
   *     y: e.y,
   *     items: [
   *       { 
   *         label: "A menu item", 
   *         onClick: () => {
   *           alert("You click a menu item");
   *         }
   *       },
   *       { 
   *         label: "A submenu", 
   *         children: [
   *           { label: "Item1" },
   *           { label: "Item2" },
   *           { label: "Item3" },
   *         ]
   *       },
   *     ]
   *   }); 
   * }
   * ```
   * 
   * You can pass customSlots to custom rendering this menu.
   * 
   * For example, custom rendering #itemRender and #separatorRender:
   * ```ts
   *   ContextMenu.showContextMenu({
   *     ...
   *   } as MenuOptions, {
   *     //Use slot in function mode
   *     itemRender: ({ disabled, label, icon, showRightArrow, onClick, onMouseEnter }) => [  h('div', { 
   *       class: 'my-menu-item'+(disabled?' disabled':''),
   *       onMouseenter: onMouseEnter,
   *       onClick: onClick,
   *     }, [
   *       icon ? h('img', { src: icon }) : h('div', { class: 'icon-place-holder' }),
   *       h('span', label),
   *       showRightArrow ? h('span', { class: 'right-arraw' }, '>>') : h('div'),
   *     ]) ],
   *     separatorRender: () => [ h('div', { class: 'my-menu-sperator' }) ]
   *   })
   * ```
   * 
   * @param options The options of ContextMenu
   * @param customSlots You can provide some custom slots to customize the rendering style of the menu. These slots are the same as the slots of component ContextMenu.
   * @returns Menu instance 
   */
  showContextMenu(options : MenuOptions, customSlots?: Record<string, Slot>) : ContextMenuInstance {
    return $contextmenu(options, customSlots);
  },
  /**
   * Get if there is a menu open now.
   */
  isAnyContextMenuOpen() {
    return checkOpenedContextMenu();
  },
  /**
   * Close the currently open menu
   */
  closeContextMenu,
  //Tools
  transformMenuPosition,
}

