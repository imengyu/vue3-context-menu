<template>
  <div
    :class="'mx-context-menu ' + (options.customClass ? options.customClass : '') + ' ' + globalTheme"
    :style="{
      maxWidth: (maxWidth ? solveNumberOrStringSize(maxWidth) : `${constOptions.defaultMaxWidth}px`),
      minWidth: minWidth ? solveNumberOrStringSize(minWidth) : `${constOptions.defaultMinWidth}px`,
      maxHeight: overflow && maxHeight > 0 ? `${maxHeight}px` : undefined,
      zIndex: zIndex,
      left: `${position.x}px`,
      top: `${position.y}px`,
    }"
    data-type="ContextSubMenu"
    @click="onSubMenuBodyClick"
  >
    <!--Child menu items-->
    <div 
      class="mx-context-menu-items"
      ref="menu"
      :style="{
        top: `${scrollValue}px`,
      }"
    >
      <slot>
        <template v-for="(item, i) in items" :key="i" >
          <!--Menu Item-->
          <ContextMenuItem
            :clickHandler="item.onClick ? (e) => item.onClick!(e) : undefined"
            :disabled="item.disabled"
            :hidden="item.hidden"
            :icon="item.icon"
            :iconFontClass="item.iconFontClass"
            :svgIcon="item.svgIcon"
            :svgProps="item.svgProps"
            :label="item.label"
            :customRender="(item.customRender as Function)"
            :customClass="item.customClass"
            :checked="item.checked"
            :shortcut="item.shortcut"
            :clickClose="item.clickClose"
            :clickableWhenHasChildren="item.clickableWhenHasChildren"
            :preserveIconWidth="item.preserveIconWidth !== undefined ? item.preserveIconWidth : options.preserveIconWidth"
            :showRightArrow="item.children && item.children.length > 0"
            :hasChildren="item.children && item.children.length > 0"
            @sub-menu-open="item.onSubMenuOpen"
            @sub-menu-close="item.onSubMenuClose"
          >
            <template v-if="item.children && item.children.length > 0" #submenu>
              <!--Sub menu-->
              <ContextSubMenu 
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
          <VNodeRender v-if="item.hidden !== true && item.divided && globalHasSlot('separatorRender')" :vnode="() => globalRenderSlot('separatorRender', {})" />
          <ContextMenuSeparator v-else-if="item.hidden !== true && item.divided" />
        </template>
      </slot>
    </div>
        
    <!--Scroll button host-->
    <div 
      class="mx-context-menu-scroll"
      ref="scroll"
    >
      <!--Updown scroll button-->
      <div v-show="overflow && scrollValue < 0" class="mx-context-menu-updown mx-context-no-clickable up" @click="onScroll(false)">
        <ContextMenuIconRight />
      </div>
      <div v-show="overflow && scrollValue > -scrollHeight" class="mx-context-menu-updown mx-context-no-clickable down" @click="onScroll(true)">
        <ContextMenuIconRight />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, nextTick, onMounted, PropType, provide, ref, toRefs } from 'vue'
import { MenuOptions, MenuItem, ContextMenuPositionData, MenuConstOptions, MenuPopDirection } from './ContextMenuDefine'
import { getLeft, getTop, solveNumberOrStringSize } from './ContextMenuUtils'
import ContextMenuItem from './ContextMenuItem.vue'
import ContextMenuSeparator from './ContextMenuSeparator.vue'
import { VNodeRender } from './ContextMenuUtils'
import { GlobalHasSlot, GlobalRenderSlot } from './ContextMenu.vue'
import ContextMenuIconRight from './ContextMenuIconRight.vue'

//The internal info context for menu item
export interface MenuItemContext {
  focus: () => void,
  blur: () => void,
  showSubMenu: () => boolean,
  getElement: () => HTMLElement|undefined,
  isDisabledOrHidden: () => boolean,
  click: (e: MouseEvent|KeyboardEvent) => void,
}

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
  getParentX: () => number;
  getParentY: () => number;
  getParentAbsX: () => number;
  getParentAbsY: () => number;
  getPositon: () => [number,number];

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

/**
 * Submenu container
 */
