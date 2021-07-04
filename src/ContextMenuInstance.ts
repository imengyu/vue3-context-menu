import { App, h, render } from "vue";
import { MenuOptions } from "./ContextMenuDefine";
import ContextMenuConstructor from './ContextMenu.vue'
import ContextSubMenuConstructor from './ContextSubMenu.vue'

const genContainer = () => {
  return document.createElement('div')
}
const initInstance = (options: MenuOptions, container: HTMLElement) => {
  const vnode = h(ContextMenuConstructor, { 
    options: options,
    show: true,
    onClose: () => {
      render(null, container)
    }
  })
  render(vnode, container)
  document.body.appendChild(container.firstElementChild as Node)
  return vnode.component
}
const $contextmenu = (options : MenuOptions) => {
  const container = genContainer()
  initInstance(options, container)
}

export default {
  install(app: App<Element>) : void {
    app.config.globalProperties.$contextmenu = $contextmenu;
    app.component('ContextMenu', ContextMenuConstructor);
    app.component('ContextSubMenu', ContextSubMenuConstructor);
  }
}


