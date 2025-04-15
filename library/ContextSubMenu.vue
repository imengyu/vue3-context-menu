<template>
  <Teleport v-if="mounted" :to="`#${globalGetMenuHostId}`">
    <div
      ref="submenuRoot"
      v-bind="$attrs"
      :class="[
        'mx-context-menu',
        (options.customClass ? options.customClass : ''),
        (options.theme ?? '')
      ]"
      :style="{
        maxWidth: (maxWidth ? solveNumberOrStringSize(maxWidth) : `${MenuConstOptions.defaultMaxWidth}px`),
        minWidth: minWidth ? solveNumberOrStringSize(minWidth) : `${MenuConstOptions.defaultMinWidth}px`,
        maxHeight: overflow && maxHeight > 0 ? `${maxHeight}px` : undefined,
        zIndex: zIndex,
        left: `${position.x}px`,
        top: `${position.y}px`,
      }"
      data-type="ContextSubMenu"
      @click="onSubMenuBodyClick"
    >
      <ScrollRect 
        ref="scrollRectRef"
        :scroll="overflow ? 'vertical' : 'none'"
        :style="{
          width: 'auto',
          height: `${overflow ? maxHeight : scrollHeight}px`,
        }"
      >
        <!--Child menu items-->
        <div
          :class="[ 'mx-context-menu-items' ]"
          ref="menu"
        >
          <slot>
            <template v-for="(item, i) in items" :key="i" >
              <ContextMenuSeparator v-if="item.hidden !== true && item.divided === 'up'" />
              <ContextMenuSeparator v-if="item.hidden !== true && item.divided === 'self'" />
              <!--Menu Item-->
              <ContextMenuItem
                v-else
                :clickHandler="item.onClick ? (e) => item.onClick!(e) : undefined"
                :disabled="typeof item.disabled === 'object' ? item.disabled.value : item.disabled"
                :hidden="typeof item.hidden === 'object' ? item.hidden.value : item.hidden"
                :icon="item.icon"
                :iconFontClass="item.iconFontClass"
                :svgIcon="item.svgIcon"
                :svgProps="item.svgProps"
                :label="item.label"
                :customRender="(item.customRender as Function)"
                :customClass="item.customClass"
                :checked="typeof item.checked === 'object' ? item.checked.value : item.checked"
                :shortcut="item.shortcut"
                :clickClose="item.clickClose"
                :clickableWhenHasChildren="item.clickableWhenHasChildren"
                :preserveIconWidth="item.preserveIconWidth !== undefined ? item.preserveIconWidth : options.preserveIconWidth"
                :showRightArrow="item.children && item.children.length > 0"
                :hasChildren="item.children && item.children.length > 0"
                :rawMenuItem="item"
                @sub-menu-open="(v: any) => item.onSubMenuOpen?.(v)"
                @sub-menu-close="(v: any) => item.onSubMenuClose?.(v)"
              >
                <template v-if="item.children && item.children.length > 0" #submenu="{ context }">
                  <!--Sub menu-->
                  <ContextSubMenu
                    :parentMenuItemContext="context"
                    :items="item.children"
                    :maxWidth="item.maxWidth"
                    :minWidth="item.minWidth"
                    :adjustPosition="item.adjustSubMenuPosition !== undefined ? item.adjustSubMenuPosition : options.adjustPosition"
                    :direction="item.direction !== undefined ? item.direction : options.direction"
                  />
                </template>
              </ContextMenuItem>
              <!--Separator-->
              <!--Custom render-->
              <ContextMenuSeparator v-if="item.hidden !== true && (item.divided === 'down' || item.divided === true)" />
            </template>
          </slot>
        </div>
      </ScrollRect>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import { inject, nextTick, onMounted, type PropType, provide, ref, toRefs, type Ref, onBeforeUnmount, type ComputedRef } from 'vue'
