<script lang="ts">
import { defineComponent, h, PropType } from 'vue'
import ContextSubMenuConstructor from './ContextSubMenu.vue';
import ContextMenuItemConstructor from './ContextMenuItem.vue';

export default defineComponent({
  name: 'ContextMenuGroup',
  props: {
     /**
     * Is this menu disabled? 
     */
    disabled: {
      type: Boolean,
      default: false
    },
    /**
     * Is this menu disabled? 
     */
    clickHandler: {
      type: Function as PropType<() => void>,
      default: null
    },
    /**
     * Menu label
     */
    label: {
      type: String,
      default: ''
    },
    /**
     * Menu icon (for icon class)
     */
    icon: {
      type: String,
      default: ''
    },
    iconFontClass: {
      type: String,
      default: 'iconfont'
    },
    /**
     * Show right arrow on this menu?
     */
    showRightArrow: {
      type: Boolean,
      default: false
    },
    /**
     * Should close menu when Click this menu item ?
     */
    clickClose: {
      type: Boolean,
      default: true
    },
    /**
     * Specifies whether to adjust the position of the current submenu 
     * after the menu exceeds the screen. The default is true
     */
    adjustSubMenuPosition: {
      type: Boolean,
      default: true
    },
    /**
     * Max width of submenu
     */
    maxWidth: {
      type: [String, Number],
      default: 0,
    },
    /**
     * Min width of submenu
     */
    minWidth: {
      type: [String, Number],
      default: 0,
    },
  },
  render() {
    //Create Item
    return h(ContextMenuItemConstructor, {
      ...this.$props,
      showRightArrow: true,
      maxWidth: undefined,
      minWidth: undefined,
      adjustSubMenuPosition: undefined,
      hasChildren: typeof this.$slots.default !== undefined,
    }, this.$slots.default ? {
      //Create SubMenu
      submenu: () => h(ContextSubMenuConstructor, {
        maxWidth: this.maxWidth,
        minWidth: this.minWidth,
        adjustPosition: this.adjustSubMenuPosition,
      }, {
        default: this.$slots.default,
      })
    } : undefined);
  },
})
</script>