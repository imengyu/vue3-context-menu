<script lang="ts">
import { defineComponent, h, onBeforeUnmount, onMounted, PropType, provide, renderSlot, toRefs, VNode, watch } from 'vue'
import { MenuConstOptions, MenuOptions } from './ContextMenuDefine'
import { addOpenedContextMenu, removeOpenedContextMenu } from './ContextMenuMutex';
import { getLeft, getTop } from './ContextMenuUtils';
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
    },
    /**
     * Current container, For calculation only
     */
    container: {
      type: Object,
      default: null
    },
  },
  setup(props, ctx) {
    const {
      options,
      show,
      container,
    } = toRefs(props);

    onMounted(() => {
      if (show)
        openMenu();
    })
    onBeforeUnmount(() => {
      removeBodyEvents();
    });

    watch(show, (v: boolean) => {
      if(v) {
        openMenu();
      } else {
        removeBodyEvents();
      }
    });

    const instance = { closeMenu };
    
    function openMenu() {
      installBodyEvents();
      addOpenedContextMenu(instance);
    }
    function closeMenu() {
      ctx.emit("update:show", false);
      ctx.emit("close");
      removeOpenedContextMenu(instance);
    }
    function installBodyEvents() {
      setTimeout(() => {
        document.addEventListener("click", onBodyClick, true);
        document.addEventListener("contextmenu", onBodyClick, true);
        document.addEventListener("wheel", onBodyWhell, true);
      }, 400);
    }
    function removeBodyEvents() {
      document.removeEventListener("contextmenu", onBodyClick, true);
      document.removeEventListener("click", onBodyClick, true);
      document.removeEventListener("wheel", onBodyWhell, true);
    }
    function onBodyWhell() {
      //close when mouse scroll
      if (options.value.closeWhenScroll !== false)
        closeMenu();
    }
    function onBodyClick(e: MouseEvent) {
      checkTargetAndClose(e.target as HTMLElement);
    }
    function checkTargetAndClose(target: HTMLElement) {
      //Loop target , Check whether the currently clicked element belongs to the current menu.
      // If yes, it will not be closed
      while (target) {
        if (target.classList && target.classList.contains('mx-menu-host'))
          return;
        target = target.parentNode as HTMLElement;
      }
      
      //Close menu
      removeBodyEvents();
      closeMenu();
    }
    
    provide('globalOptions', options.value);
    provide('globalCloseMenu', closeMenu);
    provide('globalTheme', options.value?.theme || 'light');
    provide('globalIconFontClass', options.value?.iconFontClass || 'iconfont');
    //check slot exists
    provide('globalHasSlot', (name: string) => {
      return ctx.slots[name] !== undefined;
    });
    //render slot
    provide('globalRenderSlot', (name: string, params: Record<string, unknown>) => {
      return renderSlot(ctx.slots, name, { ...params })
    });
    //provide menuContext for child use
    provide('menuContext', {
      zIndex: options.value.zIndex || MenuConstOptions.defaultZindex,
      container: container.value,
      adjustPadding: options.value.adjustPadding || MenuConstOptions.defaultAdjustPadding,
      getParentAbsY: () => options.value.y,
      getMyPosition: () => {
        return {
          x: options.value.x,
          y: options.value.y,
        };
      },
      addOpenedSubMenu: () => {/* Do nothing */},
      closeOtherSubMenu: () => {/* Do nothing */},
    });

    return () => {
      //Hidden
      if (!show.value)
        return [];

      //Create SubMenu
      return [
        h('div', {
          class: 'mx-menu-ghost-host', 
        }, [
            h(ContextSubMenuConstructor, {
            class: 'mx-menu-host',
            items: options.value?.items,
            maxWidth: options.value.maxWidth || MenuConstOptions.defaultMaxWidth,
            minWidth: options.value.minWidth || MenuConstOptions.defaultMinWidth,
          }, {
            default: ctx.slots.default,
          })
        ])
      ];
    }
  },
})
</script>

<style>
.mx-menu-ghost-host {
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  top: 0;
  overflow: hidden;
  pointer-events: none;
}
</style>
