<template>
  <div
    :class="'mx-context-menu-item' + (disabled ? ' disabled' : '')"
    @click="onClick"
    @mouseenter="onMouseEnter"
  >
    <VNodeRender v-if="customRender" :vnode="customRender" />
    <slot v-else>
      <slot name="icon">
        <i v-if="typeof icon === 'string'" :class="icon + ' icon '+ iconFontClass"></i>
        <VNodeRender v-else :vnode="icon" />
      </slot>
      <slot name="label">
        <span v-if="typeof label === 'string'">{{ label }}</span>
        <VNodeRender v-else :vnode="label" />
      </slot>
      <slot v-if="showRightArrow" name="rightArrow">
        <span class="mx-right-arrow" />
      </slot>
    </slot>
    <slot v-if="showSubMenu" name="submenu"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, PropType, ref, toRefs } from 'vue'
import { SubMenuParentContext } from './ContextSubMenu.vue'
import { VNodeRender } from './ContextMenuUtils'

/**
 * Menu Item
 */
export default defineComponent({
  name: 'ContextMenuItem',
  components: {
    VNodeRender,
  },
  props: {
    /**
     * Is this menu disabled? 
     */
    disabled: {
      type: Boolean,
      default: false
    },
    customRender: {
      type: Function,
      default: null
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
      type: [String, Object],
      default: ''
    },
    /**
     * Menu icon (for icon class)
     */
    icon: {
      type: [String, Object],
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
     * When there are subitems in this item, is it allowed to trigger its own click event? Default is false
     */
    clickableWhenHasChildren: {
      type: Boolean,
      default: false
    },
  },
  emits: [
    'click'
  ],
  setup(props, context) {

    const { clickHandler, clickClose, clickableWhenHasChildren } = toRefs(props);
    const showSubMenu = ref(false);

    const menuContext = inject('menuContext') as SubMenuParentContext;
    const globalCloseMenu = inject('globalCloseMenu') as () => void;

    function onClick(e: MouseEvent) {
      if ((e.target as HTMLElement).classList.contains('mx-context-no-clickable'))
        return;
      if (context.slots.submenu) {//Has submenu
        if (clickableWhenHasChildren && typeof clickHandler.value === 'function') 
          clickHandler.value();
      } else {
        //Call hander from options
        if (typeof clickHandler.value === 'function') 
          clickHandler.value();
        if (clickClose.value) {
          //emit close
          globalCloseMenu();
        }
      }
      context.emit('click');
    }
    function onMouseEnter() {
      if (!menuContext.checkCloseOtherSubMenuTimeOut())
        menuContext.closeOtherSubMenu();
      menuContext.addOpenedSubMenu(() => {
        showSubMenu.value = false;
      });
      showSubMenu.value = true;
    }

    return {
      showSubMenu,
      onMouseEnter,
      onClick,
    }
  },
})
</script>

<style>
</style>