import type { MenuOptions, MenuItem, ContextMenuPositionData, MenuPopDirection, MenuItemContext, ContextSubMenuInstance } from './ContextMenuDefine'
import type { GlobalHasSlot, GlobalRenderSlot } from './ContextMenu.vue'
import { MenuConstOptions } from './ContextMenuDefine'
import { getLeft, getTop, solveNumberOrStringSize } from './ContextMenuUtils'
import { ScrollRect, type ScrollRectInstance } from '@imengyu/vue-scroll-rect'
import ContextMenuItem from './ContextMenuItem.vue'
import ContextMenuSeparator from './ContextMenuSeparator.vue'

/**
 * Submenu container
 */

//The internal info context for submenu instance
export interface SubMenuContext {
  isTopLevel: () => boolean;
  closeSelfAndActiveParent: () => boolean,
  openCurrentItemSubMenu: () => boolean,
  closeCurrentSubMenu: () => void,
  moveCurrentItemFirst: () => void,
  moveCurrentItemLast: () => void,
  moveCurrentItemDown: () => void,
  moveCurrentItemUp: () => void,
  focusCurrentItem: () => void,
  triggerCurrentItemClick: (e: KeyboardEvent|MouseEvent) => void,
}

//The internal info context for submenu
export interface SubMenuParentContext {
  //Props
  container: HTMLElement;
  zIndex: number;
  adjustPadding: { x: number, y: number },

  //Position control
  getParentWidth: () => number;
  getParentHeight: () => number;
  getPositon: () => [number,number];
  getZoom: () => number;

  //SubMenu mutex
  addOpenedSubMenu: (closeFn: () => void) => void;
  closeOtherSubMenu: () => void;
  closeOtherSubMenuWithTimeOut: () => void;
  checkCloseOtherSubMenuTimeOut: () => boolean;

  //Item control
  addChildMenuItem: (item: MenuItemContext, index?: number) => void;
  removeChildMenuItem: (item: MenuItemContext) => void;
  markActiveMenuItem: (item: MenuItemContext, updateState?: boolean) => void;
  markThisOpenedByKeyBoard: () => void;
  isOpenedByKeyBoardFlag: () => boolean;
  isMenuItemDataCollectedFlag: () => boolean;

  //Other
  getSubMenuInstanceContext: () => SubMenuContext|null;
  getParentContext: () => SubMenuParentContext|null;
  getElement: () => HTMLElement|null;
}

const props = defineProps({
  /**
   * Items from options
   */
    items: {
    type: Object as PropType<Array<MenuItem>>,
    default: null
  },
  /**
   * Max width for this submenu
   */
  maxWidth: {
    type: [String, Number],
    default: 0,
  },
  /**
   * Min width for this submenu
   */
  minWidth: {
    type: [String, Number],
    default: 0,
  },
  /**
   * Specifies should submenu adjust it position
   * when the menu exceeds the screen. The default is true
   */
  adjustPosition: {
    type: Boolean,
    default: true,
  },
  /**
   * Menu direction
   */
  direction: {
    type: String as PropType<MenuPopDirection>,
    default: 'br',
  },
  parentMenuItemContext: {
    type: Object as PropType<MenuItemContext>,
    default: null,
  }
})

const mounted = ref(false);

//#region Injects

const globalGetMenuHostId = inject('globalGetMenuHostId', '');
const parentContext = inject('menuContext') as SubMenuParentContext;
const options = inject('globalOptions') as Ref<MenuOptions>;
const globalHasSlot = inject('globalHasSlot') as GlobalHasSlot;
const globalRenderSlot = inject('globalRenderSlot') as GlobalRenderSlot;

//#endregion

const { zIndex, getParentWidth, getParentHeight, getZoom } = parentContext;
const { adjustPosition } = toRefs(props);

const scrollRectRef = ref<ScrollRectInstance>();
const submenuRoot = ref<HTMLElement>();
const menu = ref<HTMLElement>();
const openedSubMenuClose = [] as (() => void)[];

//#region Keyboard control context

