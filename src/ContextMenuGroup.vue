<script lang="ts">
import { defineComponent, h, PropType, SVGAttributes } from 'vue'
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
     * Is this menu hidden? 
     */
    hidden: {
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
    /**
     * Custom icon library font class name.
     * 
     * Only for css font icon, If you use the svg icon, you do not need to use this.
     */
    iconFontClass: {
      type: String,
      default: 'iconfont'
    },
    /**
     * Is this menu item checked?
     * 
     * The check mark are displayed on the left side of the icon, so it is not recommended to display the icon at the same time.
     */
     checked: {
      type: Boolean,
      default: false
    },
    /**
     * Shortcut key text display on the right.
     * 
     * The shortcut keys here are only for display. You need to handle the key events by yourself.
     */
    shortcut: {
      type: String,
      default: ''
    },
    /**
     * Display icons use svg symbol (`<use xlink:href="#icon-symbol-name">`) ， only valid when icon attribute is empty.
     */
    svgIcon: {
      type: String,
      default: ''
    },
    /**
     * The user-defined attribute of the svg tag, which is valid when using `svgIcon`.
     */
    svgProps: {
      type: Object as PropType<SVGAttributes>,
      default: null
    },
    /**
     * Should a fixed-width icon area be reserved for menu items without icon. (this item)
     * 
     * Default is true .
     * 
     * The width of icon area can be override with css var `--mx-menu-placeholder-width`.
     */
    preserveIconWidth: {
      type: Boolean,
      default: true,
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