import { App, h, render, Slot } from "vue";
import { ContextMenuInstance, MenuOptions } from "./ContextMenuDefine";
import { closeContextMenu } from "./ContextMenuMutex";
import { genContainer, transformMenuPosition } from "./ContextMenuUtils";
import ContextMenuConstructor from './ContextMenu.vue'
import ContextSubMenuWrapperConstructor from './ContextSubMenuWrapper.vue'
import ContextSubMenuConstructor from './ContextSubMenu.vue'
import ContextMenuItemConstructor from './ContextMenuItem.vue'
import ContextMenuGroupConstructor from './ContextMenuGroup.vue'
import ContextMenuSeparatorConstructor from './ContextMenuSeparator.vue'

function initInstance(options: MenuOptions, container: HTMLElement, isNew: boolean, customSlots?: Record<string, Slot>) {
  const vnode = h(ContextSubMenuWrapperConstructor, { 
    options: options,
    show: true,
    container: container,
    onClose: () => render(null, container),
  }, customSlots);
  render(vnode, container);
  return vnode.component;
}

//Show global contextmenu
function $contextmenu(options : MenuOptions, customSlots?: Record<string, Slot>) {
  const container = genContainer(options);
  const component = initInstance(options, container.container, container.isNew, customSlots);
  return component as unknown as ContextMenuInstance;
}

export default {
  //Vue install
  install(app: App<Element>) : void {
    app.config.globalProperties.$contextmenu = $contextmenu;
    app.component('ContextMenu', ContextMenuConstructor);
    app.component('ContextMenuItem', ContextMenuItemConstructor);
    app.component('ContextMenuGroup', ContextMenuGroupConstructor);
    app.component('ContextMenuSperator', ContextMenuSeparatorConstructor);
    app.component('ContextMenuSeparator', ContextMenuSeparatorConstructor);
    app.component('ContextSubMenu', ContextSubMenuConstructor);
  },
  //global function for show context menu
  //Same as this.$contextmenu
  showContextMenu(options : MenuOptions, customSlots?: Record<string, Slot>) : ContextMenuInstance {
    return $contextmenu(options, customSlots);
  },
  //Close the currently open menu
  closeContextMenu,
  //Tools
  transformMenuPosition,
}