const globalSetCurrentSubMenu = inject('globalSetCurrentSubMenu') as (menu: SubMenuContext|null) => void;

const menuItems = [] as MenuItemContext[];
let currentItem = null as MenuItemContext|null;
let leaveTimeout = 0;

function blurCurrentMenu() {
  if (currentItem)
    currentItem.blur();
}

function setAndFocusNotDisableItem(isDown: boolean, startIndex?: number) {
  if (isDown) {
    for(let i = startIndex !== undefined ? startIndex : 0; i < menuItems.length; i++) {
      if (!menuItems[i].isDisabledOrHidden()) {
        setAndFocusCurrentMenu(i);
        break;
      }
    }
  } else {
    for(let i = startIndex !== undefined ? startIndex : (menuItems.length - 1); i >= 0; i--) {
      if (!menuItems[i].isDisabledOrHidden()) {
        setAndFocusCurrentMenu(i);
        break;
      }
    }
  }
}
function setAndFocusCurrentMenu(index?: number) {
  if (currentItem)
    blurCurrentMenu();
  if (index !== undefined)
    currentItem = menuItems[Math.max(0, Math.min(index, menuItems.length - 1))];
  if (!currentItem)
    return;

  //Focus item
  currentItem.focus();

  //Scroll to current item
  if (overflow.value) {
    const element = currentItem.getElement();
    if (element)
      scrollRectRef.value?.scrollTo(0, Math.min(Math.max(-scrollHeight.value, -element.offsetTop - element.offsetHeight + maxHeight.value), 0));
  }
}
function onSubMenuBodyClick() {
  //Mouse click can set current focused submenu
  globalSetCurrentSubMenu(thisMenuInsContext);
}

const thisMenuInsContext : SubMenuContext = {
  isTopLevel: () => parentContext.getParentContext() === null,
  closeSelfAndActiveParent: () => {
    const parent = thisMenuContext.getParentContext();
    if (parent) {
      parent.closeOtherSubMenu();
      const conext = parent.getSubMenuInstanceContext()
      if (conext) {
        conext.focusCurrentItem();
        return true;
      }
    }
    return false;
  },
  closeCurrentSubMenu: () => thisMenuContext.getParentContext()?.closeOtherSubMenu(),
  moveCurrentItemFirst: () => setAndFocusNotDisableItem(true),
  moveCurrentItemLast: () => setAndFocusNotDisableItem(false),
  moveCurrentItemDown: () => setAndFocusNotDisableItem(true, (currentItem ? (menuItems.indexOf(currentItem) + 1) : 0)),
  moveCurrentItemUp: () => setAndFocusNotDisableItem(false, (currentItem ? (menuItems.indexOf(currentItem) - 1) : 0)),
  focusCurrentItem: () => setAndFocusCurrentMenu(),
  openCurrentItemSubMenu: () => {
    if (currentItem)
      return currentItem?.showSubMenu()
    return false;
  },
  triggerCurrentItemClick: (e) => currentItem?.click(e),
};

let isOpenedByKeyBoardFlag = false;
let isMenuItemDataCollectedFlag = false;

//#endregion

//#region Menu control context

