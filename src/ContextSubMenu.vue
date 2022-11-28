<template>
  <div
    :class="'mx-context-menu ' + (options.customClass ? options.customClass : '') + ' ' + globalTheme"
    :style="{
      maxWidth: (maxWidth ? maxWidth : `${constOptions.defaultMaxWidth}px`),
      minWidth: minWidth ? minWidth : `${constOptions.defaultMinWidth}px`,
      maxHeight: overflow ? `${windowHeight - fillPadding * 2}px` : undefined,
      zIndex: zIndex,
      left: `${position.x}px`,
      top: `${position.y}px`,
    }"
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
        <div v-for="(item, i) in items" :key="i" >
          <!--Menu Item-->
          <ContextMenuItem
            :clickHandler="item.onClick"
            :disabled="item.disabled"
            :icon="item.icon"
            :iconFontClass="item.iconFontClass"
            :svgIcon="item.svgIcon"
            :svgProps="item.svgProps"
            :label="item.label"
            :customRender="(item.customRender as Function)"
            :customClass="item.customClass"
            :clickClose="item.clickClose"
            :clickableWhenHasChildren="item.clickableWhenHasChildren"
            :showRightArrow="item.children && item.children.length > 0"
            :hasChildren="item.children && item.children.length > 0"
          >
            <template v-if="item.children && item.children.length > 0" #submenu>
              <!--Sub menu-->
              <ContextSubMenu 
                :items="item.children"
                :maxWidth="item.maxWidth"
                :minWidth="item.minWidth"
                :adjustPosition="item.adjustSubMenuPosition"
              />
            </template>
          </ContextMenuItem>
          <!--Sperator-->
          <!--Custom render-->
          <VNodeRender v-if="item.divided && globalHasSlot('speratorRender')" :vnode="() => globalRenderSlot('speratorRender', {})" />
          <ContextMenuSperator v-else-if="item.divided" />
        </div>
      </slot>
    </div>
        
    <!--Scroll button host-->
    <div 
      class="mx-context-menu-scroll"
      ref="scroll"
    >
      <!--Updown scroll button-->
      <div v-show="overflow && scrollValue < 0" class="mx-context-menu-updown mx-context-no-clickable up" @click="onScroll(false)">
        <span class="mx-right-arrow" />
      </div>
      <div v-show="overflow && scrollValue > -scrollHeight" class="mx-context-menu-updown mx-context-no-clickable down" @click="onScroll(true)">
        <span class="mx-right-arrow" />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, nextTick, onMounted, PropType, provide, ref, toRefs } from 'vue'
import { MenuOptions, MenuItem, ContextMenuPositionData, MenuConstOptions } from './ContextMenuDefine'
import { getLeft, getTop } from './ContextMenuUtils'
import ContextMenuItem from './ContextMenuItem.vue'
import ContextMenuSperator from './ContextMenuSperator.vue'
import { VNodeRender } from './ContextMenuUtils'
import { GlobalHasSlot, GlobalRenderSlot } from './ContextMenu.vue'

//The internal info context for submenu
export interface SubMenuParentContext {
  zIndex: number;
  getMyPosition: () => ContextMenuPositionData;
  getParentWidth: () => number;
  addOpenedSubMenu: (closeFn: () => void) => void;
  closeOtherSubMenu: () => void;
  closeOtherSubMenuWithTimeOut: () => void;
  checkCloseOtherSubMenuTimeOut: () => boolean;
}

const fillPadding = 10; //padding for submenu position adjust

/**
 * Submenu container
 */
