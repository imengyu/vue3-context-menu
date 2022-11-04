<script lang="ts">
import { defineComponent, h, PropType, renderSlot, VNode } from 'vue'
import { MenuConstOptions, MenuOptions } from './ContextMenuDefine'
import { addOpenedContextMenu, removeOpenedContextMenu } from './ContextMenuMutex';
import ContextSubMenuConstructor from './ContextSubMenu.vue';

export type GlobalHasSlot = (name: string) => boolean;
export type GlobalRenderSlot = (name: string, params: Record<string, unknown>) => VNode;

/**
 * Context menu component
 */
export default defineComponent({
  name: 'ContextMenu',
  emits: [ 'update:show', 'close' ],
  props: {
    /**
     * Menu options
     */
    options: {
      type: Object as PropType<MenuOptions>,
      default: null
    },
    /**
     * Show menu?
     */
    show: {
      type: Boolean,
      default: false
    }
  },
  provide() {
    return {
      globalOptions: this.options,
      globalCloseMenu: this.closeMenu,
      globalTheme: this.options?.theme || 'light',
      //check slot exists
      globalHasSlot: (name: string) => {
        return this.$slots[name] !== undefined;
      },
      //render slot
      globalRenderSlot: (name: string, params: Record<string, unknown>) => {
        return renderSlot(this.$slots, name, { ...params })
      },
      //provide menuContext for child use
      menuContext: {
        zIndex: this.options.zIndex || MenuConstOptions.defaultZindex,
        getMyPosition: () => {
          return {
            x: this.options.x,
            y: this.options.y,
          };
        },
        addOpenedSubMenu: () => {/* Do nothing */},
        closeOtherSubMenu: () => {/* Do nothing */},
      },
    }
  },
  mounted() {
    if (this.show) {
      this.openMenu();
    }
  },
  beforeUnmount() {
    this.removeBodyEvents();
  },
  watch: {
    show(v : boolean) {
      if(v) {
        this.openMenu();
      } else {
        this.removeBodyEvents();
      }
    } 
  },
  render() {
    //Hidden
    if (!this.show) return [];

    //Create SubMenu
    return h('div', {
      class: 'mx-menu-ghost-host',
      style: {
        zIndex: this.options.zIndex || MenuConstOptions.defaultZindex,
      },
    }, [
      h(ContextSubMenuConstructor, {
        class: 'mx-menu-host',
        items: this.options?.items,
        maxWidth: this.options.maxWidth || MenuConstOptions.defaultMaxWidth,
        minWidth: this.options.minWidth || MenuConstOptions.defaultMinWidth,
      }, {
        default: this.$slots.default,
      })
    ]);
  },
  methods: {
    openMenu() {
      this.installBodyEvents();
      addOpenedContextMenu(this);
    },
    closeMenu() {
      this.$emit("update:show", false);
      this.$emit("close");
      removeOpenedContextMenu(this);
    },
    installBodyEvents() {
      setTimeout(() => {
        document.addEventListener("click", this.onBodyClick, true);
        document.addEventListener("contextmenu", this.onBodyClick, true);
        document.addEventListener("wheel", this.onBodyWhell, true);
      }, 400);
    },
    removeBodyEvents() {
      document.removeEventListener("contextmenu", this.onBodyClick, true);
      document.removeEventListener("click", this.onBodyClick, true);
      document.removeEventListener("wheel", this.onBodyWhell, true);
    },
    onBodyWhell() {
      //close when mouse scroll
      if (this.options.closeWhenScroll !== false)
        this.closeMenu();
    },
    onBodyClick(e: MouseEvent) {
      this.checkTargetAndClose(e.target as HTMLElement);
    },
    checkTargetAndClose(target: HTMLElement) {
      //Loop target , Check whether the currently clicked element belongs to the current menu.
      // If yes, it will not be closed
      while (target) {
        if (target.classList && target.classList.contains('mx-menu-host'))
          return;
        target = target.parentNode as HTMLElement;
      }
      
      //Close menu
      this.removeBodyEvents();
      this.closeMenu();
    },
    onChildrenClose(byUserClick : boolean) {
      if(byUserClick) {
        this.$emit('close');
        this.$emit('update:show', false);
      }
    },
  }
})
</script>

<style>
.mx-menu-ghost-host {
  position: fixed;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  overflow: hidden;
  pointer-events: none;
}
</style>