export default defineComponent({
  name: 'ContextSubMenu',
  components: {
    ContextMenuItem,
    ContextMenuSeparator,
    VNodeRender,
    ContextMenuIconRight
  },
  props: {
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
  },
  setup(props) {

    //#region Injects

    const parentContext = inject('menuContext') as SubMenuParentContext;
    const options = inject('globalOptions') as MenuOptions;
    const globalHasSlot = inject('globalHasSlot') as GlobalHasSlot;
    const globalRenderSlot = inject('globalRenderSlot') as GlobalRenderSlot;
    const globalTheme = inject('globalTheme') as string;

    //#endregion
    
    const { zIndex, getParentWidth, getParentHeight } = parentContext;
    const { adjustPosition } = toRefs(props);

    const menu = ref<HTMLElement>();
    const scroll = ref<HTMLElement>();
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
        if (element) {
          scrollValue.value = Math.min(Math.max(-scrollHeight.value, -element.offsetTop - element.offsetHeight + maxHeight.value), 0);
        }
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
      adjustPadding: parentContext.adjustPadding,
      getParentWidth: () => menu.value?.offsetWidth || 0,
      getParentHeight: () => menu.value?.offsetHeight || 0,
      getParentX: () => position.value.x,
      getParentY: () => position.value.y,
      getParentAbsX: () => menu.value ? getLeft(menu.value, parentContext.container) : 0,
      getParentAbsY: () => menu.value ? getTop(menu.value, parentContext.container) : 0,
      getPositon: () => [0,0],
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
      },
      removeChildMenuItem: (item: MenuItemContext) => {
        menuItems.splice(menuItems.indexOf(item), 1);
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

    const scrollValue = ref(0);
    const scrollHeight = ref(0);

    //Scroll the items
    function onScroll(down : boolean) {
      if (down)
        scrollValue.value = Math.max(scrollValue.value - 50, -scrollHeight.value);
      else 
        scrollValue.value = Math.min(scrollValue.value + 50, 0);
    }

    const overflow = ref(false);
    const position = ref({ x: 0, y: 0 } as ContextMenuPositionData)
    const maxHeight = ref(0);

    onMounted(() => {
      const pos = parentContext.getPositon();
      position.value = {
        x: pos[0] ?? options.xOffset ?? 0,
        y: pos[1] ?? options.yOffset ?? 0,
      };

      //Mark current item submenu is open
      globalSetCurrentSubMenu(thisMenuInsContext);

      nextTick(() => {
        const menuEl = menu.value;

        //adjust submenu position
        if (menuEl && scroll.value) {

          const { container } = parentContext;

          const parentWidth = getParentWidth?.() ?? 0;
          const parentHeight = getParentHeight?.() ?? 0;

          const fillPaddingX = typeof parentContext.adjustPadding === 'number' ? parentContext.adjustPadding : (parentContext.adjustPadding?.x ?? 0);
          const fillPaddingYAlways = typeof parentContext.adjustPadding === 'number' ? parentContext.adjustPadding : (parentContext.adjustPadding?.y ?? 0);
          const fillPaddingY = parentHeight > 0 ? fillPaddingYAlways : 0;

          const windowHeight = document.documentElement.scrollHeight;
          const windowWidth = document.documentElement.scrollWidth;

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
            position.value.x -= (menuEl.offsetWidth + fillPaddingX) / 2; //center
          }

          //set y positon
          if (props.direction.startsWith('t')) {
            position.value.y -= menuEl.offsetHeight + fillPaddingYAlways * 2; //top
          }
          else if (props.direction.startsWith('b')) {
            position.value.y -= fillPaddingYAlways;  //bottom
          }
          else {
            position.value.y -= (menuEl.offsetHeight + fillPaddingYAlways) / 2; //center
          }

          //Overflow adjust
          if (adjustPosition.value) {
            nextTick(() => {
              absX = getLeft(menuEl, container);
              absY = getTop(menuEl, container);
              
              const xOverflow = (absX + menuEl.offsetWidth) - (avliableWidth);
              const yOverflow = (absY + menuEl.offsetHeight) - (avliableHeight);

              scrollHeight.value = menuEl.offsetHeight - avliableHeight - fillPaddingY * 2 /* Padding */;
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
                const oy = yOverflow - fillPaddingY;
                const py = parentContext.getParentAbsY();

                if (py - oy < 0)
                  position.value.y -= py - fillPaddingY;
                else
                  position.value.y -= oy;
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

    return {
      menu,
      scroll,
      options,
      zIndex,
      constOptions: MenuConstOptions,
      scrollValue,
      overflow,
      position,
      scrollHeight,
      maxHeight,
      globalHasSlot,
      globalRenderSlot,
      globalTheme,
      onScroll,
      onSubMenuBodyClick,
      solveNumberOrStringSize,
    }
  }
})
</script>

<style lang="scss">
@import "./ContextMenu.scss";
</style>