<template>
  <div 
    v-if="!hidden"
    class="mx-context-menu-item-wrapper"
    ref="menuItemRef"
    data-type="ContextMenuItem"

  >
    <!--Custom render-->
    <VNodeRender v-if="globalHasSlot('itemRender')" :vnode="() => globalRenderSlot('itemRender', getItemDataForChildren())" />
    <VNodeRender v-else-if="customRender" :vnode="customRender" :data="getItemDataForChildren()" />
    <!--Default item-->
    <div 
      v-else
      :class="[
        'mx-context-menu-item',
        (disabled ? 'disabled' : ''),
        (keyBoardFocusMenu ? 'keyboard-focus' : ''),
        (customClass ? (' ' + customClass) : ''),
        (showSubMenu ? 'open' : ''),
      ]"
      @click="onClick"
      @mouseenter="onMouseEnter"
    >
      <slot>
        <div class="mx-item-row">
          <div :class="[
            'mx-icon-placeholder',
            preserveIconWidth ? 'preserve-width': '',
          ]">
            <slot name="icon">
              <VNodeRender v-if="globalHasSlot('itemIconRender')" :vnode="() => globalRenderSlot('itemIconRender', getItemDataForChildren())" />
              <svg v-else-if="typeof svgIcon === 'string' && svgIcon" class="icon svg" v-bind="svgProps">
                <use :xlink:href="svgIcon"></use>
              </svg>
              <VNodeRender v-else-if="(typeof icon !== 'string')" :vnode="icon" :data="icon" />
              <i v-else-if="typeof icon === 'string' && icon !== ''" :class="icon + ' icon '+ iconFontClass + ' ' + options.iconFontClass"></i>
            </slot>
            <slot v-if="checked" name="check">
              <VNodeRender v-if="globalHasSlot('itemCheckRender')" :vnode="() => globalRenderSlot('itemCheckRender', getItemDataForChildren())" />
              <ContextMenuIconCheck />
            </slot>
          </div>
          <slot name="label">
            <VNodeRender v-if="globalHasSlot('itemLabelRender')" :vnode="() => globalRenderSlot('itemLabelRender', getItemDataForChildren())" />
            <span class="label" v-else-if="typeof label === 'string'">{{ label }}</span>
            <VNodeRender v-else :vnode="label" :data="label" />
          </slot>
        </div>
        <div class="mx-item-row">
          <slot v-if="shortcut || $slots.shortcut" name="shortcut">
            <VNodeRender v-if="globalHasSlot('itemShortcutRender')" :vnode="() => globalRenderSlot('itemShortcutRender', getItemDataForChildren())" />
            <span class="mx-shortcut">{{ shortcut }}</span>
          </slot>
          <slot v-if="showRightArrow" name="rightArrow">
            <VNodeRender v-if="globalHasSlot('itemRightArrowRender')" :vnode="() => globalRenderSlot('itemRightArrowRender', getItemDataForChildren())" />
            <ContextMenuIconRight />
          </slot>
        </div>
      </slot>
    </div>
    
    <!--Sub menu render-->
    <Transition v-if="options.menuTransitionProps" v-bind="options.menuTransitionProps">
      <slot v-if="showSubMenu" name="submenu" :context="menuItemInstance"></slot>
    </Transition>
    <slot v-else-if="showSubMenu" name="submenu" :context="menuItemInstance"></slot>
  </div>
</template>

<script setup lang="ts">
import { inject, nextTick, onBeforeUnmount, onMounted, type PropType, ref, type SVGAttributes, toRefs, type TransitionProps, type Ref, computed, provide } from 'vue'
import type { SubMenuParentContext } from './ContextSubMenu.vue'
import type { GlobalHasSlot, GlobalRenderSlot } from './ContextMenu.vue'
import type { MenuItem, MenuItemContext, MenuOptions } from './ContextMenuDefine'
import { VNodeRender } from './ContextMenuUtils'
import ContextMenuIconCheck from './ContextMenuIconCheck.vue'
import ContextMenuIconRight from './ContextMenuIconRight.vue'

/**
 * Menu Item
 */

