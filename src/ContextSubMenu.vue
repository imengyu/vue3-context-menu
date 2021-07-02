<template>
  <div 
    v-if="items" 
    :class="'mx-context-menu ' + (options.customClass ? options.customClass : '') + (menuReady ? ' ready' : '')"
    :style="{
      maxWidth: parentItem && parentItem.maxWidth ? `${parentItem.maxWidth}px` : `${constOptions.defaultMaxWidth}px`,
      minWidth: parentItem && parentItem.minWidth  ? `${parentItem.minWidth}px` : `${constOptions.defaultMinWidth}px`,
      zIndex: zIndex,
      left: `${position.x}px`,
      top: `${position.y}px`,
    }"
    @mouseenter="onMenuMouseEnter"
    @mouseleave="onMenuMouseLeave($event)">
    <div v-show="menuOverflow" class="mx-context-menu-updown up" @click="onScroll(false)">
      <img src="./ContextMenuRightArrow.svg" />
    </div>
    <div v-show="menuOverflow" class="mx-context-menu-updown down" @click="onScroll(true)">
      <img src="./ContextMenuRightArrow.svg" />
    </div>
    <div 
      class="mx-context-menu-items"
      ref="menu"
      :style="{
        maxHeight: maxHeight > 0 ? `${maxHeight}px` : '',
      }">
      <div v-for="(item, i) in items" :key="i" >
        <div
          :class="'mx-context-menu-item' + (item.disabled ? ' disabled' : '')"
          @mouseenter="showChildItem($event, item)"
          @mouseleave="hideChildItem()"
          @focus="showChildItem($event, item)"
          @blur="hideChildItem()"
          @click="onMouseClick(item)">
          <span class="text">
            <i :class="item.icon + ' icon '+ options.iconFontClass"></i>
            <span>{{ item.label }}</span>
            <img v-if="item.children && item.children.length > 0" class="right-arrow" src="./ContextMenuRightArrow.svg" />
          </span>
        </div>
        <div v-if="item.divided" class="mx-context-menu-item-sperator"></div>
      </div>
    </div>
    <ContextSubMenu 
      ref="childMenu"
      v-if="activeItem && activeItem.children"
      :zIndex="zIndex+1"
      :items="activeItem.children"
      :parentItem="activeItem"
      :options="options"
      :globalData="childGlobalData"
      :position="childPosition"
      @close="onChidrenClose"
      @keepOpen="onChidrenKeepOpen"
      @preUpdatePos="onChidrenUpdatePos"
    ></ContextSubMenu>
  </div>
</template>

<script lang="ts">
import { defineComponent, onBeforeUnmount, onMounted, PropType, ref, toRefs, watch } from 'vue'
import { MenuOptions, MenuItem, ContextMenuGlobalData, ContextMenuPositionData, MenuConstOptions } from './ContextMenuDefine'

