<script lang="ts">
import { defineComponent, h, inject, ref, toRefs } from 'vue'
import type { PropType, Ref, SVGAttributes } from 'vue'
import ContextSubMenuConstructor from './ContextSubMenu.vue';
import ContextMenuItemConstructor from './ContextMenuItem.vue';
import type { MenuOptions } from './ContextMenuDefine';
import { removeObjectKey } from './ContextMenuUtils';

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
     * By default, the submenu will automatically adjust its position to prevent it overflow the container.
     * 
     * If you allow menu overflow containers, you can set this to false.
     * 
     * Default is inherit from `MenuOptions.adjustPosition`  .
     */
    adjustSubMenuPosition: {
      type: Boolean,
      default: undefined
    },
    /**
     * Max height of submenu
     */
    maxHeight: {
      type: [String, Number],
      default: 0,
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
  setup(props, ctx) {
    
    const options = inject('globalOptions') as Ref<MenuOptions>;
    const { adjustSubMenuPosition, maxWidth, minWidth, maxHeight } = toRefs(props);
    const adjustSubMenuPositionValue = typeof adjustSubMenuPosition.value !== 'undefined' ? adjustSubMenuPosition.value : options.value.adjustPosition;
    
    const subMenuRef = ref();
    const itemRef = ref();

    ctx.expose({
      getSubMenuRef: () => subMenuRef.value,
      getMenuItemRef: () => itemRef.value,
    })
    //Create Item
    return () => h(ContextMenuItemConstructor, {
      ...props,
      ref: itemRef,
      showRightArrow: true,
      maxWidth: undefined,
      minWidth: undefined,
      maxHeight: undefined,
      adjustSubMenuPosition: undefined,
      hasChildren: typeof ctx.slots.default !== undefined,
    }, ctx.slots.default ? {
      //Create SubMenu
      submenu: (data: any) => h(ContextSubMenuConstructor, {
        ref: subMenuRef,
        show: data.show,
        maxWidth: maxWidth.value,
        minWidth: minWidth.value,
        maxHeight: maxHeight.value,
        adjustPosition: adjustSubMenuPositionValue,
        parentMenuItemContext: data.context,
      }, {
        default: ctx.slots.default,
      }),
      //Add other slots
      ...removeObjectKey(ctx.slots, 'default'), 
    } : ctx.slots);
  },
})
</script>