const props = defineProps({
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
  customRender: {
    type: Function,
    default: null
  },
  /**
   * Custom css class for submenu
   */
  customClass: {
    type: String,
    default: ''
  },
  clickHandler: {
    type: Function as PropType<(e: MouseEvent|KeyboardEvent) => void>,
    default: null
  },
  /**
   * Menu label
   */
  label: {
    type: [String, Object, Function],
    default: ''
  },
  /**
   * Menu icon (for icon class)
   */
  icon: {
    type: [String, Object, Function],
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
  hasChildren: {
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
  rawMenuItem: {
    type: Object as PropType<MenuItem>,
    default: undefined
  },
});
const emit = defineEmits([
  'click',
  'subMenuOpen',
  'subMenuClose',
])

const { 
  clickHandler, clickClose, clickableWhenHasChildren, disabled, hidden,
  label, icon, iconFontClass,
  showRightArrow, shortcut,
  hasChildren,
} = toRefs(props);
const showSubMenu = ref(false);
const keyBoardFocusMenu = ref(false);

const menuItemRef = ref<HTMLElement>();

const options = inject('globalOptions') as Ref<MenuOptions>;
const globalHasSlot = inject('globalHasSlot') as GlobalHasSlot;
const globalRenderSlot = inject('globalRenderSlot') as GlobalRenderSlot;
const globalCloseMenu = inject('globalCloseMenu') as (fromItem: MenuItem|undefined) => void;

const menuContext = inject('menuContext') as SubMenuParentContext;

//Instance Contet for keyboadr control
const menuItemInstance : MenuItemContext = {
  getSubMenuInstance: () => undefined,
  showSubMenu: () => {
    if (showSubMenu.value) {
      //Mark current item
      menuContext.markActiveMenuItem(menuItemInstance, true);
      return true;
    } else if (hasChildren.value) {
      onMouseEnter();
      return true;
    }
    return false;
  },
  hideSubMenu: () => {
    //closeSubMenu();
    menuContext.closeOtherSubMenu();
  },
  isDisabledOrHidden: () => disabled.value || hidden.value,
  getElement: () => menuItemRef.value,
  focus: () => keyBoardFocusMenu.value = true,
  blur: () => keyBoardFocusMenu.value = false,
  click: onClick,
}

provide("menuItemInstance", menuItemInstance);

onMounted(() => {
  if (menuContext.isMenuItemDataCollectedFlag()) {
    //当前菜单条目是在整体加载完成后才显示的，此时菜单顺序已经无法知道，
    //所以这里需要在父级元素中查找得出当前菜单的位置。
    //
    //The current menu item is displayed after the overall loading is completed. 
    //At this time, the menu order cannot be known, so here we need to 
    //find the position of the current menu in the parent element.
    nextTick(() => {
      let index = 0;
      const parentEl = menuContext.getElement();
      if (parentEl) {
        let indexCounting = 0;
        for (let i = 0; i < parentEl.children.length; i++) {
          const el = parentEl.children[i];
          if (el.getAttribute('data-type') === 'ContextMenuItem') {
            if (el === menuItemRef.value) {
              index = indexCounting;
              break;
            }
            indexCounting++;
          }
        }
      }
      //Insert to pos
      menuContext.addChildMenuItem(menuItemInstance, index);
    });
  } else
    menuContext.addChildMenuItem(menuItemInstance);
});
onBeforeUnmount(() => {
  menuContext.removeChildMenuItem(menuItemInstance);
});

//Click handler
function onClick(e: MouseEvent|KeyboardEvent) {
  //Ignore clicking when disabled
  if (disabled.value)
    return;
  //Ignore clicking when click on some special elements
  if (e) {
    const currentTarget = e.target as HTMLElement;
    if (currentTarget.classList.contains('mx-context-no-clickable'))
      return;
    if (options.value.ignoreClickClassName && currentTarget.classList.contains(options.value.ignoreClickClassName))
      return;
    if (options.value.clickCloseClassName && currentTarget.classList.contains(options.value.clickCloseClassName)) {
      e.stopPropagation();
      globalCloseMenu(props.rawMenuItem);
      return;
    }
  }
  //Has submenu?
  if (hasChildren.value) {
    if (clickableWhenHasChildren.value) {
      if (typeof clickHandler.value === 'function')
        clickHandler.value(e);
      emit('click', e);
    }
    else if (!showSubMenu.value)
      onMouseEnter();
  } else {
    //Call hander from options
    if (typeof clickHandler.value === 'function') 
      clickHandler.value(e);
    emit('click', e);
    if (clickClose.value) {
      //emit close
      globalCloseMenu(props.rawMenuItem);
    }
  }
}
//MouseEnter handler: show item submenu
function onMouseEnter(e?: MouseEvent) {
  //Clear keyBoard focus style
  keyBoardFocusMenu.value = false;

  //等待一个延时，以防止用户过快移动鼠标导致菜单隐藏
  //Wait for a delay to prevent the menu from being hidden due to the user moving the mouse too fast
  if (!menuContext.checkCloseOtherSubMenuTimeOut())
    menuContext.closeOtherSubMenu();

  if (!disabled.value) {
    //Mark current item
    menuContext.markActiveMenuItem(menuItemInstance);

    if (hasChildren.value) {
      if (!e)
        menuContext.markThisOpenedByKeyBoard();
      //Open sub menu
      menuContext.addOpenedSubMenu(closeSubMenu);
      showSubMenu.value = true;
      nextTick(() => emit('subMenuOpen', menuItemInstance));
    }
  }
}
function closeSubMenu() 
{
  keyBoardFocusMenu.value = false;
  showSubMenu.value = false;
  emit('subMenuClose', menuItemInstance);
}
//Data for custom render
function getItemDataForChildren() {
  return {
    disabled: disabled.value,
    label: label.value,
    icon: icon.value,
    iconFontClass: iconFontClass.value,
    showRightArrow: showRightArrow.value,
    clickClose: clickClose.value,
    clickableWhenHasChildren: clickableWhenHasChildren.value,
    shortcut: shortcut.value,
    theme: options.value.theme,
    isOpen: showSubMenu,
    hasChildren: hasChildren,
    onClick,
    onMouseEnter,
    closeMenu: globalCloseMenu,
  }
}

defineExpose(menuItemInstance);
</script>

<style>
</style>