//provide menuContext for child use
const thisMenuContext : SubMenuParentContext = {
  zIndex: zIndex + 1,
  container: parentContext.container,
  adjustPadding: options.value.adjustPadding as { x: number, y: number } || MenuConstOptions.defaultAdjustPadding,
  getParentWidth: () => menu.value?.offsetWidth || 0,
  getParentHeight: () => menu.value?.offsetHeight || 0,
  getPositon: () => [position.value.x, position.value.y],
  getZoom: () => options.value.zoom||MenuConstOptions.defaultZoom,
  addOpenedSubMenu(closeFn: () => void) {
    openedSubMenuClose.push(closeFn);
  },
  closeOtherSubMenu() {
    openedSubMenuClose.forEach(k => k());
    openedSubMenuClose.splice(0, openedSubMenuClose.length);
    globalSetCurrentSubMenu(thisMenuInsContext);
  },
  checkCloseOtherSubMenuTimeOut() {
    if (leaveTimeout) {
      clearTimeout(leaveTimeout);
      leaveTimeout = 0;
      return true;
    }
    return false;
  },
  closeOtherSubMenuWithTimeOut() {
    leaveTimeout = setTimeout(() => {
      leaveTimeout = 0;
      this.closeOtherSubMenu();
    }, 200) as unknown as number; //Add a delay, the user will not hide the menu when moving too fast
  },
  addChildMenuItem: (item: MenuItemContext, index?: number) => {
    if (index === undefined)
      menuItems.push(item);
    else
      menuItems.splice(index, 0, item);
    //item.getSubMenuInstance = () => {
    //  return subMenuRefs.value[menuItems.indexOf(item)]?.value;
    //}
  },
  removeChildMenuItem: (item: MenuItemContext) => {
    menuItems.splice(menuItems.indexOf(item), 1);
    item.getSubMenuInstance = () => undefined;
  },
  markActiveMenuItem: (item: MenuItemContext, updateState = false) => {
    blurCurrentMenu();
    currentItem = item;
    if (updateState)
      setAndFocusCurrentMenu();
  },
  markThisOpenedByKeyBoard: () => {
    isOpenedByKeyBoardFlag = true;
  },
  isOpenedByKeyBoardFlag: () => {
    if (isOpenedByKeyBoardFlag) {
      isOpenedByKeyBoardFlag = false;
      return true;
    }
    return false;
  },
  isMenuItemDataCollectedFlag: () => isMenuItemDataCollectedFlag,
  getElement: () => menu.value || null,
  getParentContext: () => parentContext,
  getSubMenuInstanceContext: () => thisMenuInsContext,
};
provide('menuContext', thisMenuContext);

//#endregion

//#region expose user use context

const exposeContext : ContextSubMenuInstance = {
  getChildItem: (index: number) => menuItems[index],
  getMenuDimensions: () => {
    if (submenuRoot.value) {
      return {
        width: submenuRoot.value.offsetWidth,
        height: submenuRoot.value.offsetHeight,
      };
    }
    return { width: 0, height: 0 };
  },
  getSubmenuRoot: () => submenuRoot.value,
  getMenu: () => menu.value,
  getScrollValue: () => scrollRectRef.value?.getScrollContainer()?.scrollTop || 0,
  setScrollValue: (v: number) => scrollRectRef.value?.scrollTo(0, v),
  getScrollHeight: () => scrollHeight.value,
  getMaxHeight: () => maxHeight.value,
  getPosition: () => position.value,
  setPosition: (x: number, y: number) => { 
    position.value.x = x;
    position.value.y = y;
  },
};

//#endregion

//#region set parent item context

const menuItemInstance = inject<MenuItemContext|undefined>('menuItemInstance', undefined);
if (menuItemInstance)
  menuItemInstance.getSubMenuInstance = () => exposeContext;

//#endregion

const scrollHeight = ref(0);
const overflow = ref(false);
const position = ref({ x: 0, y: 0 } as ContextMenuPositionData)
const maxHeight = ref(0);

