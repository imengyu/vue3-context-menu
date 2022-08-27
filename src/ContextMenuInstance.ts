import { App, h, render, Slot } from "vue";
import { MenuOptions } from "./ContextMenuDefine";
import ContextMenuConstructor from './ContextMenu.vue'
import ContextSubMenuConstructor from './ContextSubMenu.vue'
import ContextMenuItemConstructor from './ContextMenuItem.vue'
import ContextMenuGroupConstructor from './ContextMenuGroup.vue'
import ContextMenuSperatorConstructor from './ContextMenuSperator.vue'

const genContainer = () => {
  return document.createElement('div')
}
const initInstance = (options: MenuOptions, container: HTMLElement, customSlots?: Record<string, Slot>) => {
  const vnode = h(ContextMenuConstructor, { 
    options: options,
    show: true,
    onClose: () => {
      render(null, container)
    }
  }, customSlots)
  render(vnode, container)
  document.body.appendChild(container.firstElementChild as Node)
  return vnode.component
}
const $contextmenu = (options : MenuOptions, customSlots?: Record<string, Slot>) => {
  const container = genContainer()
  initInstance(options, container, customSlots)
}

export default {
  //Vue install
  install(app: App<Element>) : void {
    app.config.globalProperties.$contextmenu = $contextmenu;
    app.component('ContextMenu', ContextMenuConstructor);
    app.component('ContextMenuItem', ContextMenuItemConstructor);
    app.component('ContextMenuGroup', ContextMenuGroupConstructor);
    app.component('ContextMenuSperator', ContextMenuSperatorConstructor);
    app.component('ContextSubMenu', ContextSubMenuConstructor);
  },
  //global function for show context menu
  //Same as this.$contextmenu
  showContextMenu(options : MenuOptions, customSlots?: Record<string, Slot>) : void {
    $contextmenu(options, customSlots);
  },
}

