<script lang="ts">
import { defineComponent, h, PropType } from 'vue'
import { MenuConstOptions, MenuOptions } from './ContextMenuDefine'
import ContextSubMenuConstructor from './ContextSubMenu.vue';

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
      //provide menuContext for child use
      menuContext: {
        zIndex: this.options.zIndex || MenuConstOptions.defaultStartZindex,
        getMyPosition: () => {
          return {
            x: this.options.x,
            y: this.options.y,
          };
        },
        addOpenedSubMenu: () => {
          //
        },
        closeOtherSubMenu: () => {
          //
        },
      },
    }
  },
  mounted() {
    if (this.show)
      this.installBodyEvents();
  },
  beforeUnmount() {
    this.removeBodyEvents();
  },
  watch: {
    show(v : boolean) {
      if(v) {
        this.installBodyEvents();
      } else {
        this.removeBodyEvents();
      }
    } 
  },
  render() {
    //Hidden
    if (!this.show) return [];

    //Create SubMenu
    return h(ContextSubMenuConstructor, {
      class: 'mx-menu-host',
      items: this.options?.items,
      maxWidth: this.options.maxWidth || MenuConstOptions.defaultMaxWidth,
      minWidth: this.options.minWidth || MenuConstOptions.defaultMinWidth,
    }, {
      default: this.$slots.default,
    });
  },
  methods: {
    installBodyEvents() {
      setTimeout(() => {
        document.addEventListener("click", this.onBodyClick);
        document.addEventListener("wheel", this.onBodyWhell);
        document.addEventListener("contextmenu", this.onBodyClick);
      }, 400);
    },
    removeBodyEvents() {
      document.removeEventListener("contextmenu", this.onBodyClick);
      document.removeEventListener("click", this.onBodyClick);
      document.removeEventListener("wheel", this.onBodyWhell);
    },
    closeMenu() {
      this.$emit("update:show", false);
      this.$emit("close");
    },
    onBodyWhell() {
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