export default defineComponent({
  name: 'ContextSubMenu',
  props: {
    items: { 
      type: Object as PropType<Array<MenuItem>>,
      default: null
    },
    parentItem: {
      type: Object as PropType<MenuItem>,
      default: null
    },
    options: { 
      type: Object as PropType<MenuOptions>,
      default: null
    },
    zIndex: {
      type: Number,
      default: 0
    },
    globalData: {
      type: Object as PropType<ContextMenuGlobalData>,
      default: null
    },
    position: {
      type: Object as PropType<ContextMenuPositionData>,
      default: null
    }
  },
  emits: [ 'close', 'keepOpen', 'preUpdatePos' ],
  setup(prop, context) {

    const { globalData, position, options, parentItem } = toRefs(prop);

    const menu = ref<HTMLElement>();
    const childMenu = ref();
    const menuReady = ref(false);
    const menuOverflow = ref(false);

    let nextShouldHiveItem = null as MenuItem|null;
    const maxHeight = ref(0);
    const activeItem = ref<MenuItem|null>(null);
    const childGlobalData = ref({
      parentPosition: { x: 0, y: 0 },
      screenSize: globalData.value.screenSize,
    } as ContextMenuGlobalData);
    const childPosition = ref<ContextMenuPositionData>({
      x: 0,
      y: 0
    });

    //显示和隐藏子菜单
    function showChildItem(e: Event, item : MenuItem) {
      if(item.disabled || !item.children || item.children.length == 0) 
        return;
      if(activeItem.value === item)
        return;
      
      //同步父菜单的位置
      activeItem.value = item;
      childGlobalData.value.parentPosition.x = globalData.value.parentPosition.x + position.value.x;
      childGlobalData.value.parentPosition.y = globalData.value.parentPosition.y + position.value.y;

      //计算子菜单的位置
      if(menu.value) 
        childPosition.value.x = menu.value.offsetWidth + (options.value.xOffset || 0);
      const currentItemEle = e.target as HTMLElement;
      if(currentItemEle) 
        childPosition.value.y = currentItemEle.offsetTop + (options.value.yOffset || 0);
    }
    function hideChildItem() {
      nextShouldHiveItem = activeItem.value;
      setTimeout(() => {
        if(nextShouldHiveItem === activeItem.value)
          activeItem.value = null;
      });
    }

    watch(activeItem, (newV : MenuItem|null, oldV : MenuItem|null) => {
      if(newV && oldV) {
        setTimeout(() => {
          if(childMenu.value) childMenu.value.doCheckPos()
        }, 50)
      }
    });

    //子菜单事件
    function onChidrenClose(byUserClick : boolean) {
      hideChildItem();
      if(byUserClick)
        context.emit('close', true);
    }
    function onChidrenKeepOpen(item : MenuItem) {
      if(nextShouldHiveItem === item)
        nextShouldHiveItem = null; 
      context.emit('keepOpen', parentItem.value);
    }
    function onChidrenUpdatePos(newPos: ContextMenuPositionData) {
      childPosition.value.x = newPos.x;
      childPosition.value.y = newPos.y;
    }
    //鼠标事件
    function onMouseClick(item : MenuItem) {
      if(typeof item.onClick === 'function')
        item.onClick();
      context.emit('close', true);
    }
    function onMenuMouseEnter() {
      context.emit('keepOpen', parentItem.value);
    }
    function onMenuMouseLeave(e : MouseEvent) {
      if(e.relatedTarget != null)
        context.emit('close', false);
    }



    //滚动
    function onScroll(down : boolean) {
      if(menu.value) {
        menu.value.scrollTop += down ? 30 : -30;
      }
    }

    let solveOverflowTimeOut = 0;

    //检查菜单是否超出屏幕
    function doCheckPos() {
      const _menu = menu.value;
      const _globalData = globalData.value;
      if(_menu) {

        const newPos = {
          x: position.value.x,
          y: position.value.y
        } as ContextMenuPositionData;

        //如果X绝对位置超出屏幕，那么减去超出的宽度
        const absRight = _globalData.parentPosition.x + position.value.x + _menu.offsetWidth;
        if(absRight > _globalData.screenSize.w) {
          newPos.x -= absRight - _globalData.screenSize.w;
        }

        //如果高度超出屏幕，那么限制最高高度
        if(_menu.offsetHeight > _globalData.screenSize.h) {
          maxHeight.value = _globalData.screenSize.h - 30;
          //  强制限制Y坐标为0
          newPos.y = -_globalData.parentPosition.y;
          menuOverflow.value = true;
        }
        else {
          menuOverflow.value = false;
          maxHeight.value = 0;
          //如果Y绝对位置超出屏幕，那么减去超出的高度
          const absTop = _globalData.parentPosition.y + position.value.y + _menu.offsetHeight;
          if(absTop >_globalData.screenSize.h) {
            newPos.y -= absTop - _globalData.screenSize.h + 30;
          }   
        }

        context.emit('preUpdatePos', newPos);
        menuReady.value = true;
      }
    }

    onMounted(() => {
      solveOverflowTimeOut = setTimeout(() => doCheckPos(), 100)
    })
    onBeforeUnmount(() => {
      if(solveOverflowTimeOut > 0) {
        clearTimeout(solveOverflowTimeOut);
        solveOverflowTimeOut = 0;
      }
    })

    return {
      menu,
      menuOverflow,
      childMenu,
      menuReady,
      maxHeight,
      showChildItem,
      hideChildItem,
      onChidrenClose,
      onChidrenKeepOpen,
      onChidrenUpdatePos,
      onMenuMouseLeave,
      onMenuMouseEnter,
      onMouseClick,
      onScroll,
      doCheckPos,
      activeItem,
      childGlobalData,
      childPosition,
      constOptions: MenuConstOptions,
    }
  }
})
</script>

<style>
.mx-context-menu {
  display: inline-block;
  overflow: visible;
  position: absolute;
  background-color: #fff;
  border-radius: 10px;
  padding: 12px 0;
  box-shadow: 0px 10px 40px 10px rgba(0, 0, 0, 0.1);
  opacity: 0;
  transition: all 0.2s ease-in-out;
}
.mx-context-menu.ready {
  opacity: 1;
}

.mx-context-menu-items {
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
}

.mx-context-menu-items::-webkit-scrollbar {
  display: none;
}

.mx-context-menu-updown {
  position: absolute;
  left: 0;
  right: 0;
  height: 10px;
  border-radius: 10px;
  background-color: #fff;
  user-select: none;
  cursor: pointer;
}
.mx-context-menu-updown:hover {
  background-color: #e2e0e0;
}
.mx-context-menu-updown:active {
  background-color: #c9c8c8;
}
.mx-context-menu-updown img {
  width: 13px;
  position: absolute;
  left: 50%;
  top: 0;
}
.mx-context-menu-updown.up {
  top: 0;
}
.mx-context-menu-updown.down {
  bottom: 0;
}
.mx-context-menu-updown.up img {
  transform: translateX(-50%) rotate(270deg);
}
.mx-context-menu-updown.down img {
  transform: translateX(-50%) rotate(90deg);
}

.mx-context-menu-item {
  display: block;
  position: relative;
  padding: 6px 20px;
  user-select: none;
}

.mx-context-menu-item:hover {
  background-color: #f1f1f1;
}
.mx-context-menu-item:active {
  background-color: #dfdfdf;
}

.mx-context-menu-item.disabled {
  cursor: not-allowed;
}
.mx-context-menu-item.disabled:hover,
.mx-context-menu-item.disabled:active {
  background-color: transparent;
}
.mx-context-menu-item.disabled .text {
  color: #9f9f9f;
}

.mx-context-menu-item-sperator  {
  display: block;
  padding: 5px 0;
  background-color: #fff;
}
.mx-context-menu-item-sperator:after {
  display: block;
  content: '';
  background-color: #f0f0f0;
  height: 1px;
}

.mx-context-menu-item .text  {
  color: #2e2e2e;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.mx-context-menu-item .text .icon  {
  display: inline-block;
  width: 26px;
  font-size: 16px;
  color: #636363;
}
.mx-context-menu-item .text span {
  font-size: 14px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  padding-right: 16px;
}
.mx-context-menu-item .text .right-arrow  {
  position: absolute;
  display: inline-block;
  right: 10px;
  top: 50%;
  margin-top: -7px;
  width: 14px;
}
</style>