onMounted(() => {
  mounted.value = true;

  //Set base position
  const parentElement = props.parentMenuItemContext?.getElement();
  if (parentElement) {
    const x = getLeft(parentElement, parentContext.container);
    const y = getTop(parentElement, parentContext.container);
    position.value.x = x;
    position.value.y = y;
  } else {
    const [ x, y ] = parentContext.getPositon();
    position.value.x = x;
    position.value.y = y;
  }
  
  //Mark current item submenu is open
  globalSetCurrentSubMenu(thisMenuInsContext);

  nextTick(() => {
    const menuEl = menu.value;

    //adjust submenu position
    if (menuEl && scrollRectRef.value) {

      const { container } = parentContext;

      const parentWidth = getParentWidth?.() ?? 0;
      const parentHeight = getParentHeight?.() ?? 0;

      const fillPaddingX = typeof parentContext.adjustPadding === 'number' ? parentContext.adjustPadding : (parentContext.adjustPadding?.x ?? 0);
      const fillPaddingYAlways = typeof parentContext.adjustPadding === 'number' ? parentContext.adjustPadding : (parentContext.adjustPadding?.y ?? 0);
      const fillPaddingY = parentHeight > 0 ? fillPaddingYAlways : 0;

      const windowHeight = document.documentElement.scrollHeight / getZoom();
      const windowWidth = document.documentElement.scrollWidth / getZoom();

      const avliableWidth = Math.min(windowWidth, container.offsetWidth);
      const avliableHeight = Math.min(windowHeight, container.offsetHeight);

      let absX = getLeft(menuEl, container),
        absY = getTop(menuEl, container);

      //set x positon
      if (props.direction.includes('l')) {
        position.value.x -= menuEl.offsetWidth + fillPaddingX; //left
      }
      else if (props.direction.includes('r')) {
        position.value.x += parentWidth + fillPaddingX; //right
      }
      else {
        position.value.x += parentWidth / 2;
        position.value.x -= (menuEl.offsetWidth + fillPaddingX) / 2; //center
      }

      //set y positon
      if (props.direction.includes('t')) {
        position.value.y -= (menuEl.offsetHeight + fillPaddingYAlways * 2) / getZoom(); //top
      }
      else if (props.direction.includes('b')) {
        position.value.y -= fillPaddingYAlways / getZoom();  //bottom
      }
      else {
        position.value.y += (parentHeight / 2) / getZoom();
        position.value.y -= ((menuEl.offsetHeight + fillPaddingYAlways) / 2) / getZoom(); //center
      }

      //Overflow adjust
      if (adjustPosition.value) {
        nextTick(() => {
          absX = getLeft(menuEl, container);
          absY = getTop(menuEl, container);

          //scrollHeight.value = menuEl.offsetHeight - avliableHeight + fillPaddingY * 2 /* Padding */;
          scrollHeight.value = scrollRectRef.value?.getScrollContainer()?.scrollHeight || 0;
          
          const xOverflow = (absX + menuEl.offsetWidth) - (avliableWidth);
          const yOverflow = (absY + scrollHeight.value + fillPaddingY * 2) - (avliableHeight);
          overflow.value = yOverflow > 0;

          if (xOverflow > 0) {//X overflow
            const ox = parentWidth + menuEl.offsetWidth - fillPaddingX;
            const maxSubWidth = absX;
            if (ox > maxSubWidth)
              position.value.x -= maxSubWidth;
            else
              position.value.x -= ox;
          }

          if (overflow.value) { //Y overflow
            const oy = yOverflow;
            const maxSubHeight = absY;
            if (oy > maxSubHeight)
              position.value.y -= maxSubHeight - fillPaddingY;
            else
              position.value.y -= oy - fillPaddingY;
            maxHeight.value = (avliableHeight - fillPaddingY * 2);
          } else {
            maxHeight.value = 0;
          }
        });
      }
    }

    //Focus this submenu
    menuEl?.focus({
      preventScroll: true
    });

    //Is this submenu opened by keyboard? If yes then select first item
    if (parentContext.isOpenedByKeyBoardFlag())
      setAndFocusNotDisableItem(true);

    isMenuItemDataCollectedFlag = true;
  });
});
onBeforeUnmount(() => {
  if (menuItemInstance)
    menuItemInstance.getSubMenuInstance = () => undefined;
});

defineExpose(exposeContext);
</script>

<style lang="scss">
@import "@imengyu/vue-scroll-rect/lib/vue-scroll-rect.css";
@import "./ContextMenu.scss";

.mx-context-menu .vue-scroll-rect > .scroll-content {
  overflow-y: scroll;
  height: 100%;
  width: auto;
  position: relative!important;
}
</style>