export default defineComponent({
  name: 'ContextSubMenu',
  components: {
    ContextMenuItem,
    ContextMenuSperator,
    VNodeRender,
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
  },
  setup(props) {
    const parentContext = inject('menuContext') as SubMenuParentContext;
    const options = inject('globalOptions') as MenuOptions;
    
    const { zIndex, getMyPosition, getParentWidth } = parentContext;
    const { adjustPosition } = toRefs(props);

    const menu = ref<HTMLElement>();
    const scroll = ref<HTMLElement>();
    const openedSubMenuClose = [] as (() => void)[];

    let leaveTimeout = 0;

    //provide menuContext for child use
    const thisMenuContext = {
      zIndex: zIndex + 1,
      getMyPosition() {
        const pos = { x: 0, y: 0 } as ContextMenuPositionData;
        //计算子菜单的位置
        if(menu.value) 
          pos.x = menu.value.offsetWidth + (options.xOffset || 0);
        if (options.yOffset)
          pos.y = options.yOffset;
        return pos;
      },
      getParentWidth: () => menu.value?.offsetWidth,
      addOpenedSubMenu(closeFn: () => void) {
        openedSubMenuClose.push(closeFn);
      },
      closeOtherSubMenu() {
        openedSubMenuClose.forEach(k => k());
        openedSubMenuClose.splice(0, openedSubMenuClose.length);
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
    } as SubMenuParentContext;
    provide('menuContext', thisMenuContext);

    const scrollValue = ref(0);
    const windowHeight = document.body.clientHeight;
    const windowWidth = document.body.clientWidth;
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


    onMounted(() => {
      position.value = getMyPosition();
        
      nextTick(() => {
        //adjust submenu position
        if (adjustPosition.value && menu.value && scroll.value) {
          const menuEl = menu.value;
          scrollHeight.value = menuEl.offsetHeight - windowHeight + 20 /* Padding */;
          overflow.value = menu.value.offsetHeight > windowHeight;
          const absX = getLeft(menuEl), absY = getTop(menuEl);
          const xOv = absX + menuEl.offsetWidth - windowWidth;
          if (xOv > 0) //X overflow
            position.value.x -= (getParentWidth ? getParentWidth() : 0) + menuEl.offsetWidth - fillPadding; 
          if (overflow.value) {
            position.value.y = -(absY - fillPadding); //fill height
            //scroll.value.style.height = `${windowHeight}px`;
          } else {
            const yOv = absY + menuEl.offsetHeight - windowHeight;
            if (yOv > 0) 
              position.value.y -= yOv + fillPadding; //Y overflow
          }
        }
      });
    });

    const globalHasSlot = inject('globalHasSlot') as GlobalHasSlot;
    const globalRenderSlot = inject('globalRenderSlot') as GlobalRenderSlot;
    const globalTheme = inject('globalTheme') as string;
    return {
      menu,
      scroll,
      options,
      zIndex,
      constOptions: MenuConstOptions,
      scrollValue,
      overflow,
      position,
      windowHeight,
      windowWidth,
      fillPadding,
      scrollHeight,
      globalHasSlot,
      globalRenderSlot,
      globalTheme,
      onScroll,
    }
  }
})
</script>

<style lang="scss">

//Base hosts
.mx-context-menu {
  pointer-events: all;
  display: inline-block;
  overflow: visible;
  position: absolute;
  background-color: #fff;
  border-radius: 10px;
  padding: 12px 0;
  box-shadow: 0px 10px 40px 10px rgba(0, 0, 0, 0.1);
  opacity: 1;
  transition: opacity 0.2s ease-in-out;
}
.mx-context-menu-items {
  position: relative;
  overflow: visible;
}
.mx-context-menu-scroll {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 1px;
  pointer-events: none;
}

//Up down button
.mx-context-menu-updown {
  pointer-events: all;
  position: absolute;
  left: 0;
  right: 0;
  height: 15px;
  border-radius: 10px;
  background-color: #fff;
  user-select: none;
  cursor: pointer;

  &:hover {
    background-color: #e2e0e0;
  }
  &:active {
    background-color: #c9c8c8;
  }

  &.up {
    top: 0px;

    .mx-right-arrow {
      transform: translateX(-50%) rotate(270deg);
    }
  }
  &.down {
    bottom: -1px;
    
    .mx-right-arrow {
      transform: translateX(-50%) rotate(90deg);
    }
  }

  .mx-right-arrow {
    display: inline-block;
    position: absolute;
    height: 12px;
    left: 50%;
    top: 0px;
    padding: 0;
  }
}

//Item
.mx-context-menu-item {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  position: relative;
  padding: 6px 20px;
  user-select: none;
  overflow: visible;
  color: #2e2e2e;
  white-space: nowrap;
  text-overflow: ellipsis;

  &:hover {
    background-color: #f1f1f1;
  }
  &:active {
    background-color: #dfdfdf;
  }
  &.open {
    background-color: #f1f1f1;
  }

  .icon  {
    display: inline-block;
    width: 16px;
    font-size: 16px;
    color: #636363;
    margin-right: 8px;

    &.svg {
      height: 16px;
    }
  }
  span {
    font-size: 14px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    padding-right: 16px;
  }

  //Right arrow
  .mx-right-arrow  {
    position: absolute;
    display: inline-block;
    right: 2px;
    top: 50%;
    margin-top: -5px;
  }

  //disabled
  &.disabled {
    color: #9f9f9f;

    cursor: not-allowed;

    &:hover, &:active {
      background-color: transparent;
    }
  }

}
.mx-context-menu-item-wrapper {
  position: relative;
}

//Sperator
.mx-context-menu-item-sperator  {
  display: block;
  padding: 5px 0;
  background-color: #fff;

  &:after {
    display: block;
    content: '';
    background-color: #f0f0f0;
    height: 1px;
  }
}

//Right arrow
.mx-right-arrow  {
  width: 14px;
  height: 14px;
  background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/PjwhRE9DVFlQRSBzdmcgUFVCTElDICItLy9XM0MvL0RURCBTVkcgMS4xLy9FTiIgImh0dHA6Ly93d3cudzMub3JnL0dyYXBoaWNzL1NWRy8xLjEvRFREL3N2ZzExLmR0ZCI+PHN2ZyB0PSIxNjI1MjA3MjM5MzE1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHAtaWQ9IjIxMjYzIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgd2lkdGg9IjUwIiBoZWlnaHQ9IjUwIj48ZGVmcz48c3R5bGUgdHlwZT0idGV4dC9jc3MiPjwvc3R5bGU+PC9kZWZzPjxwYXRoIGQ9Ik0zMDcuMDE4IDQ5LjQ0NWMxMS41MTcgMCAyMy4wMzIgNC4zOTQgMzEuODE5IDEzLjE4TDc1Ni40MDQgNDgwLjE4YzguNDM5IDguNDM4IDEzLjE4MSAxOS44ODUgMTMuMTgxIDMxLjgycy00Ljc0MSAyMy4zOC0xMy4xODEgMzEuODJMMzM4LjgzOCA5NjEuMzc2Yy0xNy41NzQgMTcuNTczLTQ2LjA2NSAxNy41NzMtNjMuNjQtMC4wMDEtMTcuNTczLTE3LjU3My0xNy41NzMtNDYuMDY1IDAuMDAxLTYzLjY0TDY2MC45NDQgNTEyIDI3NS4xOTggMTI2LjI2NWMtMTcuNTc0LTE3LjU3My0xNy41NzQtNDYuMDY2LTAuMDAxLTYzLjY0QzI4My45ODUgNTMuODM5IDI5NS41MDEgNDkuNDQ1IDMwNy4wMTggNDkuNDQ1eiIgcC1pZD0iMjEyNjQiPjwvcGF0aD48L3N2Zz4=');
  background-size: 12px;
  background-repeat: no-repeat;
}

//Dark theme
.mx-context-menu.dark {
  background-color: #303031;
  box-shadow: 0px 10px 40px 10px rgba(51, 51, 51, 0.2);

  //Up down button
  .mx-context-menu-updown {
    background-color: #303031;

    &:hover {
      background-color: #636363;
    }
    &:active {
      background-color: #7a7a7a;
    }
  }

  //Item
  .mx-context-menu-item {
    color: #ffffff;
    
    &:hover {
      background-color: #636363;
    }
    &:active {
      background-color: #7a7a7a;
    }
    &.open {
      background-color: #636363;
    }

    .icon  {
      color: #f0f0f0;
    }

    //disabled
    &.disabled {
      color: #9c9c9c;
    }
  }

  //Sperator
  .mx-context-menu-item-sperator  {
    background-color: #303031;

    &:after {
      background-color: #606060;
    }
  }

  .mx-right-arrow  {
    background-image: url('data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBzdGFuZGFsb25lPSJubyI/Pg0KPCFET0NUWVBFIHN2ZyBQVUJMSUMgIi0vL1czQy8vRFREIFNWRyAxLjEvL0VOIiAiaHR0cDovL3d3dy53My5vcmcvR3JhcGhpY3MvU1ZHLzEuMS9EVEQvc3ZnMTEuZHRkIj48c3ZnIHQ9IjE2MjUyMDcyMzkzMTUiDQogIGNsYXNzPSJpY29uIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcC1pZD0iMjEyNjMiDQogIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB3aWR0aD0iNTAiIGhlaWdodD0iNTAiPg0KICA8cGF0aA0KICAgIGZpbGw9IiNmZmZmZmYiDQogICAgZD0iTTMwNy4wMTggNDkuNDQ1YzExLjUxNyAwIDIzLjAzMiA0LjM5NCAzMS44MTkgMTMuMThMNzU2LjQwNCA0ODAuMThjOC40MzkgOC40MzggMTMuMTgxIDE5Ljg4NSAxMy4xODEgMzEuODJzLTQuNzQxIDIzLjM4LTEzLjE4MSAzMS44MkwzMzguODM4IDk2MS4zNzZjLTE3LjU3NCAxNy41NzMtNDYuMDY1IDE3LjU3My02My42NC0wLjAwMS0xNy41NzMtMTcuNTczLTE3LjU3My00Ni4wNjUgMC4wMDEtNjMuNjRMNjYwLjk0NCA1MTIgMjc1LjE5OCAxMjYuMjY1Yy0xNy41NzQtMTcuNTczLTE3LjU3NC00Ni4wNjYtMC4wMDEtNjMuNjRDMjgzLjk4NSA1My44MzkgMjk1LjUwMSA0OS40NDUgMzA3LjAxOCA0OS40NDV6Ig0KICAgIHAtaWQ9IjIxMjY0Ij48L3BhdGg+DQo8L3N2Zz4=');
  }

}
</style>