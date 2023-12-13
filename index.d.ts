import { ContextMenuInstance, MenuOptions } from './lib/ContextMenuDefine';
import ContextMenuGlobal from './lib/ContextMenuInstance';

export default ContextMenuGlobal;

export * from './lib/ContextMenuDefine';

export * from './lib';

declare module 'vue3-context-menu' {
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
